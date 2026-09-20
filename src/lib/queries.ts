import { sanityClient } from './sanity'

// ── FILMS ──
export async function getFilms() {
  return await sanityClient.fetch(`
    *[_type == "film" && visible != false] | order(orderRank) {
      "slug": slug.current,
      titre,
      genre,
      duree,
      date,
      annee,
      pays,
      ville,
      roles,
      real,
      prix,
      synopsis,
      youtube,
      vimeo,
      mubi,
      cameras,
      "specs": {
        "Ratio de cadre": specs.ratio,
        "Master": specs.master
      },
      "credits": credits[]{
        "poste": select(defined(posteCustom) && posteCustom != "" => posteCustom, poste),
        "nom": select(
          defined(noms) && length(noms) > 0 => array::join(noms, " · "),
          nom
        )
      },
      ordre
    }
  `)
}

export async function getFilmBySlug(slug: string) {
  return await sanityClient.fetch(`
    *[_type == "film" && slug.current == $slug][0] {
      "slug": slug.current,
      titre,
      genre,
      duree,
      date,
      annee,
      pays,
      ville,
      roles,
      real,
      prix,
      synopsis,
      youtube,
      vimeo,
      mubi,
      cameras,
      "specs": {
        "Ratio de cadre": specs.ratio,
        "Master": specs.master
      },
      "credits": credits[]{
        "poste": select(defined(posteCustom) && posteCustom != "" => posteCustom, poste),
        "nom": select(
          defined(noms) && length(noms) > 0 => array::join(noms, " · "),
          nom
        )
      },
    }
  `, { slug })
}

// ── PRESSE ──
export async function getPresse() {
  return await sanityClient.fetch(`
    *[_type == "presse"] | order(orderRank) {
      "slug": slug.current,
      date,
      annee,
      mois,
      "type": "presse",
      source,
      titre,
      description,
      lien,
      image
    }
  `)
}

// ── PRIX ──
export async function getPrix() {
  return await sanityClient.fetch(`
    *[_type == "prix"] | order(orderRank) {
      date,
      annee,
      mois,
      "type": "prix",
      titre,
      festival,
      film,
      real,
      description,
      image
    }
  `)
}

// ── PARCOURS ──
export async function getParcours() {
  return await sanityClient.fetch(`
    *[_type == "parcours"] | order(orderRank) {
      date,
      annee,
      mois,
      "type": "parcours",
      categorie,
      titre,
      description,
      lieu
    }
  `)
}