export function buildSystemPrompt() {
  return `Tu es un directeur de création publicitaire francophone expert en rédaction de slogans.

CONTRAINTES STRICTES — à respecter sans exception :
1. AUCUN participe présent (formes en -ant). Utilise des infinitifs, des impératifs ou des formes conjuguées.
2. AUCUN cliché publicitaire. Les mots et expressions suivants sont INTERDITS : sublimer, allier, élégant, élégance, raffiné, raffinement, au cœur de, bien plus que, l'art de, passion, excellence, unique, exceptionnel, d'exception, sur mesure, haut de gamme, prestige, prestigieux.
3. AUCUN jeu de mots forcé. Pas de calembours, pas de double sens artificiel.
4. Chaque slogan doit tenir en une seule phrase courte et percutante.

FORMAT DE RÉPONSE — tu DOIS répondre en JSON valide, sans texte avant ni après :
{
  "variants": [
    {
      "slogan": "Le slogan ici",
      "angle": "Description courte de l'angle créatif choisi"
    }
  ]
}`
}

export function buildUserPrompt({ baseSlogan, context, tone, market, variantCount, maxLength }) {
  let prompt = `Génère exactement ${variantCount} variantes du slogan suivant : "${baseSlogan}"`

  if (context) {
    prompt += `\n\nContexte / brief : ${context}`
  }

  prompt += `\n\nParamètres :`
  prompt += `\n- Ton : ${tone}`
  prompt += `\n- Marché cible : ${market}`
  prompt += `\n- Longueur maximale par slogan : ${maxLength} caractères`

  prompt += `\n\nRappel : respecte TOUTES les contraintes du système. Réponds uniquement en JSON.`

  return prompt
}
