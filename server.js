const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour les appels entrants (SignalWire)
app.post('/call', async (req, res) => {
  const data = req.body;

  console.log("Données reçues par Render :", data);

  // Vérifie que les données sont valides
  if (!data || !data.text) {
    console.error("Données invalides reçues : ", data);
    return res.status(400).send('<Response><Say language="fr">Désolé, nous n’avons pas compris votre demande.</Say></Response>');
  }

  try {
    // Envoie les données à ton webhook n8n
    await axios.post('https://tafraout.app.n8n.cloud/webhook/webhook-rdv',  data);

    // Réponds uniquement après avoir envoyé les données à n8n
    res.type('text/xml');
    res.send('<Response><Say language="fr">Merci, nous avons bien reçu votre demande. Veuillez patienter pendant que nous traitons votre requête.</Say></Response>');
  } catch (err) {
    console.error("Erreur envoi à n8n :", err.message);
    res.status(500).send('<Response><Say language="fr">Désolé, une erreur s’est produite. Veuillez réessayer plus tard.</Say></Response>');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur port ${PORT}`);
});
