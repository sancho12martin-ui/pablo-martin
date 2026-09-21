import { defineField } from 'sanity'

const LONGUEUR = 6
const PAS = 512

function encoder(n: number): string {
  return Math.max(0, Math.round(n)).toString(36).padStart(LONGUEUR, '0')
}

function analyser(rang: string): { bucket: string; valeur: number } | null {
  const m = /^([0-9])\|([0-9a-z]+):/.exec(rang)
  if (!m) return null
  return { bucket: m[1], valeur: parseInt(m[2], 36) }
}

function rangSuivant(rang: string | null): string {
  const p = rang ? analyser(rang) : null
  if (!p) return '0|100000:'
  return `${p.bucket}|${encoder(p.valeur + PAS)}:`
}

function rangPrecedent(rang: string | null): string {
  const p = rang ? analyser(rang) : null
  if (!p) return '0|100000:'
  return `${p.bucket}|${encoder(Math.floor(p.valeur / 2))}:`
}

export function orderRankField(config: { type: string; newItemPosition?: 'before' | 'after' }) {
  const position = config.newItemPosition ?? 'after'

  return defineField({
    name: 'orderRank',
    title: 'Ordre',
    type: 'string',
    hidden: true,
    initialValue: async (_params: any, { getClient }: any) => {
      const client = getClient({ apiVersion: '2024-01-01' })
      const ordre = position === 'before' ? 'asc' : 'desc'
      const reference: string | null = await client.fetch(
        `*[_type == $type && defined(orderRank)] | order(orderRank ${ordre})[0].orderRank`,
        { type: config.type }
      )
      return position === 'before' ? rangPrecedent(reference) : rangSuivant(reference)
    },
  })
}

export const orderRankOrdering = {
  title: 'Ordre manuel',
  name: 'orderRankAsc',
  by: [{ field: 'orderRank', direction: 'asc' as const }],
}