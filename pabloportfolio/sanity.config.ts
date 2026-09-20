import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'PabloPortfolio',
  projectId: 'mv8aoo5o',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Contenu')
          .items([
            orderableDocumentListDeskItem({ type: 'film', title: 'Films', S, context }),
            orderableDocumentListDeskItem({ type: 'presse', title: 'Presse', S, context }),
            orderableDocumentListDeskItem({ type: 'prix', title: 'Prix', S, context }),
            orderableDocumentListDeskItem({ type: 'parcours', title: 'Parcours', S, context }),
          ])
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})