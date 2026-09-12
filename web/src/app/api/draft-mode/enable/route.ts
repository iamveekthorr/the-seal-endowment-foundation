import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

// Called by the Presentation Tool (Studio → Visual Editing) to turn on
// draft mode for this browser session, so the site starts reading
// draft/unpublished content instead of the published dataset.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})
