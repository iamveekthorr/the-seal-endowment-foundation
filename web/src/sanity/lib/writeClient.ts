import 'server-only'
import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../env'

const writeToken = process.env.SANITY_API_WRITE_TOKEN

if (!writeToken) {
  throw new Error('Missing environment variable: SANITY_API_WRITE_TOKEN')
}

// Editor-rights client for server-side writes only (creating/updating
// `donation` log documents from the Cyberpay routes). Never import this
// from a Client Component or anywhere the token could reach the browser.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: writeToken,
})
