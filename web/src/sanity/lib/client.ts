import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Fast, CDN-cached reads by default. Individual calls override this
  // (generateStaticParams, webhooks) when they need guaranteed-fresh data —
  // see the Sanity + Next.js integration guide's CDN vs API table.
  useCdn: true,
})
