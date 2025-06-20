const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Route pour les appels entrants
app.post('/call', async (req, res) => {
  const data = req.body;

  console.log("Données reçues par Render :", data);

  try {
    // Attends que n8n termine l'exécution
    const n8nResponse = await axios.post('https://tafraout.app.n8n.cloud/webhook/webhook-rdv',  data);

    // Récupère la réponse XML depuis n8n
    const twiml = n8nResponse.data?.twiml || '<Response><Say>Demande traitée</Say></Response>';

    res.type('text/xml');
    res.send(twiml);
  } catch (err) {
    console.error("Erreur envoi à n8n :", err.message);
    res.status(500).send('<Response><Say>Erreur interne</Say></Response>');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur port ${PORT}`);
});
