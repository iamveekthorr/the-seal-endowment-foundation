'use client'

import { useState } from 'react'

export function NewsletterForm({ heading, body }: { heading?: string; body?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Something went wrong.')
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="blueprint relative bg-accent-100 p-5">
      <div className="mb-1.5 font-display text-lg">{heading || 'Newsletter'}</div>
      {body && <p className="mb-2.5 text-[13px] text-neutral-800">{body}</p>}
      {status === 'done' ? (
        <p className="text-[13.5px] font-semibold text-accent-700">You&apos;re subscribed — thank you.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
          />
          <button type="submit" disabled={status === 'submitting'} className="btn btn-primary btn-block">
            {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
          </button>
          {error && <p className="mt-2 text-[12.5px] text-red-700">{error}</p>}
        </form>
      )}
    </div>
  )
}
