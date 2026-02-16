import { useState } from 'react'

export default function ApiKeyInput({ apiKey, onChange }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-400">
        Clé API Anthropic
      </label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={apiKey}
          onChange={(e) => onChange(e.target.value)}
          placeholder="sk-ant-..."
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300 transition"
        >
          {visible ? 'Masquer' : 'Afficher'}
        </button>
      </div>
    </div>
  )
}
