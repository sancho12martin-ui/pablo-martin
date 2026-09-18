import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'prix',
  title: 'Prix',
  type: 'document',
  fields: [
    defineField({ name: 'date', title: 'Date', type: 'string', validation: r => r.required() }),
    defineField({ name: 'annee', title: 'Année', type: 'number' }),
    defineField({ name: 'mois', title: 'Mois', type: 'string' }),
    defineField({ name: 'titre', title: 'Titre du prix', type: 'string', validation: r => r.required() }),
    defineField({ name: 'festival', title: 'Festival', type: 'string' }),
    defineField({ name: 'film', title: 'Film', type: 'string' }),
    defineField({ name: 'real', title: 'Réalisateur', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'url' }),
  ],
  orderings: [
    { title: 'Date (décroissant)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ]
})