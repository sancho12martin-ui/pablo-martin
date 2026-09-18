import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'parcours',
  title: 'Parcours',
  type: 'document',
  fields: [
    defineField({ name: 'date', title: 'Date', type: 'string', validation: r => r.required() }),
    defineField({ name: 'annee', title: 'Année', type: 'number' }),
    defineField({ name: 'mois', title: 'Mois', type: 'string' }),
    defineField({ name: 'categorie', title: 'Catégorie', type: 'string', options: { list: ['formation', 'experience'] } }),
    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'lieu', title: 'Lieu', type: 'string' }),
  ],
  orderings: [
    { title: 'Date (décroissant)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ]
})