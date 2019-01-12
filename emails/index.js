require('dotenv-extended').load(); // Expose environment variables on this document
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const log = require('./log');
const app = express();

const Lists = require('./handlers/subscriptions');
const Webhooks = require('./handlers/hooks');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

const mongoParams = { useNewUrlParser: true, useCreateIndex: true };
mongoose.connect(process.env.DB_URL, mongoParams);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = http.createServer(app);

// Actions
app.post('/subscribe', Lists.subscribe);
app.get('/subscribers', Lists.subscribers);

// Webhooks
app.get('/hooks/email', (req, res) => res.status(200).send('OK'));
app.post('/hooks/email', Webhooks.chimpEventsHandler);

server.listen(process.env.PORT, process.env.HOST, () => {
  log.info(`🖥️ Indenizou EMAILS up at: ${process.env.HOST}:${process.env.PORT}`);
});
