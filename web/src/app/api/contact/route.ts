import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TOPICS = new Set(['general', 'membership', 'scholarships', 'partnership', 'education', 'healthcare', 'culture', 'livelihoods', 'community'])

export async function POST(request: NextRequest) {
  let body: { name?: unknown; email?: unknown; phone?: unknown; topic?: unknown; supportType?: unknown; message?: unknown; suggestions?: unknown; comments?: unknown; requests?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : undefined
  const topic = typeof body.topic === 'string' && TOPICS.has(body.topic) ? body.topic : 'general'
  const supportType = typeof body.supportType === 'string' ? body.supportType.trim() : undefined
  const message = typeof body.message === 'string' ? body.message.trim() : [
    typeof body.suggestions === 'string' ? `Suggestions: ${body.suggestions.trim()}` : '',
    typeof body.comments === 'string' ? `Comments: ${body.comments.trim()}` : '',
    typeof body.requests === 'string' ? `Requests: ${body.requests.trim()}` : '',
  ].filter(Boolean).join('\n\n')

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
      supportType,
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
