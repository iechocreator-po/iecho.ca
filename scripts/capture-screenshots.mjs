#!/usr/bin/env node
// Capture des captures d'écran pour les produits locaux (pas déployés
// publiquement) via Puppeteer, en tapant sur leurs serveurs de dev locaux.
//
// Prérequis : démarrer chaque serveur toi-même AVANT de lancer ce script
// (voir CONFIG_PRODUITS ci-dessous pour les commandes). Rien n'est lancé
// automatiquement — bilbao/castellana manipulent tes propres données
// réelles, donc mieux vaut vérifier/nettoyer l'état affiché avant de
// capturer, puisque ces images deviennent publiques sur iecho.ca.
//
// Écrit d'abord dans scripts/.capture-tmp/ (jamais directement dans
// public/captures/), puis publie en remplaçant les anciennes captures
// numérotées de ce produit. Lancer ensuite `npm run optimize-images` (ou
// `npm run captures:full` qui enchaîne les deux) pour convertir en .webp.
//
// Usage :
//   npm run captures                 → tous les produits de CONFIG_PRODUITS
//   npm run captures -- toledo       → un seul produit

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ICI = path.dirname(fileURLToPath(import.meta.url));
const RACINE = path.resolve(ICI, '..');
const DOSSIER_STAGING = path.join(ICI, '.capture-tmp');
const DOSSIER_CAPTURES = path.join(RACINE, 'public/captures');

// Un produit = une URL locale à démarrer soi-même, plus une liste de
// "shots". Par défaut, un seul shot (la vue principale). Ajouter des
// entrées dans `shots` (avec un `avant(page)` optionnel pour cliquer/
// naviguer avant la capture) pour enrichir la galerie d'un produit.
const CONFIG_PRODUITS = {
  toledo: {
    url: 'http://localhost:5500',
    commande: "cd traducteur-pdf/backend && uvicorn app.main:app --port 8000  (puis)  cd traducteur-pdf/frontend && python3 -m http.server 5500",
    shots: [{}],
  },
  madrid: {
    // Servir depuis le dossier PARENT (2000_DigitalProducts/), sinon
    // /design-system/tokens.css casse et les couleurs disparaissent.
    url: 'http://localhost:5510/investment-dashboard/',
    commande: 'cd 2000_DigitalProducts && python3 -m http.server 5510',
    shots: [{}],
  },
  valencia: {
    url: 'http://localhost:3001',
    commande: 'cd Espagne_Immo/backend && npm start  (puis)  cd Espagne_Immo/frontend && npm run dev',
    shots: [{}],
  },
  castellana: {
    url: 'http://127.0.0.1:4700',
    commande: 'cd trading-assistant && npm start',
    shots: [{}],
  },
  bilbao: {
    url: 'http://127.0.0.1:4600',
    commande: 'cd feature-factory && npm start',
    shots: [{}],
  },
};

const VIEWPORT_DEFAUT = { width: 1440, height: 900, deviceScaleFactor: 2 };
const ATTENTE_CHARGEMENT_MS = 800;

async function capturerProduit(browser, id, config) {
  const page = await browser.newPage();
  await page.setViewport(config.viewport ?? VIEWPORT_DEFAUT);

  try {
    await page.goto(config.url, { waitUntil: 'networkidle2', timeout: 20000 });
  } catch (err) {
    console.error(`[échec] ${id} — impossible de joindre ${config.url}.`);
    console.error(`         Démarre d'abord : ${config.commande}`);
    await page.close();
    return 0;
  }

  await new Promise((r) => setTimeout(r, config.attenteMs ?? ATTENTE_CHARGEMENT_MS));

  let n = 0;
  for (const shot of config.shots) {
    n++;
    if (shot.avant) await shot.avant(page);
    const nomFichier = `${id}-${n}.png`;
    const cheminStaging = path.join(DOSSIER_STAGING, nomFichier);
    await page.screenshot({ path: cheminStaging, fullPage: shot.fullPage ?? false });
    console.log(`[capturé] ${id} shot ${n} → ${path.relative(RACINE, cheminStaging)}`);
  }

  await page.close();
  return n;
}

function publierStaging(id, nombreShots) {
  // Retire les anciennes captures numérotées de ce produit (tous formats)
  // avant de publier les nouvelles, pour ne pas laisser de shot obsolète.
  const motifExistant = new RegExp(`^${id}-\\d+\\.(png|jpe?g|webp)$`, 'i');
  for (const f of fs.readdirSync(DOSSIER_CAPTURES)) {
    if (motifExistant.test(f)) fs.unlinkSync(path.join(DOSSIER_CAPTURES, f));
  }
  for (let n = 1; n <= nombreShots; n++) {
    const nomFichier = `${id}-${n}.png`;
    fs.copyFileSync(
      path.join(DOSSIER_STAGING, nomFichier),
      path.join(DOSSIER_CAPTURES, nomFichier)
    );
  }
  console.log(`[publié] ${id} — ${nombreShots} capture(s) dans public/captures/`);
}

async function main() {
  const filtre = process.argv[2];
  const idsAFaire = filtre ? [filtre] : Object.keys(CONFIG_PRODUITS);

  fs.mkdirSync(DOSSIER_STAGING, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    for (const id of idsAFaire) {
      const config = CONFIG_PRODUITS[id];
      if (!config) {
        console.warn(`[ignoré] "${id}" ne fait pas partie de CONFIG_PRODUITS.`);
        continue;
      }
      const nombreShots = await capturerProduit(browser, id, config);
      if (nombreShots > 0) publierStaging(id, nombreShots);
    }
  } finally {
    await browser.close();
  }

  console.log("\nProchaine étape : npm run optimize-images (ou npm run captures:full la prochaine fois).");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
