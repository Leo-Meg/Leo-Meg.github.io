# Vitrine — Léo Mégret

CV en une page web : un accueil minimal où chaque mot est cliquable, et cinq
panneaux de détail illustrés.

## Lancer en local

```bash
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000>.

## Mettre en ligne

Le site est entièrement statique (aucune dépendance, aucun script de build).
Il suffit de déposer le dossier sur n'importe quel hébergeur :

- **GitHub Pages** — pousser le dossier sur une branche `main`, puis
  *Settings → Pages → Deploy from a branch*.
- **Netlify / Cloudflare Pages** — glisser le dossier dans l'interface.
- **Un hébergement classique** — copier le dossier par FTP.

## Structure

```
index.html          tout le contenu (le texte se modifie ici)
css/style.css       thème, mise en page, animations
js/app.js           routage par hash, révélation au défilement
img/                images (voir CREDITS.json pour les licences)
CV_Leo_Megret.pdf   le CV téléchargeable
```

## Modifier le contenu

Tout le texte est dans `index.html`, en clair. Chaque section de détail est un
`<section class="panneau" data-cle="...">` ; la clé sert d'ancre (`#parcours`,
`#realisations`, `#savoirfaire`, `#approche`, `#contact`) et rend chaque
panneau partageable par URL.

Pour qu'un élément apparaisse en fondu au défilement, lui ajouter l'attribut
`data-reveal`. Rien d'autre à faire.

## Choix techniques

- **Aucune bibliothèque.** Trois fichiers, ~250 lignes de JavaScript et de CSS
  d'animation. Rien à mettre à jour, rien qui casse dans deux ans.
- **Pas d'`IntersectionObserver`.** L'API ne se déclenche pas dans certains
  contextes (navigateur embarqué, onglet jamais peint), et un contenu invisible
  parce qu'un observateur ne s'est pas réveillé est une panne silencieuse.
  Une quinzaine de `getBoundingClientRect()` par frame de défilement coûtent
  moins cher que ce risque.
- **Le masquage dépend de la classe `js`** posée par `app.js` sur `<html>` :
  si le script échoue ou est désactivé, tout le contenu reste visible et
  indexable, au lieu d'une page blanche.
- **Accessibilité** : navigation au clavier, `Échap` pour revenir, focus
  visible, `prefers-reduced-motion` respecté, et une feuille d'impression.

## Crédits images

Les captures d'écran (ophtao.fr, LearnAble) sont des travaux personnels.
Les photographies de lieux viennent de Wikimedia Commons — licences et auteurs
détaillés dans `img/CREDITS.json` et rappelés en bas du panneau « Me contacter ».
