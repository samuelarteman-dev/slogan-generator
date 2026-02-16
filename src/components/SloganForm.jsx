import { TONES, MARKETS, VARIANT_COUNTS, MAX_LENGTHS } from '../constants'

export default function SloganForm({ formData, onChange, onSubmit, isLoading }) {
  const handleChange = (field) => (e) => {
    onChange({ ...formData, [field]: e.target.value })
  }

  const inputClass =
    'w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600'

  const selectClass =
    'w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 appearance-none cursor-pointer'

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="space-y-6"
    >
      {/* Slogan de base */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-400">
          Slogan de base <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.baseSlogan}
          onChange={handleChange('baseSlogan')}
          placeholder="Ex : La qualité avant tout"
          className={inputClass}
          required
        />
      </div>

      {/* Contexte / Brief */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-400">
          Contexte / Brief
          <span className="ml-2 text-xs text-zinc-600">optionnel</span>
        </label>
        <textarea
          value={formData.context}
          onChange={handleChange('context')}
          placeholder="Décrivez la marque, le produit, la cible..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Sélecteurs en grille */}
      <div className="grid grid-cols-2 gap-4">
        {/* Ton */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">Ton</label>
          <select
            value={formData.tone}
            onChange={handleChange('tone')}
            className={selectClass}
          >
            {TONES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Marché */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">Marché</label>
          <select
            value={formData.market}
            onChange={handleChange('market')}
            className={selectClass}
          >
            {MARKETS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Nombre de variantes */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">Variantes</label>
          <select
            value={formData.variantCount}
            onChange={handleChange('variantCount')}
            className={selectClass}
          >
            {VARIANT_COUNTS.map((n) => (
              <option key={n} value={n}>
                {n} variantes
              </option>
            ))}
          </select>
        </div>

        {/* Longueur max */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">
            Longueur max
          </label>
          <select
            value={formData.maxLength}
            onChange={handleChange('maxLength')}
            className={selectClass}
          >
            {MAX_LENGTHS.map((n) => (
              <option key={n} value={n}>
                {n} caractères
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bouton Générer */}
      <button
        type="submit"
        disabled={isLoading || !formData.baseSlogan.trim()}
        className="w-full rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Génération en cours…
          </span>
        ) : (
          'Générer les variantes'
        )}
      </button>
    </form>
  )
}
