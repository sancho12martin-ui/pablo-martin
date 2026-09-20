import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

const POSTES_STANDARD = [
  'Réalisation', 'Scénario', 'Adaptation', 'Storyboard', 'Production',
  'Producteur', 'Direction de production', 'Assistant de production',
  '1ère assistante réalisation', '2ème assistante réalisation', '3ème assistant réalisation',
  'Script', 'Casting', 'Interprétation', 'Directeur de la Photographie',
  '1er assistant caméra', '2ème assistant caméra', '3ème assistant caméra',
  'Opérateur drone', 'Chef électro', 'Électro', 'Machiniste', 'Assistant machiniste',
  'Ingénieur du son', 'Assistant son', 'Chef décorateur', 'Assistant décorateur',
  'Accessoiriste', 'Costumes', 'Photographe plateau', 'Montage image', 'Montage son',
  'Post-synchronisation', 'Mixage', 'Bruitage', 'Musique originale', 'Musique additionnelle',
  'Effets spéciaux', 'VFX', 'SFX', 'Étalonnage', 'Laboratoire', 'Graphisme',
  'Régie', 'Renfort image', 'Remerciements', 'Prestataires techniques',
]

const ROLES_PABLO = [
  'Directeur de la Photographie',
  'Étalonneur',
  '1er Assistant Caméra',
  '2ème Assistant Caméra',
  '3ème Assistant Caméra',
  'Réalisateur',
  'Chef Opérateur',
]

export default defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  preview: {
    select: {
      title: 'titre',
      subtitle: 'annee',
    }
  },
  fields: [
    orderRankField({ type: 'film' }),

    defineField({
      name: 'visible',
      title: '👁️ Visible sur le site',
      type: 'boolean',
      description: 'Décochez pour masquer ce film sur le site sans le supprimer.',
      initialValue: true,
    }),

    defineField({
      name: 'titre',
      title: 'Titre du film',
      type: 'string',
      description: 'Titre complet du film tel qu\'il apparaîtra sur le site.',
      validation: r => r.required()
    }),

    defineField({
      name: 'slug',
      title: 'Nom du dossier Cloudinary',
      type: 'slug',
      options: { source: 'titre' },
      description: '⚠️ Doit correspondre exactement au nom du dossier sur Cloudinary (ex: under-a-cloud). Minuscules, tirets à la place des espaces, pas d\'accents. Cliquez sur "Generate" pour générer automatiquement.',
      validation: r => r.required()
    }),

    defineField({
      name: 'annee',
      title: 'Année de sortie',
      type: 'number',
      description: 'Ex: 2025.'
    }),

    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'string',
      description: 'Ex: Fiction, Documentaire, Court-métrage...'
    }),

    defineField({
      name: 'duree',
      title: 'Durée',
      type: 'string',
      description: 'Format obligatoire : "18 Min" — avec majuscule sur Min.'
    }),

    defineField({
      name: 'pays',
      title: 'Pays',
      type: 'string',
      description: 'Pays de production — ex: France.'
    }),

    defineField({
      name: 'ville',
      title: 'Ville de tournage',
      type: 'string',
      description: 'Ville principale de tournage — ex: Toulouse. Laisser vide si non applicable.'
    }),

    defineField({
      name: 'real',
      title: 'Réalisateur',
      type: 'string',
      description: 'Prénom et nom du réalisateur — ex: Frédéric Astruc.'
    }),

    defineField({
      name: 'roles',
      title: 'Rôles de Pablo sur ce film',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Cochez les rôles de Pablo. Cliquez sur "+" pour ajouter un rôle personnalisé si absent de la liste.',
      options: {
        list: ROLES_PABLO.map(r => ({ title: r, value: r })),
      },
    }),

    defineField({
      name: 'synopsis',
      title: 'Synopsis',
      type: 'text',
      description: 'Résumé du film. Laisser vide si non disponible.'
    }),

    defineField({
      name: 'prix',
      title: 'Prix / Récompense',
      type: 'string',
      description: 'Ex: Best Cinematography — FICOCC 2026. Laisser vide si aucun prix. Pensez à uploader le logo du prix sur Cloudinary dans le dossier prix/.'
    }),

    defineField({
      name: 'cameras',
      title: '🎥 Caméras utilisées',
      type: 'array',
      description: 'Ajoutez une entrée par caméra. Glissez-déposez pour réordonner.',
      of: [{
        type: 'object',
        title: 'Caméra',
        preview: {
          select: { title: 'nom', subtitle: 'type' }
        },
        fields: [
          {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
              list: [
                { title: '📹 Numérique', value: 'numerique' },
                { title: '🎥 Argentique', value: 'argentique' }
              ],
              layout: 'radio',
              direction: 'horizontal',
            },
          },
          {
            name: 'nom',
            title: 'Nom de la caméra',
            type: 'string',
            description: 'Ex: Sony A7III, Blackmagic 6K Full Frame, Paillard-Bolex H16...'
          },
          {
            name: 'optiques',
            title: 'Optiques',
            type: 'string',
            description: 'Ex: Série DZOFilm Catta-Ace. Laisser vide si non applicable.'
          },
          {
            name: 'format',
            title: 'Format — argentique uniquement',
            type: 'string',
            description: 'Ex: S16mm. Laisser vide pour le numérique.'
          },
          {
            name: 'laboratoire',
            title: 'Laboratoire — argentique uniquement',
            type: 'string',
            description: 'Ex: Color by Dejonghe. Laisser vide pour le numérique.'
          },
        ]
      }]
    }),

    defineField({
      name: 'specs',
      title: '📐 Spécifications techniques',
      type: 'object',
      description: 'Ratio de cadre et format master du film.',
      fields: [
        {
          name: 'ratio',
          title: 'Ratio de cadre',
          type: 'string',
          description: 'Ex: 1,85:1 / 2,35:1 / 1,66:1 / 1,33:1'
        },
        {
          name: 'master',
          title: 'Master',
          type: 'string',
          description: 'Ex: 4K DCI / 2K DCI'
        },
      ]
    }),

    defineField({
      name: 'credits',
      title: '👥 Crédits — Équipe du film',
      type: 'array',
      description: 'Ajoutez un membre par ligne. Choisissez le poste dans la liste ou tapez-en un dans "Poste personnalisé". Glissez-déposez pour réordonner.',
      of: [{
        type: 'object',
        title: 'Membre',
        preview: {
          select: { title: 'poste', subtitle: 'noms' },
          prepare({ title, subtitle }: { title?: string; subtitle?: string[] }) {
            return {
              title: title || 'Poste personnalisé',
              subtitle: subtitle ? subtitle.join(' · ') : ''
            }
          }
        },
        fields: [
          {
            name: 'poste',
            title: 'Poste (liste)',
            type: 'string',
            options: {
              list: POSTES_STANDARD.map(p => ({ title: p, value: p })),
            },
            description: 'Choisissez dans la liste. Si le poste n\'est pas là, utilisez le champ ci-dessous.',
          },
          {
            name: 'posteCustom',
            title: 'Poste personnalisé',
            type: 'string',
            description: 'Tapez ici uniquement si le poste n\'est pas dans la liste ci-dessus.',
            hidden: ({ parent }: { parent: any }) => !!parent?.poste,
          },
          {
            name: 'noms',
            title: 'Nom(s)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Ajoutez une entrée par personne — ex: Jean Dupont.',
          },
        ]
      }]
    }),

    defineField({
      name: 'youtube',
      title: '▶️ YouTube — ID de la vidéo',
      type: 'string',
      description: 'Uniquement l\'ID — ex: DMSQXtiaMdk (pas l\'URL complète). Laisser vide si non disponible.'
    }),

    defineField({
      name: 'vimeo',
      title: '▶️ Vimeo — ID de la vidéo',
      type: 'string',
      description: 'Uniquement l\'ID — ex: 1183015873 (pas l\'URL complète). Laisser vide si non disponible.'
    }),

    defineField({
      name: 'mubi',
      title: '🎬 MUBI — URL complète',
      type: 'url',
      description: 'URL complète — ex: https://mubi.com/fr/films/les-choses-venues. Laisser vide si non disponible.'
    }),
  ],
  orderings: [
    orderRankOrdering,
    { title: 'Année (décroissant)', name: 'anneeDesc', by: [{ field: 'annee', direction: 'desc' }] },
  ]
})