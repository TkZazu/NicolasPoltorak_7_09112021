# Bienvenu sur le projet 7 d'OpenClassroom : Groupomania

Le but de ce projet étant de créer un réseau social d'entreprise permettant aux employés de créer un compte et de partager
des posts pouvant être commenté afin de leurs permettre de communiqué.
Ce projet nécéssite de créer un backend, et un frontend.

## Fonctionnalitées demandées pour le projet :

- Création d'un compte simple et possible depuis un mobile.
- Suppréssion de compte possible.
- Accès à un forum des salariés.
- Repérer les dernières publications facilement.
- Avoir un accès admin pour l'un des utilisateurs.

## Liste des technologies utilisées pour le projet :

### Frontend :

- Vue.js
- Boostrap
- Axios

### Backend :

- Mysql
- Sequelize
- Node.js
- Express

## Instalation :

### Backend :

Ouvrez un terminal, dans lequel il faut se placer sur le dossier Backend :

```bash
cd Backend
```

Puis installez les modules :

```bash
npm i
```

Changez les valeurs du ".env" pour qu'il corresponde avec vos paramètres en changeant le DB_PASS par le votre.

Enfin, lancez le serveur :

```bash
node server
```

Le Backend se lancera à l'issus de ces commandes.

### Base de données :

Pour lancer la Bdd, lancez votre invite de commande MySql "MySQL 8.0 Command Line Client", et créez la Bdd groupomania
en important le fichier initialisationBdd.sql :

```bash
mysql > source C:/<cheminDuDossier>/initialisationBdd.sql
```

Cela va générer une base de donnée MySQL contenant des tables : Users, Messages et Comments.

### Frontend :

Pour lancer le Frontend, même pratique que pour le Backend, ouvrez un second terminal et placez vous dans le dossier Frontend :

```bash
cd Frontend
```

Et installez les modules :

```bash
npm i
```

Enfin, lancez le :

```bash
npm run serve
```

Le serveur va se lancer, résultant sur :

App running at:

- Local: http://localhost:8080/
- Network: http://192.168.1.146:8080/

Faite un Ctrl+click sur le "localhost" si vous avez le pluggin associé au lancement au clic, sinon allez sur votre navigateur
et tapez l'adresse "Local" dans la barre de recherche, résultant sur le projet.

### Fonctionnement :

Vous arriverez sur la page de connexion, n'ayant pas encore d'user dans votre Bdd, rendez-vous sur la page "Inscription" en
cliquant sur le bouton du même nom, puis inscrivez vous.

Une fois inscrit, retournez sur votre invite de commande MySQL et importez le fichier "setAdmin.sql" :

```bash
mysql > source C:/<cheminDuDossier>/setAdmin.sql
```

Cette commande permettra de passer le premier utilisateur créer en "is_admin : 1", ce qui lui donnera les droits d'administration
étant : suppréssion de messages/comments et users. (Vous pourrez supprimer les messages & commentaires des autres utilisateurs ansi que leurs comptes).

Ensuite, connectez vous au site et profitez de ses fonctionnalitées.
