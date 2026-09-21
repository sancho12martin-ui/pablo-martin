import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from './orderRank'

const pour = (...rubriques: string[]) =>
  ({ document }: { document?: any }) => !rubriques.includes(document?.rubrique)

export default defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'document',
  preview: {
    select: { title: 'titre', rubrique: 'rubrique', source: 'source', festival: 'festival', lieu: 'lieu', annee: 'annee' },
    prepare({ title, rubrique, source, festival, lieu, annee }: any) {
      const label: Record<string, string> = { presse: '📰 Presse', prix: '🏆 Prix', parcours: '🎓 Parcours' }
      const detail = source || festival || lieu || ''
      return {
        title,
        subtitle: [label[rubrique] ?? '', detail, annee].filter(Boolean).join(' · '),
      }
    },
  },
  fields: [
    orderRankField({ type: 'timeline' }),

    // ── Choix principal ──
    defineField({
      name: 'rubrique',
      title: 'Type d\'élément',
      type: 'string',
      description: 'Choisissez ce que vous ajoutez : les champs à remplir s\'adaptent.',
      options: {
        list: [
          { title: '📰 Presse', value: 'presse' },
          { title: '🏆 Prix', value: 'prix' },
          { title: '🎓 Parcours', value: 'parcours' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: r => r.required(),
    }),

    // ── Communs ──
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      description: 'Presse : titre de l\'article. Prix : nom du prix (ex: Best Cinematography). Parcours : ex: ENSAV — École Nationale Supérieure d\'Audiovisuel.',
      validation: r => r.required(),
    }),
    defineField({
      name: 'annee',
      title: 'Année',
      type: 'number',
      description: 'Ex: 2025.',
    }),
    defineField({
      name: 'mois',
      title: 'Mois (affiché sur le site)',
      type: 'string',
      description: 'Ex: Mars 2025. Laisser vide si non applicable.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Presse : résumé ou extrait. Prix : contexte du prix. Parcours : détails sur la formation ou l\'expérience.',
    }),

    // ── Presse ──
    defineField({
      name: 'source',
      title: 'Source — Nom du média',
      type: 'string',
      description: 'Ex: Le Monde, Aveyron Cinéma, Libération...',
      hidden: pour('presse'),
    }),
    defineField({
      name: 'lien',
      title: 'Lien vers l\'article',
      type: 'url',
      description: 'URL complète vers l\'article en ligne.',
      hidden: pour('presse'),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant URL',
      type: 'slug',
      options: { source: 'titre' },
      description: 'Cliquez sur "Generate".',
      hidden: pour('presse'),
    }),

    // ── Prix ──
    defineField({
      name: 'festival',
      title: 'Festival / Cérémonie',
      type: 'string',
      description: 'Ex: FICOCC (Five Continents International Film Festival) - Venezuela.',
      hidden: pour('prix'),
    }),
    defineField({
      name: 'film',
      title: 'Film récompensé',
      type: 'string',
      description: 'Ex: Under a Cloud.',
      hidden: pour('prix'),
    }),
    defineField({
      name: 'real',
      title: 'Réalisateur du film',
      type: 'string',
      description: 'Ex: Frédéric Astruc.',
      hidden: pour('prix'),
    }),

    // ── Presse + Prix ──
    defineField({
      name: 'image',
      title: 'Image / Logo',
      type: 'url',
      description: 'URL depuis Cloudinary (image de l\'article ou logo du prix). Laisser vide si non disponible.',
      hidden: pour('presse', 'prix'),
    }),

    // ── Parcours ──
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: '🎓 Formation', value: 'formation' },
          { title: '💼 Expérience', value: 'experience' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      description: 'Formation académique ou expérience professionnelle.',
      hidden: pour('parcours'),
    }),
    defineField({
      name: 'lieu',
      title: 'Lieu',
      type: 'string',
      description: 'Ex: Toulouse, France.',
      hidden: pour('parcours'),
    }),
  ],
  orderings: [
    orderRankOrdering,
  ],
})