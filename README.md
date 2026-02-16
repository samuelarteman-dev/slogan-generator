# Générateur de Slogans

Application React pour générer des variantes de slogans via l'API Anthropic (Claude).

## Fonctionnalités

- Saisie d'un slogan de base et d'un contexte optionnel
- Sélection du ton (neutre, premium, dynamique, chaleureux, audacieux, minimaliste, technique)
- Sélection du marché cible (France, Belgique, Suisse, Luxembourg)
- Choix du nombre de variantes (3, 5, 8, 10) et de la longueur max (30, 50, 80, 120 caractères)
- Affichage des résultats avec angle créatif, compteur de caractères et bouton copier
- Contraintes rédactionnelles strictes : pas de participe présent, pas de clichés publicitaires, pas de jeux de mots forcés

## Stack technique

- React 19 + Vite
- Tailwind CSS v4
- API Anthropic (Claude)

## Lancement

```bash
npm install
npm run dev
```

L'application nécessite une clé API Anthropic, à renseigner dans l'interface.
