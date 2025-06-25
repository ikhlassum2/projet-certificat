const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const stuffRoutes = require('./routes/stuff');

// Connexion à MongoDB Atlas
mongoose.connect('mongodb+srv://jimbob:ikhlass3@cluster0.biatm0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));

const app = express();

// Middleware pour les CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware pour parser le body JSON
app.use(bodyParser.json());



// Routes
app.use('/api/auth', userRoutes);
app.use('/api/stuff', stuffRoutes);
// Middleware pour servir les fichiers statiques (images)
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;
