const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/call', async (req, res) => {
  const data = req.body;
  console.log("Données reçues par Render :", data);
  console.log("Content-Type reçu :", req.headers['content-type']);
  try {
    const n8nResponse = await axios.post(
      'https://tafraout.app.n8n.cloud/webhook/webhook-rdv',
      data,
      { timeout: 20000 } // timeout sécurité
    );
    const twiml = n8nResponse.data?.twiml || '<Response><Say>Demande traitée</Say></Response>';
    res.type('text/xml');
    res.send(twiml);
  } catch (err) {
    console.error("Erreur envoi à n8n :", err.message);
    if (err.response) {
      console.error("Erreur HTTP n8n:", err.response.status, err.response.data);
    }
    res.status(500).send('<Response><Say>Erreur interne</Say></Response>');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur port ${PORT}`);
});
