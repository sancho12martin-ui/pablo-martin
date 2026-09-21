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
        ),
        "afficher": coalesce(afficher, false)
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
        ),
        "afficher": coalesce(afficher, false)
      },
    }
  `, { slug })
}

// ── TIMELINE (presse + prix + parcours, ordre défini dans le Studio) ──
export async function getTimeline() {
  return await sanityClient.fetch(`
    *[_type == "timeline"] | order(orderRank asc) {
      _id,
      "slug": slug.current,
      "type": rubrique,
      titre,
      annee,
      mois,
      description,
      source,
      lien,
      image,
      festival,
      film,
      real,
      categorie,
      lieu
    }
  `)
}