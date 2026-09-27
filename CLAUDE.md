# 🏛️ Architecture & Guide Technique — Club Autostar

Ce document synthétise les choix architecturaux, les modèles de données, les conventions de code et les procédures de migration pour le site **Club Autostar** (`autostar-club.fr`).

---

## 1. 🎯 Objectifs & Philosophie du Projet

* **Sortir d'un Drupal 7 vieillissant** : Éliminer les alertes de sécurité, la dépendance à une base de données MySQL et la vulnérabilité aux attaques automatisées / bots.
* **Architecture Jamstack / Statique** : Génération 100% statique hébergée sur GitHub Pages, garantissant performance maximale, coût nul et sécurité absolue.
* **Archivage pérenne** : L'ancien site aspiré est figé en HTML statique sur `archive.autostar-club.fr`.
* **Édition autonome** : Utilisation de **Decap CMS** (Git-backed) pour permettre aux membres du bureau de créer/modifier sorties et fiches techniques sans toucher au code.
* **Responsive par construction** : Conception orientée mobile d'abord (*Mobile-first*) avec Tailwind CSS.

---

## 2. 🛠️ Pile Technique (Tech Stack)

| Rôle | Technologie | Justification |
| :--- | :--- | :--- |
| **Générateur Statique (SSG)** | **Astro (v5+)** | Génération HTML ultra-rapide, Content Collections typées, îlots interactifs. |
| **Styles & Typographie** | **Tailwind CSS + Typography** | Classes utilitaires modernes, conteneur `.prose` pour le Markdown. |
| **Composants Dynamiques** | **Vue 3 (`<script setup lang="ts">`)** | Îlots interactifs légers (Menu tiroir mobile, carrousel d'accueil). |
| **Typage** | **TypeScript & Zod** | Validation stricte des schémas de données du CMS. |
| **CMS Headless** | **Decap CMS** | Interface d'édition sans serveur, commits Git directs sur le dépôt GitHub. |
| **Hébergement de production** | **GitHub Pages** | Déploiement automatisé via GitHub Actions. |

---

## 3. 📂 Structure des Dossiers

```text
├── public/
│   ├── admin/                    # Interface Decap CMS
│   │   ├── config.yml            # Schémas et règles des collections CMS
│   │   └── index.html            # Entrée CMS + styles et composants d'aperçu
│   ├── uploads/                  # Médias (images, PDF) accessibles publiquement
│   ├── logo.webp                 # Logo officiel Club Autostar
│   └── ffaacc.webp               # Logo FFACCC pour le bandeau d'affiliation
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro      # Bandeau FFACCC + inclusion Navbar
│   │   │   ├── Navbar.vue        # Menu réactif (desktop/mobile)
│   │   │   └── Footer.astro      # Liens, contacts, mentions légales
│   │   ├── home/
│   │   │   ├── HeroSlider.vue    # Carrousel d'accueil en Vue 3
│   │   │   └── LatestEvents.astro# Aperçu des prochaines sorties
│   │   ├── sorties/
│   │   │   └── SortieCard.astro  # Vignette d'affichage d'une sortie
│   │   ├── fiches/
│   │   │   └── FicheCard.astro   # Vignette d'une fiche technique
│   │   └── Prose.astro           # Wrapper MDX avec lightbox/zoom natif
│   │
│   ├── content/                  # Collections gérées en Markdown / MDX
│   │   ├── config.ts             # Schémas Zod Astro
│   │   ├── sorties/              # Comptes-rendus et sorties à venir (.md / .mdx)
│   │   ├── fiches/               # Fiches "C'est pas sorcier" (.md / .mdx)
│   │   └── pages/                # Pages institutionnelles (.md)
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro      # Squelette HTML global (SEO, métas, polices)
│   │
│   ├── pages/
│   │   ├── index.astro           # Page d'accueil
│   │   ├── presentation.astro    # Histoire, valeurs et organigramme
│   │   ├── adhesion.astro        # Tarifs, avantages et bulletin d'adhésion
│   │   ├── contact.astro         # Formulaire de contact avec mailto:
│   │   ├── sorties/
│   │   │   ├── index.astro       # Index des sorties
│   │   │   ├── a-venir.astro     # Sorties programmées
│   │   │   ├── ecoulees.astro    # Archives des rassemblements
│   │   │   ├── inscription.astro # Modalités d'inscription
│   │   │   └── [slug].astro      # Vue détaillée dynamique d'une sortie
│   │   └── fiches-pratiques/
│   │       ├── index.astro       # Liste des fiches "C'est pas sorcier"
│   │       └── [slug].astro      # Vue détaillée d'un tutoriel
│   │
│   └── styles/
│       └── global.css            # Import Tailwind et styles globaux
│
└── scripts/
    └── migrate-bulletproof.js    # Script d'aspiration & conversion Drupal ➔ MDX