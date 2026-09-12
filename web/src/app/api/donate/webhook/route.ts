import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature, mapCyberpayStatus, type CyberpayTransaction } from '@/lib/cyberpay'
import { writeClient } from '@/sanity/lib/writeClient'

// Cyberpay calls this server-to-server when a payment's status changes.
// Configure the URL (…/api/donate/webhook) in the Cyberpay merchant
// dashboard, and set CYBERPAY_SIGNATURE_KEY to the *signature* secret shown
// there (not the API key) — see src/lib/cyberpay.ts for the verification
// details. Always read the raw body for signature verification before any
// JSON.parse, and always return quickly (Cyberpay retries on non-2xx).
export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-signature')

  let verified: boolean
  try {
    verified = verifyWebhookSignature(rawBody, signature)
  } catch (err) {
    console.error('[donate/webhook] signature verification misconfigured', err)
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 500 })
  }

  if (!verified) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 })
  }

  let transaction: CyberpayTransaction
  try {
    transaction = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const merchantReference = transaction.merchantReference
  if (!merchantReference) {
    // Nothing we can correlate this to — acknowledge so Cyberpay doesn't
    // retry forever, but log it for manual follow-up.
    console.warn('[donate/webhook] payload had no merchantReference', transaction)
    return NextResponse.json({ received: true })
  }

  const status = mapCyberpayStatus(transaction.status)

  const existing = await writeClient.fetch<{ _id: string; status: string } | null>(
    `*[_type == "donation" && merchantReference == $ref][0]{ _id, status }`,
    { ref: merchantReference },
  )

  if (!existing) {
    console.warn('[donate/webhook] no donation record for reference', merchantReference)
    return NextResponse.json({ received: true })
  }

  const patch: Record<string, unknown> = {
    status,
    transactionId: transaction.id,
    cyberpayMethod: transaction.method,
  }
  if (existing.status === 'pending' && status !== 'pending') {
    patch.confirmedAt = new Date().toISOString()
  }

  await writeClient.patch(existing._id).set(patch).commit()

  // TODO: once an email service is wired up, send the donor a receipt here
  // when status === 'completed'.

  return NextResponse.json({ received: true })
}
