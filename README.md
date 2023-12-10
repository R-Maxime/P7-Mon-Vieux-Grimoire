# Mon vieux grimoire

### Projet N°7 OpenClassRooms
Ce projet est le Backend du site web d'une petite chaîne de libraires qui souhaite mettre en place un site web vitrine pour présenter leur catalogue de livres.

### Frontend
Le frontend est réalisé avec ReactJS et est disponible [ici](https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres).
### Backend
Le Backend, disponible entièrement dans ce repository, est réalisé avec NodeJS et express.  
Il utilise une base de données MongoDB.  
Cette base de données est hébergée sur MongoDB Atlas. Pour la configuration veuillez vous référer au fichier [.env.example](/server/.env.example).  
Le projet est entièrement écris en Typescript, et écris en POO.(Programmation Orientée Objet)  
Le projet a été testé sous NodeJS v.20.5.0
### Installation
Pour installer le projet, il vous suffit de cloner ce repository, puis d'installer les dépendances avec la commande `npm install`.

### Lancement
Pour lancer le projet, il y a plusieurs options. 
- `npm run start` : Lance le projet en mode production, nécessite d'avoir préalablement build le projet.
- `npm run dev` : Lance le projet en mode développement, avec nodemon, compile le projet à chaque modification.
- `npm run build` : Compile le projet en mode production, et le place dans le dossier `dist/`.
- `npm run debug` : Lance le projet avec ts-node, permettant de ne pas avoir à compiler le projet en fichier JS à chaque modification.  
