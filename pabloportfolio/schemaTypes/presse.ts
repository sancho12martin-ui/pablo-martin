import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'presse',
  title: 'Presse',
  type: 'document',
  preview: {
    select: {
      title: 'titre',
      subtitle: 'source',
    }
  },
  fields: [
    orderRankField({ type: 'presse' }),
    defineField({
      name: 'titre',
      title: 'Titre de l\'article',
      type: 'string',
      description: 'Titre complet de l\'article tel qu\'il apparaîtra sur le site.',
      validation: r => r.required()
    }),
    defineField({
      name: 'source',
      title: 'Source — Nom du média',
      type: 'string',
      description: 'Ex: Le Monde, Aveyron Cinéma, Libération...'
    }),
    defineField({
      name: 'annee',
      title: 'Année',
      type: 'number',
      description: 'Année de publication — ex: 2025.'
    }),
    defineField({
      name: 'date',
      title: 'Date (pour le tri)',
      type: 'string',
      description: 'Format obligatoire : YYYY-MM — ex: 2025-03. Utilisé uniquement pour le tri chronologique.',
      validation: r => r.required()
    }),
    defineField({
      name: 'mois',
      title: 'Mois (affiché sur le site)',
      type: 'string',
      description: 'Ex: Mars 2025.'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Résumé ou extrait de l\'article.'
    }),
    defineField({
      name: 'lien',
      title: 'Lien vers l\'article',
      type: 'url',
      description: 'URL complète vers l\'article en ligne — ex: https://aveyroncinema.fr/...'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'url',
      description: 'URL de l\'image associée à l\'article (depuis Cloudinary) — laisser vide si non disponible.'
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant URL',
      type: 'slug',
      options: { source: 'titre' },
      description: 'Généré automatiquement — cliquez sur "Generate".',
    }),
  ],
  orderings: [
    orderRankOrdering,
    { title: 'Date (décroissant)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ]
})