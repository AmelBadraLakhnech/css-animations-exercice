# Atelier animé — exercices d’animations CSS

Bienvenue dans cet atelier ! Vous allez donner vie à des cartes de jeu en utilisant les animations CSS et un peu de JavaScript pour les déclencher. Les cartes sont volontairement représentées par des formes et des couleurs : toute l’attention est portée sur le mouvement.

## Bien démarrer

Installez les dépendances, puis lancez le projet :

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour explorer les démonstrations. Chaque exercice propose une interaction à tester, une idée à observer et un moyen de recommencer.

## Les exercices

1. **Faire apparaître les cartes** — animez leur opacité de 0 à 1 en environ 0,5 seconde.
2. **Faire disparaître les cartes** — animez leur opacité de 1 à 0 en environ 0,5 seconde, sans les retirer de la page.
3. **Animer une attaque** — faites reculer une carte pour prendre son élan, puis avancer vers l’adversaire. Testez les deux directions.
4. **Indiquer les cartes jouables** — comparez le coût de chaque carte à la réserve de mana et faites ressortir celles qui sont accessibles.
5. **Activer un pouvoir** — choisissez une carte et l’un de ses pouvoirs, puis animez son éclaircissement et son agrandissement en environ 0,8 seconde.

Pour le dernier exercice, essayez les deux façons de retrouver un pouvoir :

- **ID composé** : combinez l’identifiant de la carte et celui du pouvoir, par exemple `c67_p2`.
- **Recherche dans la carte** : retrouvez d’abord la carte `c67`, puis cherchez son pouvoir `p2` parmi ses descendants. Les pouvoirs utilisent un attribut `data-power-id`, afin de ne pas dupliquer les identifiants HTML.

Les cartes de cet exercice sont `c42`, `c67` et `c33`; les pouvoirs sont `p1`, `p2` et `p3`. Certaines cartes ne possèdent pas tous les pouvoirs : choisissez uniquement un pouvoir disponible.

## Le principe à garder en tête

Les étapes visuelles d’une animation appartiennent au CSS. Le JavaScript ne calcule pas les transformations : il ajoute ou retire une classe pour lancer ou réinitialiser l’effet. Les animations respectent également le réglage de réduction des animations du navigateur.

Les styles des animations se trouvent dans `app/globals.css`, les interactions dans `components/animation-workshop.tsx` et la représentation réutilisable des cartes dans `components/playing-card.tsx`.

## Vérifier le projet

```bash
npm run lint
npm run build
```
