import { useState } from 'react'

function SloganCard({ slogan, angle, index }) {
  const [copied, setCopied] = useState(false)
  const charCount = slogan.length

  const handleCopy = async () => {
    await navigator.clipboard.writeText(slogan)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium text-zinc-400">
          {index + 1}
        </span>
        <button
          onClick={handleCopy}
          className="shrink-0 rounded-md border border-zinc-800 px-3 py-1 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200"
        >
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>

      <p className="mb-3 text-lg font-medium leading-snug text-zinc-100">
        {slogan}
      </p>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
          {charCount} car.
        </span>
        <span className="text-xs text-zinc-500">{angle}</span>
      </div>
    </div>
  )
}

export default function SloganResults({ results }) {
  if (!results || results.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-zinc-400">
          {results.length} variante{results.length > 1 ? 's' : ''} générée{results.length > 1 ? 's' : ''}
        </h2>
      </div>

      <div className="space-y-3">
        {results.map((result, i) => (
          <SloganCard
            key={i}
            index={i}
            slogan={result.slogan}
            angle={result.angle}
          />
        ))}
      </div>
    </div>
  )
}
