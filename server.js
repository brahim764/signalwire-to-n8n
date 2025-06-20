const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour les appels entrants (SignalWire)
app.post('/call', async (req, res) => {
  const data = req.body;

  console.log("Données reçues par Render :", data);

  // Envoie les données à ton webhook n8n
  try {
    await axios.post('https://tafraout.app.n8n.cloud/webhook-rdv',  data);
    res.type('text/xml');
    res.send('<Response><Say language="fr">Votre demande est traitée</Say></Response>');
  } catch (err) {
    console.error("Erreur envoi à n8n :", err.message);
    res.status(500).send('<Response><Say>Erreur interne</Say></Response>');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur port ${PORT}`);
});
