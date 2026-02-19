##                      TP DevOps – Pipeline CI/CD
##                      Nom : Ilyas EL AOUFIR
##                      Classe : Archi O24 DIS

## 🚀 Lancement en local

### Prérequis

* Node.js (v18+)
* Docker Desktop
* Git

### Installation

```bash
git clone https://github.com/IlyasEFI2I/tp-devops-cicd.git
cd tp-devops-cicd
npm install
```

### Démarrer la base de données

```bash
docker compose up -d
```

### Variables d’environnement (PowerShell)

```powershell
$env:DB_HOST="localhost"
$env:DB_PORT="5432"
$env:DB_USER="app"
$env:DB_PASSWORD="app"
$env:DB_NAME="appdb"
$env:APP_NAME="MiniAPI"
```

### Lancer les tests

```bash
npm run test:unit
npm run test:integration
```

---

## 🔐 Variables nécessaires

### GitHub Variables

* `APP_NAME` = MiniAPI

### GitHub Secrets

* `DB_PASSWORD` = app

---

## 🔄 Déroulement du pipeline

Le pipeline se déclenche sur chaque **push** ou **pull request**.

### Étapes :

1. **Unit Tests**

   * Exécution des tests unitaires
   * Génération d’un artefact JSON

2. **Integration Tests**

   * Lancement d’un service PostgreSQL
   * Exécution des tests d’intégration
   * Génération d’un artefact JSON

3. **Analyze Test Results (Self-hosted)**

   * Téléchargement de l’artefact des tests unitaires
   * Analyse des résultats

4. **Build Dev**

   * Génération d’un fichier `config.json` pour l’environnement development

5. **Build Prod**

   * Génération d’un fichier `config.json` pour l’environnement production

Les builds Dev et Prod s’exécutent en parallèle.

---

## 📦 Artefacts générés

* unit-test-results
* integration-test-results
* build-dev
* build-prod

---

Pipeline complet avec :

* Séparation unit / integration
* Gestion des secrets GitHub
* Artefacts
* Parallélisation
* Self-hosted runner
* Builds multi-environnements