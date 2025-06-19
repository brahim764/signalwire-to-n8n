const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour les appels entrants (SignalWire)
app.post('/call', async (req, res) => {
  const from = req.body.From;
  console.log("Appel reçu de :", from);

  const payload = {
    intent: "prise_rdv",
    name_id: from,
    phone: from,
    type: "appel"
  };

  try {
    // Envoie les données à n8n
    await axios.post("https://https://tafraout.app.n8n.cloud/webhook/webhook-rdv/webhook/chemin-du-webhook",  payload);
    res.type('text/xml');
    res.send(`<Response><Say>Votre demande est traitée</Say></Response>`);
  } catch (err) {
    console.error("Erreur envoi à n8n :", err.message);
    res.status(500).send("Erreur");
  }
});

// Route pour les SMS entrants (SignalWire)
app.post('/sms', async (req, res) => {
  const from = req.body.From;
  const message = req.body.Body;
  console.log("SMS reçu de", from, ":", message);

  const payload = {
    intent: "info_rdv",
    name_id: from,
    phone: from,
    message: message
  };

  try {
    await axios.post("https://ton-n8n-url/webhook/chemin-du-webhook",  payload);
    res.type('text/xml');
    res.send(`<Response><Message>Reçu !</Message></Response>`);
  } catch (err) {
    console.error("Erreur envoi à n8n :", err.message);
    res.status(500).send("Erreur");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur port ${PORT}`);
});
