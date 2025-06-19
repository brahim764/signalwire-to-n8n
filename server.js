const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Route webhook pour SignalWire
app.post('/webhook', async (req, res) => {
  const from = req.body.From;
  const body = req.body.Body || '';
  console.log("Données reçues :", req.body);

  const payload = {
    intent: "prise_rdv",
    name_id: from,
    phone: from,
    message: body,
    type: "appel"
  };

  try {
    await axios.post("https://ton-n8n-url/webhook/chemin-du-webhook",  payload);
    res.type('text/xml');
    res.send(`<Response><Say>Votre demande est traitée</Say></Response>`);
  } catch (err) {
    console.error("Erreur envoi à n8n :", err.message);
    res.status(500).send("Erreur");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur port ${PORT}`);
});