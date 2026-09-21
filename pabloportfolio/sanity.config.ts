import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'PabloPortfolio',
  projectId: 'mv8aoo5o',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: async (S, context) => {
        const { orderableDocumentListDeskItem } = await import('@sanity/orderable-document-list')

        return S.list()
          .title('Contenu')
          .items([
            orderableDocumentListDeskItem({ type: 'film', title: 'Films', S, context }),
            orderableDocumentListDeskItem({ type: 'timeline', title: 'Timeline', S, context }),
          ])
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})