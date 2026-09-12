import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TOPICS = new Set(['general', 'membership', 'scholarships', 'partnership'])

export async function POST(request: NextRequest) {
  let body: { name?: unknown; email?: unknown; phone?: unknown; topic?: unknown; message?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined
  const topic = typeof body.topic === 'string' && TOPICS.has(body.topic) ? body.topic : 'general'
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }
  if (!message) {
    return NextResponse.json({ error: 'Enter a message so we know how to help.' }, { status: 400 })
  }

  try {
    await writeClient.create({
      _type: 'enquiry',
      name: name || undefined,
      email,
      phone,
      topic,
      message,
      status: 'new',
      submittedAt: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] failed to save enquiry', err)
    return NextResponse.json({ error: 'Could not send your enquiry right now. Please try again shortly.' }, { status: 502 })
  }
}
