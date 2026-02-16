import { buildSystemPrompt, buildUserPrompt } from './buildPrompt'

const API_URL = 'https://api.anthropic.com/v1/messages'

export async function generateSlogans({ apiKey, baseSlogan, context, tone, market, variantCount, maxLength }) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: buildSystemPrompt(),
      messages: [
        {
          role: 'user',
          content: buildUserPrompt({ baseSlogan, context, tone, market, variantCount, maxLength }),
        },
      ],
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.error?.message || `Erreur API (${response.status})`)
  }

  const data = await response.json()
  const text = data.content?.[0]?.text

  if (!text) {
    throw new Error('Réponse vide de l\'API')
  }

  const parsed = JSON.parse(text)

  if (!parsed.variants || !Array.isArray(parsed.variants)) {
    throw new Error('Format de réponse invalide')
  }

  return parsed.variants
}
