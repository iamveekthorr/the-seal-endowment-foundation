import 'server-only'
import crypto from 'node:crypto'

// Cyberpay hosted-cashier integration.
// Docs: https://docs.cyberpay.link/api/ (Payins) and
// https://docs.cyberpay.link/docs/documentation/Signatures/ (webhook auth).
// Base URLs: https://api.test.cyberpay.link (test) / https://api.cyberpay.link (live).

const BASE_URL = process.env.CYBERPAY_BASE_URL || 'https://api.test.cyberpay.link'
const API_KEY = process.env.CYBERPAY_API_KEY
const SIGNATURE_KEY = process.env.CYBERPAY_SIGNATURE_KEY

function assertConfigured() {
  if (!API_KEY) throw new Error('Missing environment variable: CYBERPAY_API_KEY')
}

export type CyberpayCustomer = {
  name?: string
  email: string
  phone?: string
}

export type CreatePaymentSessionInput = {
  amount: number
  currency: string
  customer: CyberpayCustomer
  redirectUrl: string
  merchantReference: string
  country?: string
}

export type CreatePaymentSessionResult = {
  cashierUrl: string
  transactionId: string
}

/**
 * POST /payment-session — creates a hosted-cashier session and returns the
 * link to redirect the donor to. Sessions expire after 30 minutes.
 */
export async function createPaymentSession(
  input: CreatePaymentSessionInput,
): Promise<CreatePaymentSessionResult> {
  assertConfigured()

  const res = await fetch(`${BASE_URL}/payment-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY as string,
    },
    body: JSON.stringify({
      country: input.country || 'NG',
      currency: input.currency,
      amount: input.amount,
      redirectUrl: input.redirectUrl,
      merchantReference: input.merchantReference,
      customer: input.customer,
    }),
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Cyberpay payment-session request failed (${res.status}): ${detail}`)
  }

  const data = (await res.json()) as CreatePaymentSessionResult
  return data
}

export type CyberpayTransaction = {
  id: string
  sessionId: string
  status: 'COMPLETED' | 'PENDING' | 'PROCESSING' | 'DECLINED' | 'REFUNDED' | string
  method?: string
  paymentAmount?: number
  currency?: string
  merchantReference?: string
  customer?: CyberpayCustomer
  createdAt?: string
  updatedAt?: string
}

/** GET /payments/{transactionId} — used to double-check status server-side if needed. */
export async function getPaymentByTransactionId(transactionId: string): Promise<CyberpayTransaction> {
  assertConfigured()

  const res = await fetch(`${BASE_URL}/payments/${encodeURIComponent(transactionId)}`, {
    headers: { 'X-API-KEY': API_KEY as string },
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Cyberpay payment lookup failed (${res.status}): ${detail}`)
  }

  return (await res.json()) as CyberpayTransaction
}

/**
 * Verifies the `X-Signature` header on an incoming webhook: HMAC-SHA256 of
 * the raw, unmodified UTF-8 request body, base64-encoded, keyed with the
 * brand's signature secret (CYBERPAY_SIGNATURE_KEY — distinct from the API
 * key). Always verify against the raw body string, never a re-serialized
 * JSON.parse(...) round-trip, since key ordering/whitespace would change
 * the hash.
 */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!SIGNATURE_KEY) throw new Error('Missing environment variable: CYBERPAY_SIGNATURE_KEY')
  if (!signatureHeader) return false

  const expected = crypto.createHmac('sha256', SIGNATURE_KEY).update(rawBody, 'utf8').digest('base64')

  const a = Buffer.from(expected)
  const b = Buffer.from(signatureHeader)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

function mapCyberpayStatus(status: string): 'pending' | 'completed' | 'declined' | 'refunded' {
  switch (status) {
    case 'COMPLETED':
      return 'completed'
    case 'DECLINED':
      return 'declined'
    case 'REFUNDED':
      return 'refunded'
    default:
      return 'pending'
  }
}

export { mapCyberpayStatus }
