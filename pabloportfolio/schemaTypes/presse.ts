import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'presse',
  title: 'Presse',
  type: 'document',
  fields: [
defineField({ 
  name: 'slug', 
  title: 'Identifiant URL', 
  type: 'slug', 
  options: { source: 'titre' },
  hidden: true,
  validation: r => r.required() 
}),    defineField({ name: 'date', title: 'Date', type: 'string', validation: r => r.required() }),
    defineField({ name: 'annee', title: 'Année', type: 'number' }),
    defineField({ name: 'mois', title: 'Mois', type: 'string' }),
    defineField({ name: 'source', title: 'Source (nom du média)', type: 'string' }),
    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'lien', title: 'Lien vers l\'article', type: 'url' }),
    defineField({ name: 'image', title: 'Image', type: 'url' }),
  ],
  orderings: [
    { title: 'Date (décroissant)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ]
})