import Link from 'next/link'
import { writeClient } from '@/sanity/lib/writeClient'

export const metadata = {
  title: 'Thank you — The Seals Endowment Foundation',
}

type DonationRecord = {
  status: 'pending' | 'completed' | 'declined' | 'refunded'
  amount?: number
  currency?: string
}

const COPY: Record<DonationRecord['status'], { heading: string; body: string }> = {
  completed: {
    heading: 'Thank you for your gift',
    body: 'Your donation has been received. A confirmation has been sent to your email address.',
  },
  pending: {
    heading: "We're confirming your payment",
    body: "Cyberpay hasn't confirmed this payment yet — that usually takes a few seconds. Refresh this page shortly, or check your email for a receipt.",
  },
  declined: {
    heading: 'This payment was not completed',
    body: "It looks like the payment didn't go through. No funds were taken. Please try again, or contact us if you'd like help completing your gift.",
  },
  refunded: {
    heading: 'This payment was refunded',
    body: 'This donation was refunded. Contact us if you believe this is a mistake.',
  },
}

export default async function DonateThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams

  const donation = ref
    ? await writeClient.fetch<DonationRecord | null>(
        `*[_type == "donation" && merchantReference == $ref][0]{ status, amount, currency }`,
        { ref },
      )
    : null

  const status = donation?.status || (ref ? 'pending' : undefined)
  const copy = status ? COPY[status] : null

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[640px] flex-col items-start justify-center px-6 py-20">
      <p className="eyebrow">Donation</p>
      <h1 className="mt-3 font-display text-[32px] font-bold leading-[1.05] tracking-[-0.01em]">
        {copy?.heading || "We couldn't find that donation"}
      </h1>
      <p className="mt-4 max-w-[52ch] text-base text-neutral-700">
        {copy?.body ||
          "We don't have a record matching this link. If you completed a payment, check your email for a receipt, or contact us."}
      </p>
      {donation?.amount != null && (
        <p className="mt-4 text-sm text-neutral-700">
          Amount: {donation.currency || 'NGN'} {donation.amount.toLocaleString()}
        </p>
      )}
      <Link href="/" className="btn btn-primary mt-8">
        Back to the homepage
      </Link>
    </main>
  )
}
