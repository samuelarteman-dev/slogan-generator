import { useState } from 'react'
import ApiKeyInput from './components/ApiKeyInput'
import SloganForm from './components/SloganForm'
import SloganResults from './components/SloganResults'
import { generateSlogans } from './utils/api'

const INITIAL_FORM = {
  baseSlogan: '',
  context: '',
  tone: 'neutre',
  market: 'france',
  variantCount: '5',
  maxLength: '80',
}

export default function App() {
  const [apiKey, setApiKey] = useState('')
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    if (!apiKey.trim()) {
      setError('Veuillez renseigner votre clé API Anthropic.')
      return
    }

    setError(null)
    setIsLoading(true)
    setResults([])

    try {
      const variants = await generateSlogans({
        apiKey,
        baseSlogan: formData.baseSlogan,
        context: formData.context,
        tone: formData.tone,
        market: formData.market,
        variantCount: parseInt(formData.variantCount, 10),
        maxLength: parseInt(formData.maxLength, 10),
      })
      setResults(variants)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Générateur de slogans
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Créez des variantes de slogans via l'API Claude.
        </p>
      </header>

      <div className="space-y-8">
        {/* API Key */}
        <ApiKeyInput apiKey={apiKey} onChange={setApiKey} />

        {/* Séparateur */}
        <div className="border-t border-zinc-800/50" />

        {/* Formulaire */}
        <SloganForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Erreur */}
        {error && (
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Résultats */}
        {results.length > 0 && (
          <>
            <div className="border-t border-zinc-800/50" />
            <SloganResults results={results} />
          </>
        )}
      </div>
    </div>
  )
}
