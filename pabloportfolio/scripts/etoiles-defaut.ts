import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01', useCdn: false })
const DRY = process.argv.includes('--dry')

const norm = (s: string) =>
  (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

const estAffiche = (poste: string) => {
  const p = norm(poste)
  return (
    p === 'production' ||
    p.includes('producteur') ||
    p.includes('assistant camera') ||
    p.includes('assistante camera') ||
    p.includes('prestataire')
  )
}

async function main() {
  const films = await client.fetch(`*[_type == "film"]{ _id, titre, credits }`)
  let total = 0
  for (const f of films) {
    const sets: Record<string, boolean> = {}
    for (const c of f.credits || []) {
      if (typeof c.afficher === 'boolean' && c.afficher) continue
      const poste = c.poste || c.posteCustom || ''
      if (estAffiche(poste)) {
        sets[`credits[_key=="${c._key}"].afficher`] = true
        console.log(`${DRY ? '[dry] ' : ''}${f.titre} : ⭐ ${poste}`)
      }
    }
    const n = Object.keys(sets).length
    total += n
    if (n && !DRY) await client.patch(f._id).set(sets).commit()
  }
  console.log(`${total} crédits ${DRY ? 'à cocher (essai)' : 'cochés'}.`)
}

main().catch((e) => { console.error(e); process.exit(1) })