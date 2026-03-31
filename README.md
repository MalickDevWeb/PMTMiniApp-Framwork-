# PMTMiniApp Docs Web

Cette documentation est une version web statique de `PMTMiniApp`, pensée pour être publiée comme site autonome sur GitHub puis déployée sur Vercel.

Objectif :
- avoir une documentation HTML/CSS/JS séparée du code du framework
- déployer le site facilement sur Vercel
- donner une entrée unique, claire et complète aux développeurs

## Contenu

- `index.html` : documentation principale
- `404.html` : page de secours
- `assets/site.css` : style du site
- `assets/site.js` : navigation, recherche et copie de snippets
- `vercel.json` : configuration Vercel

## Dépôt GitHub cible

Le dépôt distant prévu pour ce site est :

```text
https://github.com/MalickDevWeb/PMTMiniApp-Framwork-.git
```

## Publication GitHub

Depuis ce dossier :

```bash
cd /home/pmt/WeChatProjects/Mes_document/documentation/pmt-document-site
git init
git add .
git commit -m "Initial documentation site"
git branch -M main
git remote add origin https://github.com/MalickDevWeb/PMTMiniApp-Framwork-.git
git push -u origin main
```

## Déploiement Vercel

Ce projet est un site statique pur. Aucun build n'est nécessaire.

### Option 1

Dans Vercel :
- importe le dépôt GitHub
- laisse la racine du projet sur `/`
- `Build Command` : vide
- `Output Directory` : vide

### Option 2

Depuis le terminal :

```bash
cd /home/pmt/WeChatProjects/Mes_document/documentation/pmt-document-site
npx vercel
```

Puis pour la production :

```bash
npx vercel --prod
```

## Prévisualisation locale

Avec un serveur statique :

```bash
cd /home/pmt/WeChatProjects/Mes_document/documentation/pmt-document-site
python3 -m http.server 4173
```

Puis ouvre :

```text
http://localhost:4173
```
