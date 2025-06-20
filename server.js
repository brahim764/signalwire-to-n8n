const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/call', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send('<?xml version="1.0" encoding="UTF-8"?><Response><Say language="fr-FR">Test direct Render, la connexion SignalWire vers Render fonctionne.</Say></Response>');
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
