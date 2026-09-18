import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titre' }, validation: r => r.required() }),
    defineField({ name: 'titre', title: 'Titre', type: 'string', validation: r => r.required() }),
    defineField({ name: 'genre', title: 'Genre', type: 'string' }),
    defineField({ name: 'duree', title: 'Durée', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'string' }),
    defineField({ name: 'annee', title: 'Année', type: 'number' }),
    defineField({ name: 'pays', title: 'Pays', type: 'string' }),
    defineField({ name: 'ville', title: 'Ville', type: 'string' }),
    defineField({ name: 'roles', title: 'Rôles', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'real', title: 'Réalisateur', type: 'string' }),
    defineField({ name: 'prix', title: 'Prix', type: 'string' }),
    defineField({ name: 'synopsis', title: 'Synopsis', type: 'text' }),
    defineField({ name: 'youtube', title: 'YouTube ID', type: 'string' }),
    defineField({ name: 'vimeo', title: 'Vimeo ID', type: 'string' }),
    defineField({ name: 'mubi', title: 'MUBI URL', type: 'url' }),
    defineField({
      name: 'cameras',
      title: 'Caméras',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'type', title: 'Type', type: 'string', options: { list: ['numerique', 'argentique'] } },
          { name: 'nom', title: 'Nom', type: 'string' },
          { name: 'optiques', title: 'Optiques', type: 'string' },
          { name: 'format', title: 'Format', type: 'string' },
          { name: 'laboratoire', title: 'Laboratoire', type: 'string' },
        ]
      }]
    }),
    defineField({
      name: 'specs',
      title: 'Specs',
      type: 'object',
      fields: [
        { name: 'ratio', title: 'Ratio de cadre', type: 'string' },
        { name: 'master', title: 'Master', type: 'string' },
      ]
    }),
    defineField({
      name: 'credits',
      title: 'Crédits',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'poste', title: 'Poste', type: 'string' },
          { name: 'nom', title: 'Nom', type: 'string' },
        ]
      }]
    }),
    defineField({ name: 'ordre', title: 'Ordre d\'affichage', type: 'number' }),
  ],
  orderings: [
    { title: 'Ordre d\'affichage', name: 'ordreAsc', by: [{ field: 'ordre', direction: 'asc' }] },
    { title: 'Année (décroissant)', name: 'anneeDesc', by: [{ field: 'annee', direction: 'desc' }] },
  ]
})