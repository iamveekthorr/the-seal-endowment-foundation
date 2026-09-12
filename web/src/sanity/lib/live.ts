import { defineLive } from 'next-sanity/live'
import { client } from './client'

// The Live Content API: fetching through `sanityFetch` gets automatic
// caching + invalidation and real-time updates in the Presentation Tool,
// without hand-rolled ISR/webhook plumbing. <SanityLive /> (rendered once,
// in the root layout) is what keeps the connection open.
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2026-02-01',
    // Live queries need to bypass the CDN to reflect edits immediately.
    useCdn: false,
  }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
})
