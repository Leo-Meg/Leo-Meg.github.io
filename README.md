# Vitrine, Léo Mégret

Un site d'une seule page, bilingue, écrit à la main. Aucun cadriciel, aucune
dépendance, aucune police distante, aucun script de compilation.

En ligne sur https://leo-meg.github.io

## Lancer en local

```bash
python3 -m http.server 8777
```

Puis ouvrir http://localhost:8777

## Structure

```
index.html          tout le contenu, dans les deux langues
css/style.css       mise en page, couleurs, thème sombre
js/app.js           bascule de langue et apparition au défilement
img/                photographies, licences dans CREDITS.json
CV_Leo_Megret.pdf   le CV téléchargeable
```

## Le bilinguisme

Les deux langues vivent dans le même document. Chaque passage existe en deux
versions, marquées `lang="fr"` et `lang="en"`, et le CSS masque celle qui n'est
pas active.

```html
<p lang="fr">Texte français.</p>
<p lang="en">English text.</p>
```

Le script met `data-lang` sur `<html>`, retient le choix dans le stockage local
du navigateur, et part de la langue du navigateur au premier passage. Les deux
versions restent dans le document, donc toutes les deux sont indexables.

Pour ajouter du contenu, écrire les deux versions côte à côte. Si l'une manque,
la bascule laissera un trou.

## La mise en page

Une édition annotée. Une colonne de texte, une marge de notes à droite au delà
de 62 rem, et une colonne vertébrale à gauche avec un repère par entrée au delà
de 68 rem. En dessous, tout retombe en une seule colonne et les notes passent
au dessus de leur entrée.

Chaque réalisation se termine par un bloc `decision`, qui porte le choix fait et
ce qu'il a coûté. C'est la partie du site qui compte.

## Sans JavaScript

Le document reste entièrement lisible. L'apparition au défilement n'est posée
que sous `html.js`, classe que le script ajoute lui-même, donc rien ne disparaît
si le script ne tourne pas. Seule la bascule de langue devient inopérante, et
les deux langues s'affichent alors l'une après l'autre.

## Thème sombre

Suit `prefers-color-scheme`. Aucun bouton, aucun réglage.

## Images

Les photographies de lieux viennent de Wikimedia Commons. Auteurs et licences
dans `img/CREDITS.json`, rappelés en bas de page.
