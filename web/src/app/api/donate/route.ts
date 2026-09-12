import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { createPaymentSession } from '@/lib/cyberpay'
import { writeClient } from '@/sanity/lib/writeClient'

export async function POST(request: NextRequest) {
  let body: { amount?: unknown; currency?: unknown; email?: unknown; name?: unknown; designation?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const amount = Number(body.amount)
  const currency = typeof body.currency === 'string' && body.currency ? body.currency : 'NGN'
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const name = typeof body.name === 'string' ? body.name.trim() : undefined
  const designation = typeof body.designation === 'string' ? body.designation.trim() : undefined

  if (!Number.isFinite(amount) || amount < 100) {
    return NextResponse.json({ error: 'Enter an amount of at least ₦100.' }, { status: 400 })
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const merchantReference = `sef-${crypto.randomUUID()}`
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin
  const redirectUrl = `${siteUrl}/donate/thank-you?ref=${encodeURIComponent(merchantReference)}`

  try {
    const session = await createPaymentSession({
      amount,
      currency,
      customer: { email, name },
      redirectUrl,
      merchantReference,
    })

    // Log the attempt before the donor even reaches the cashier, so the
    // thank-you page (and the Foundation's Studio) has a record to look up
    // even if the donor never completes payment or the webhook is delayed.
    await writeClient.create({
      _type: 'donation',
      merchantReference,
      transactionId: session.transactionId,
      status: 'pending',
      amount,
      currency,
      donorName: name,
      donorEmail: email,
      designation,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({ checkoutUrl: session.cashierUrl })
  } catch (err) {
    console.error('[donate] failed to create Cyberpay session', err)
    return NextResponse.json(
      { error: 'Could not start the donation right now. Please try again shortly.' },
      { status: 502 },
    )
  }
}
