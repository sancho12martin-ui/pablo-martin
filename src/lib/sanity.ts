import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'mv8aoo5o',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})