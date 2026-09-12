'use client'

import { useState } from 'react'
import { BlueprintCorners } from './BlueprintCorners'

const NAIRA = new Intl.NumberFormat('en-NG')

/**
 * The dedicated donation form for the standalone /donate page (mockup
 * section 1i's right-hand panel) — distinct from the compact `DonatePanel`
 * banner reused on the homepage. Same Cyberpay checkout flow underneath,
 * but with the fuller field set (designation, name, email all visible up
 * front, not progressively revealed) that the mockup's dedicated page shows.
 */
export function DonateForm({
  note,
  currency,
  suggestedAmounts,
}: {
  note?: string
  currency?: string
  suggestedAmounts?: number[]
}) {
  const amounts = suggestedAmounts?.length ? suggestedAmounts : [10000, 50000, 250000]

  const [selected, setSelected] = useState<number | null>(amounts[0] ?? null)
  const [customOpen, setCustomOpen] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const [designation, setDesignation] = useState('Where it is needed most')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const amount = customOpen ? Number(customAmount) || 0 : (selected ?? 0)

  function chooseAmount(value: number) {
    setSelected(value)
    setCustomOpen(false)
  }

  function chooseOther() {
    setCustomOpen(true)
    setSelected(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!amount || amount < 100) {
      setError('Enter an amount of at least ₦100.')
      setStatus('error')
      return
    }
    if (!email) {
      setError('Enter an email address so we can send your receipt.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: currency || 'NGN',
          email,
          name: name || undefined,
          designation: designation || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data?.checkoutUrl) {
        throw new Error(data?.error || 'Could not start the donation. Please try again.')
      }
      window.location.href = data.checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div
      className="blueprint relative p-6 tablet-up:p-9"
      style={{ borderColor: 'var(--color-accent)' }}
    >
      <BlueprintCorners />
      <h3 className="mb-4.5 font-display text-lg font-bold">Make a donation</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3.5">
          <label className="mb-1.5 block text-[11px] tracking-[0.1em] text-neutral-700 uppercase">Amount</label>
          <div className="mb-2 flex flex-wrap gap-2">
            {amounts.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => chooseAmount(value)}
                className={!customOpen && selected === value ? 'tag tag-accent' : 'tag tag-outline'}
              >
                ₦{NAIRA.format(value)}
              </button>
            ))}
            <button
              type="button"
              onClick={chooseOther}
              className={customOpen ? 'tag tag-accent' : 'tag tag-outline border-dashed'}
            >
              Other
            </button>
          </div>
          {customOpen && (
            <input
              type="number"
              min={100}
              inputMode="numeric"
              placeholder="Other amount (₦)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
            />
          )}
        </div>

        <div className="mb-3.5">
          <label className="mb-1.5 block text-[11px] tracking-[0.1em] text-neutral-700 uppercase">Direct my gift to</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
          />
        </div>

        <div className="mb-3.5">
          <label className="mb-1.5 block text-[11px] tracking-[0.1em] text-neutral-700 uppercase">Full name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-[11px] tracking-[0.1em] text-neutral-700 uppercase">Email</label>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
          />
        </div>

        <button type="submit" disabled={status === 'submitting'} className="btn btn-primary btn-block">
          {status === 'submitting' ? 'Redirecting…' : 'Continue to payment'}
        </button>
        {error && <p className="mt-2 text-[13px] text-red-700">{error}</p>}
        <p className="mt-2.5 text-xs text-neutral-700">{note || 'Payments are processed securely by Cyberpay.'}</p>
      </form>
    </div>
  )
}
