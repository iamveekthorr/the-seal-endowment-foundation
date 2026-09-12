'use client'

import { useState } from 'react'

const TOPICS = [
  { value: 'general', label: 'General enquiry' },
  { value: 'membership', label: 'Membership' },
  { value: 'scholarships', label: 'Scholarships & grants' },
  { value: 'partnership', label: 'Partnership or sponsorship' },
]

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState('general')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, topic, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Something went wrong.')
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="blueprint relative p-7">
        <h3 className="mb-2 font-display text-lg font-bold">Thank you</h3>
        <p className="text-sm text-neutral-700">Your enquiry has been sent — we&apos;ll get back to you shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="blueprint relative p-7">
      <h3 className="mb-4.5 font-display text-lg font-bold">Send an enquiry</h3>

      <label className="mb-3.5 block text-[13px]">
        <span className="mb-1.5 block font-semibold">Full name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
        />
      </label>

      <label className="mb-3.5 block text-[13px]">
        <span className="mb-1.5 block font-semibold">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
        />
      </label>

      <label className="mb-3.5 block text-[13px]">
        <span className="mb-1.5 block font-semibold">Phone</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234"
          className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
        />
      </label>

      <fieldset className="mb-4">
        <legend className="mb-1.5 text-[13px] font-semibold">I am enquiring about</legend>
        <div className="flex flex-col gap-2">
          {TOPICS.map((t) => (
            <label key={t.value} className="flex items-center gap-2 text-[13.5px]">
              <input type="radio" name="topic" value={t.value} checked={topic === t.value} onChange={() => setTopic(t.value)} />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mb-4 block text-[13px]">
        <span className="mb-1.5 block font-semibold">Message</span>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          rows={4}
          className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
        />
      </label>

      <button type="submit" disabled={status === 'submitting'} className="btn btn-primary btn-block">
        {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </button>
      {error && <p className="mt-2 text-[13px] text-red-700">{error}</p>}
    </form>
  )
}
