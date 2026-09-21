import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01', useCdn: false })
const DRY = process.argv.includes('--dry')
const cle = () => Math.random().toString(36).slice(2, 14)

async function main() {
  // Inclut les brouillons
  const films = await client.fetch(`*[_type == "film" && defined(credits)]{ _id, titre, credits }`)
  let nbCredits = 0

  for (const f of films) {
    let modifie = false
    const credits = (f.credits || []).map((c: any) => {
      const { nom, ...reste } = c
      const aDejaNoms = Array.isArray(c.noms) && c.noms.length > 0

      // Rien à faire si le crédit est déjà au bon format
      if (nom === undefined) return { ...reste, _key: c._key || cle() }

      modifie = true
      nbCredits++
      const noms = aDejaNoms
        ? c.noms
        : String(nom).split('·').map((n) => n.trim()).filter(Boolean)
      console.log(`${DRY ? '[dry] ' : ''}${f.titre} — ${c.poste || c.posteCustom || '?'} : ${noms.join(' | ')}`)
      return { ...reste, _key: c._key || cle(), noms }
    })

    if (modifie && !DRY) await client.patch(f._id).set({ credits }).commit()
  }

  console.log(`${nbCredits} crédits ${DRY ? 'à convertir (essai, rien écrit)' : 'convertis'}.`)
}

main().catch((e) => { console.error(e); process.exit(1) })