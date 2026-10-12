// Ajoute une entrée au Journal (src/data/journal/entries.json) en quelques questions.
//   npm run journal:add
// Seul le français est demandé : les autres langues retombent sur le français
// à l'affichage (JournalView) tant que "en"/"es" sont absents. Le flux RSS est en français.
// Le fichier est modifié par ajout de texte, pas réécrit, pour garder un diff lisible.
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const fichier = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/data/journal/entries.json');
const TYPES = { l: 'livre', a: 'anticipe', d: 'decouverte' };
// Entrée redirigée (tests, collage) : les réponses sont lues d'un coup, ligne par ligne.
const reponses = process.stdin.isTTY ? null : fs.readFileSync(0, 'utf8').split('\n');
const rl = process.stdin.isTTY ? readline.createInterface({ input: process.stdin, output: process.stdout }) : { close() {} };
const poser = async (q, defaut = '') => {
  const invite = defaut ? `${q} [${defaut}] ` : `${q} `;
  const brut = reponses ? (reponses.shift() ?? '') : await rl.question(invite);
  return brut.trim() || defaut;
};

const data = JSON.parse(fs.readFileSync(fichier, 'utf8'));
const produits = [...new Set(data.entries.map((e) => e.produit))];
const aujourdhui = new Date().toISOString().slice(0, 10);

console.log(`Produits existants : ${produits.join(', ')}`);
const produit = await poser('Produit :');
const lettre = (await poser('Type — (l)ivré, (a)nticipé, (d)écouverte :', 'l')).toLowerCase()[0];
const type = TYPES[lettre];
const date = await poser('Date (AAAA-MM-JJ) :', aujourdhui);
const titre = await poser('Titre :');
const resume = await poser('Résumé (2-3 phrases, public) :');
const maquette = type === 'anticipe' ? await poser('Maquette (chemin sous public/, vide si aucune) :') : '';
const featureId = await poser('Numéro de feature bilbao (vide si aucun) :');
rl.close();

const erreurs = [];
if (!produit) erreurs.push('produit manquant');
if (!type) erreurs.push('type invalide');
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) erreurs.push('date invalide');
if (!titre || !resume) erreurs.push('titre ou résumé manquant');
if (erreurs.length) { console.error(`Annulé : ${erreurs.join(', ')}.`); process.exit(1); }

const slug = titre.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const id = `${date}-${produit}-${slug}`;
if (data.entries.some((e) => e.id === id)) { console.error(`Annulé : l'entrée ${id} existe déjà.`); process.exit(1); }

const j = JSON.stringify;
const lignes = [
  `      "id": ${j(id)},`,
  `      "date": ${j(date)},`,
  `      "produit": ${j(produit)},`,
  `      "type": ${j(type)},`,
  ...(featureId ? [`      "featureId": ${Number(featureId)},`] : []),
  ...(maquette ? [`      "maquette": ${j(maquette)},`] : []),
  `      "fr": { "titre": ${j(titre)}, "resume": ${j(resume)} }`,
];
const bloc = `    },\n    {\n${lignes.join('\n')}\n    }\n  ]\n}\n`;

const texte = fs.readFileSync(fichier, 'utf8');
const i = texte.lastIndexOf('    }\n  ]');
if (i < 0) { console.error('Format inattendu : fin du tableau introuvable.'); process.exit(1); }
const suivant = texte.slice(0, i) + bloc;
JSON.parse(suivant); // garde-fou : ne jamais écrire un JSON invalide
fs.writeFileSync(fichier, suivant);
console.log(`Ajouté : ${id}\nPense à fournir les versions en/es si tu veux les montrer (sinon le français s'affiche).`);
