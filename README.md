# Twitch Moderation Dashboard

Un tableau de bord en temps réel pour analyser et modérer les chats Twitch, avec détection de contenu problématique et analyse thématique des conversations.

## Fonctionnalités

-   **Connexion en direct aux chats Twitch**: Suivez n'importe quelle chaîne Twitch en temps réel
-   **Modération automatique**: Détection de contenu toxique ou inapproprié avec visualisation des messages signalés
-   **Analyse thématique**: Regroupement des messages par sujets et identification des questions fréquentes
-   **Text-to-Speech**: Possibilité de faire lire les messages à voix haute
-   **Visualisation des données**: Graphiques radar pour les catégories de modération

## Architecture

Ce projet est divisé en deux parties:

1. **Frontend** (ce dépôt): Interface utilisateur Next.js avec visualisations en temps réel
2. **Backend** ([twitch-moderation-back](https://github.com/ManoelDaPonte/twitch-moderation-back)): Serveur d'API pour l'analyse et la modération

## Prérequis

-   Node.js 18+
-   npm ou yarn
-   Un compte [OpenAI](https://platform.openai.com/) pour la clé API
-   (Optionnel) Un compte [ElevenLabs](https://elevenlabs.io/) pour la fonctionnalité Text-to-Speech

## Installation

### 1. Cloner les deux dépôts

```bash
# Cloner le frontend
git clone https://github.com/votre-username/twitch-moderation-front.git
cd twitch-moderation-front

# Cloner le backend dans un dossier séparé
git clone https://github.com/ManoelDaPonte/twitch-moderation-back.git
```

### 2. Configurer le backend

```bash
cd twitch-moderation-back

# Installer les dépendances
pip install -r requirements.txt

# Créer un fichier .env avec votre clé API OpenAI
echo "OPENAI_API_KEY=votre_clé_api_openai" > .env

# Démarrer le serveur
uvicorn main:app --reload
```

### 3. Configurer le frontend

```bash
cd twitch-moderation-front

# Installer les dépendances
npm install
# ou
yarn install

# Démarrer l'application
npm run dev
# ou
yarn dev
```

## Utilisation

1. Ouvrez votre navigateur et accédez à `http://localhost:3000`
2. Entrez le nom de la chaîne Twitch que vous souhaitez suivre
3. Les messages du chat apparaîtront en temps réel
4. Basculez entre les onglets "Modération" et "Topics" pour différentes analyses
5. Cliquez sur un message pour le faire lire par la fonctionnalité Text-to-Speech

## Analyse des données

### Modération

-   **Graphique radar**: Visualise les différentes catégories de contenu problématique
-   **Compteur**: Montre le nombre de messages signalés vs approuvés
-   **Messages signalés**: Liste tous les messages détectés comme problématiques

### Analyse thématique

-   **Topics**: Regroupe automatiquement les messages par thèmes
-   **Questions**: Identifie et regroupe les questions posées dans le chat

## Développement

L'application utilise:

-   **Next.js** comme framework React
-   **tmi.js** pour se connecter à l'API Twitch
-   **React Query** pour la gestion des requêtes
-   **Plotly.js** pour les visualisations de données
-   **API OpenAI** (côté backend) pour l'analyse de contenu

## Contribution

Les contributions sont les bienvenues! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

[MIT](LICENSE)
