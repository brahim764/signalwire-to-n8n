const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/call', async (req, res) => {
  try {
    // Transfert les données reçues de SignalWire à n8n
    const n8nResp = await axios.post(
      'https://tafraout.app.n8n.cloud/webhook/webhook-rdv', // <--- ADAPTE ton URL si besoin
      req.body,
      { headers: { 'Content-Type': 'application/json' }, timeout: 7000 }
    );

    // Prends la réponse brute de n8n et la renvoie à SignalWire
    res.set('Content-Type', 'text/xml');
    // n8n DOIT répondre du XML pur, une seule ligne, pas d’espace avant la balise
    res.send(n8nResp.data);
  } catch (err) {
    console.error('Erreur relay n8n:', err.message);
    // Réponse de secours si n8n ne répond pas ou crash
    res.set('Content-Type', 'text/xml');
    res.send('<?xml version="1.0" encoding="UTF-8"?><Response><Say language="fr-FR">Erreur liaison Render n8n.</Say></Response>');
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
