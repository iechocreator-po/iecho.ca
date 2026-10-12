// Flux RSS du journal de bord (français : les entrées sont rédigées en français). Généré au build.
import type { APIRoute } from 'astro';
import data from '../data/journal/entries.json';

const categories: Record<string, string> = { livre: 'Livré', anticipe: 'Anticipé', decouverte: 'Découverte' };
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c] as string));

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://iecho.ca')).toString().replace(/\/$/, '');
  const entrees = [...data.entries].sort((a, b) => b.date.localeCompare(a.date));
  const items = entrees.map((e) => `
    <item>
      <title>${esc(`${e.produit} — ${e.fr.titre}`)}</title>
      <link>${base}/fr/journal/#${esc(e.id)}</link>
      <guid isPermaLink="false">${esc(e.id)}</guid>
      <pubDate>${new Date(e.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <category>${categories[e.type] ?? e.type}</category>
      <description>${esc(e.fr.resume)}</description>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>iecho — journal de bord</title>
    <link>${base}/fr/journal/</link>
    <description>Ce qui est livré, ce qui s'annonce.</description>
    <language>fr</language>${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
