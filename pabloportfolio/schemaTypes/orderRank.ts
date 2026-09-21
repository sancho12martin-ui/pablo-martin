import { defineField } from 'sanity'

export function orderRankField(config: { type: string }) {
  return defineField({
    name: 'orderRank',
    title: 'Ordre',
    type: 'string',
    hidden: true,
  })
}

export const orderRankOrdering = {
  title: 'Ordre manuel',
  name: 'orderRankAsc',
  by: [{ field: 'orderRank', direction: 'asc' as const }],
}