'use client'

import { useState } from 'react'

const AREAS = [
  { value: 'education', label: 'Education & schools' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'culture', label: 'Culture & heritage' },
  { value: 'livelihoods', label: 'Livelihoods & enterprise' },
  { value: 'community', label: 'Community development' },
  { value: 'general', label: 'General support' },
]

const SUPPORT_TYPES = [
  { value: 'volunteer', label: 'I would like to volunteer' },
  { value: 'partnership', label: 'I would like to partner or collaborate' },
  { value: 'expertise', label: 'I can offer skills or expertise' },
  { value: 'resources', label: 'I can offer resources or in-kind support' },
  { value: 'learn', label: 'I would like to learn more' },
]

export function SupportForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState('education')
  const [supportType, setSupportType] = useState('volunteer')
  const [suggestions, setSuggestions] = useState('')
  const [comments, setComments] = useState('')
  const [requests, setRequests] = useState('')
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
        body: JSON.stringify({
          name,
          email,
          phone,
          topic: area,
          supportType,
          suggestions,
          comments,
          requests,
        }),
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
        <h2 className="mb-2 font-display text-lg font-bold">Thank you for offering your support</h2>
        <p className="text-sm text-neutral-700">Your message has been received. We&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="blueprint relative p-6 tablet-up:p-7">
      <h2 className="mb-1 font-display text-lg font-bold">Tell us how you&apos;d like to help</h2>
      <p className="mb-5 text-sm text-neutral-700">Share an idea, request, or offer of support with our team.</p>

      <label className="mb-3.5 block text-[13px]">
        <span className="mb-1.5 block font-semibold">Full name</span>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none" />
      </label>

      <div className="grid grid-cols-1 gap-3.5 tablet-up:grid-cols-2">
        <label className="block text-[13px]">
          <span className="mb-1.5 block font-semibold">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none" />
        </label>
        <label className="block text-[13px]">
          <span className="mb-1.5 block font-semibold">Phone <span className="font-normal text-neutral-600">(optional)</span></span>
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234" className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none" />
        </label>
      </div>

      <label className="my-3.5 block text-[13px]">
        <span className="mb-1.5 block font-semibold">Area of concern</span>
        <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none">
          {AREAS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
        </select>
      </label>

      <fieldset className="mb-4">
        <legend className="mb-1.5 text-[13px] font-semibold">How would you like to be of help?</legend>
        <div className="flex flex-col gap-2">
          {SUPPORT_TYPES.map((item) => (
            <label key={item.value} className="flex items-center gap-2 text-[13.5px]"><input type="radio" name="supportType" value={item.value} checked={supportType === item.value} onChange={() => setSupportType(item.value)} />{item.label}</label>
          ))}
        </div>
      </fieldset>

      {[
        ['Suggestions', suggestions, setSuggestions, 'What would you like us to consider?'],
        ['Comments', comments, setComments, 'Share any context or thoughts.'],
        ['Requests', requests, setRequests, 'Is there anything you would like to request?'],
      ].map(([label, value, setter, placeholder]) => (
        <label key={label as string} className="mb-3.5 block text-[13px]">
          <span className="mb-1.5 block font-semibold">{label as string}</span>
          <textarea required={label === 'Comments'} value={value as string} onChange={(e) => (setter as (value: string) => void)(e.target.value)} placeholder={placeholder as string} rows={3} className="w-full border border-divider bg-bg px-4 py-2.5 text-sm focus:border-accent focus:outline-none" />
        </label>
      ))}

      <button type="submit" disabled={status === 'submitting'} className="btn btn-primary btn-block">{status === 'submitting' ? 'Sending…' : 'Submit your support'}</button>
      {error && <p className="mt-2 text-[13px] text-red-700">{error}</p>}
    </form>
  )
}