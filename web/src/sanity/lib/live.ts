import { defineLive } from 'next-sanity/live'
import { client } from './client'

// The Live Content API: fetching through `sanityFetch` gets automatic
// caching + invalidation and real-time updates in the Presentation Tool,
// without hand-rolled ISR/webhook plumbing. <SanityLive /> (rendered once,
// in the root layout) is what keeps the connection open.
const { sanityFetch: sanityFetchInternal, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2026-02-01',
    // Live queries need to bypass the CDN to reflect edits immediately.
    useCdn: false,
  }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
})

// GROQ TypeGen types every field that isn't schema-`required()` as `T | null`
// — that's literally what a missing field comes back as over the wire — but
// every component in this app follows the ordinary React convention of
// optional props being `T | undefined`. Rather than widen every component's
// prop types to also accept `null` (which would also have to thread through
// native DOM attributes like `href` that only accept `undefined`), we
// normalize once, here, right where the data enters the app.
type Denulled<T> = T extends null
  ? undefined
  : T extends (infer U)[]
    ? Denulled<U>[]
    : T extends object
      ? { [K in keyof T]: Denulled<T[K]> }
      : T

function denull<T>(value: T): Denulled<T> {
  if (value === null) return undefined as Denulled<T>
  if (Array.isArray(value)) return value.map((item) => denull(item)) as Denulled<T>
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      out[key] = denull(val)
    }
    return out as Denulled<T>
  }
  return value as Denulled<T>
}

/**
 * `stega: false` is passed explicitly on every call. This project's Sanity
 * client has no `stega.studioUrl` configured, so stega encoding is already
 * off at runtime by default — passing the literal here just selects the
 * clean, non-branded TypeGen types (`string`, not `StegaString<string>`)
 * instead of the ambiguous "might be branded" ones, with no behavior change.
 *
 * Every call site in this app only ever passes `{ query }`, so that's all
 * this wrapper needs to accept — extend it if a future call needs
 * `params`/`perspective`/etc.
 */
export async function sanityFetch<const QueryString extends string>(options: { query: QueryString }) {
  const result = await sanityFetchInternal({ query: options.query, stega: false })
  return { ...result, data: denull(result.data) }
}

export { SanityLive }
