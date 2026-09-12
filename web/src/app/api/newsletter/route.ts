import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: { email?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  try {
    // One subscriber document per email — re-subscribing just refreshes the
    // timestamp instead of creating a duplicate.
    await writeClient.createOrReplace({
      // No dot in the id — see the note in /api/seed/route.ts: this
      // dataset's public read rule hides any document whose _id contains
      // a ".", so use a hyphen separator instead.
      _id: `newsletterSubscriber-${Buffer.from(email).toString('base64url')}`,
      _type: 'newsletterSubscriber',
      email,
      subscribedAt: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[newsletter] failed to save subscriber', err)
    return NextResponse.json({ error: 'Could not subscribe right now. Please try again shortly.' }, { status: 502 })
  }
}
