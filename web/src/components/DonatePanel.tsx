'use client'

import { useState } from 'react'
import { BlueprintCorners } from './BlueprintCorners'

const NAIRA = new Intl.NumberFormat('en-NG')

export function DonatePanel({
  heading,
  body,
  note,
  currency,
  suggestedAmounts,
}: {
  heading?: string
  body?: string
  note?: string
  currency?: string
  suggestedAmounts?: number[]
}) {
  const amounts = suggestedAmounts?.length ? suggestedAmounts : [10000, 50000, 250000]

  const [selected, setSelected] = useState<number | null>(amounts[0] ?? null)
  const [customOpen, setCustomOpen] = useState(false)
  const [customAmount, setCustomAmount] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const amount = customOpen ? Number(customAmount) || 0 : selected ?? 0

  function chooseAmount(value: number) {
    setSelected(value)
    setCustomOpen(false)
  }

  function chooseOther() {
    setCustomOpen(true)
    setSelected(null)
  }

  async function startDonation() {
    if (!amount || amount < 100) {
      setError('Enter an amount of at least ₦100.')
      setStatus('error')
      return
    }
    if (!showDetails) {
      setShowDetails(true)
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
    <section id="donate" className="pb-10 tablet-up:pb-[72px]">
      <div className="mx-auto max-w-[1280px] px-4.5 tablet:px-6 desktop:px-10">
        {/* Forms live inside a .blueprint panel, accent-bordered as the
            page's primary CTA (STYLE-GUIDE.md §5 Forms). */}
        <div
          className="blueprint relative grid grid-cols-1 gap-8 p-6 tablet-up:grid-cols-[1.2fr_1fr] tablet-up:gap-12 tablet-up:p-11"
          style={{ borderColor: 'var(--color-accent)' }}
        >
          <BlueprintCorners />
          <div>
            <h2 className="mb-2.5 font-display text-[26px] font-bold leading-[1.05] tracking-[-0.01em] tablet-up:text-[34px]">
              {heading || 'Give to the endowment'}
            </h2>
            {body && <p className="max-w-[56ch] text-[14.5px] text-neutral-800">{body}</p>}
            {note && <p className="mt-2.5 text-[12.5px] text-neutral-700">{note}</p>}
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
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
                placeholder="Enter amount in NGN"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="mb-2.5 w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
              />
            )}

            {showDetails && (
              <div className="mb-2.5 flex flex-col gap-2.5">
                <input
                  type="text"
                  placeholder="Full name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
              </div>
            )}

            <button
              type="button"
              onClick={startDonation}
              disabled={status === 'submitting'}
              className="btn btn-primary btn-block"
            >
              {status === 'submitting' ? 'Redirecting…' : 'Donate now'}
            </button>
            {error && <p className="mt-2 text-[13px] text-red-700">{error}</p>}
            <p className="mt-2.5 text-xs text-neutral-700">Payments are processed securely by Cyberpay.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
