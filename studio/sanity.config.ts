import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './src/schemaTypes'
import { structure } from './src/structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your-project-id>'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// The Next.js dev/production URL this Studio previews against — see
// web/.env's NEXT_PUBLIC_SITE_URL. Override with
// SANITY_STUDIO_PREVIEW_URL if the web app runs somewhere else.
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'default',
  title: 'The Seals Endowment Foundation',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    // The GROQ-testing "Vision" tab — handy while wiring up the frontend queries.
    visionTool({ defaultApiVersion: '2026-02-01' }),
    // Visual Editing: click-to-navigate overlays on the live site, driven
    // from here. Requires the web app's /api/draft-mode/enable route (see
    // web/src/app/api/draft-mode/) and next-sanity's <VisualEditing/> in
    // its root layout — both already wired up.
    presentationTool({
      previewUrl: {
        origin: previewUrl,
        draftMode: { enable: '/api/draft-mode/enable' },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
