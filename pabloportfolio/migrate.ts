import { createClient } from '@sanity/client'
import films from '../src/data/narratif.json'
import presse from '../src/data/presse.json'
import prix from '../src/data/prix.json'
import parcours from '../src/data/parcours.json'

const client = createClient({
  projectId: 'mv8aoo5o',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skGcWIlNbEshJpRCx5aNdA2634deRM9QIQyg0eYMoUNx8zqE89otbe3Po5YjZjLOyJa2VrBhfUbPA5SbNAwuvXL0kEdDtCkarF1Z1ZQ6rmhVogcwfDPeUPv2Qg1QZ15YlhRQdNCflH7HfQK5mvVvNmc5mDYfe0r89eFGv7owwApiHtcF2jkJ',
  useCdn: false,
})

async function migrate() {
  console.log('Migration des films...')
  for (const [i, film] of (films as any[]).entries()) {
    await client.create({
      _type: 'film',
      ...film,
      slug: { _type: 'slug', current: film.slug },
      ordre: i + 1,
      credits: film.credits ? Object.entries(film.credits)
        .filter(([, val]) => val !== null)
        .map(([poste, nom]) => ({ poste, nom })) : [],
      specs: film.specs ? {
        ratio: film.specs['Ratio de cadre'],
        master: film.specs['Master'],
      } : {},
    })
    console.log(`✓ ${film.titre}`)
  }

  console.log('Migration de la presse...')
  for (const article of presse as any[]) {
    await client.create({ _type: 'presse', ...article })
    console.log(`✓ ${article.titre}`)
  }

  console.log('Migration des prix...')
  for (const p of prix as any[]) {
    await client.create({ _type: 'prix', ...p })
    console.log(`✓ ${p.titre}`)
  }

  console.log('Migration du parcours...')
  for (const p of parcours as any[]) {
    await client.create({ _type: 'parcours', ...p })
    console.log(`✓ ${p.titre}`)
  }

  console.log('Migration terminée !')
}

migrate()