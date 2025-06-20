const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/call', (req, res) => {
  res.set('Content-Type', 'text/xml');
  res.send(`
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say language="fr-FR">Test direct Render, si vous entendez ce message, la connexion SignalWire vers Render fonctionne.</Say>
    </Response>
  `);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('Server started on port', PORT);
});
