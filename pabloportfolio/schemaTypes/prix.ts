import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'prix',
  title: 'Prix',
  type: 'document',
  preview: {
    select: {
      title: 'titre',
      subtitle: 'festival',
    }
  },
  fields: [
    orderRankField({ type: 'prix' }),
    defineField({
      name: 'titre',
      title: 'Titre du prix',
      type: 'string',
      description: 'Ex: Best Cinematography.',
      validation: r => r.required()
    }),
    defineField({
      name: 'festival',
      title: 'Festival / Cérémonie',
      type: 'string',
      description: 'Ex: FICOCC (Five Continents International Film Festival) - Venezuela.'
    }),
    defineField({
      name: 'film',
      title: 'Film récompensé',
      type: 'string',
      description: 'Titre du film pour lequel le prix a été décerné — ex: Under a Cloud.'
    }),
    defineField({
      name: 'real',
      title: 'Réalisateur du film',
      type: 'string',
      description: 'Ex: Frédéric Astruc.'
    }),
    defineField({
      name: 'annee',
      title: 'Année',
      type: 'number',
      description: 'Année du prix — ex: 2026.'
    }),
    defineField({
      name: 'date',
      title: 'Date (pour le tri)',
      type: 'string',
      description: 'Format obligatoire : YYYY-MM — ex: 2026-01. Utilisé uniquement pour le tri chronologique.',
      validation: r => r.required()
    }),
    defineField({
      name: 'mois',
      title: 'Mois (affiché sur le site)',
      type: 'string',
      description: 'Ex: Janvier 2026.'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description du prix ou contexte — ex: Prix de la meilleure photographie décerné au FICOCC.'
    }),
    defineField({
      name: 'image',
      title: 'Logo / Image du prix',
      type: 'url',
      description: 'URL du logo depuis Cloudinary — laisser vide si non disponible. Pensez à uploader le logo dans narratif/[slug-film]/prix/ sur Cloudinary.'
    }),
  ],
  orderings: [
    orderRankOrdering,
    { title: 'Date (décroissant)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ]
})