import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
  name: 'parcours',
  title: 'Parcours',
  type: 'document',
  preview: {
    select: {
      title: 'titre',
      subtitle: 'annee',
    }
  },
  fields: [
    orderRankField({ type: 'parcours' }),
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
      description: 'Ex: ENSAV — École Nationale Supérieure d\'Audiovisuel.',
      validation: r => r.required()
    }),
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
      description: 'Formation académique ou expérience professionnelle.'
    }),
    defineField({
      name: 'annee',
      title: 'Année',
      type: 'number',
      description: 'Année de début ou année principale — ex: 2021.'
    }),
    defineField({
      name: 'date',
      title: 'Date (pour le tri)',
      type: 'string',
      description: 'Format obligatoire : YYYY-MM — ex: 2021-09. Utilisé uniquement pour le tri chronologique.',
      validation: r => r.required()
    }),
    defineField({
      name: 'mois',
      title: 'Mois (affiché sur le site)',
      type: 'string',
      description: 'Ex: Septembre 2021, ou laisser vide si non applicable.'
    }),
    defineField({
      name: 'lieu',
      title: 'Lieu',
      type: 'string',
      description: 'Ex: Toulouse, France.'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Détails sur la formation ou l\'expérience.'
    }),
  ],
  orderings: [
    orderRankOrdering,
    { title: 'Date (décroissant)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ]
})