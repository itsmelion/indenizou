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
const Accounts = require('./handlers/users');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

const mongoParams = { useNewUrlParser: true, useCreateIndex: true };
mongoose.connect(process.env.DB_URL, mongoParams);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = http.createServer(app);

// Actions
app.post('/chatbot', (req, res) => {
  log.debug('\nRequest from Huggy!\n\n');
  log.debug(req.body.messages.actionSendRequest);
  res.status(200).end();
});

app.post('/subscribe', Lists.subscribe);
app.get('/subscribers', Lists.subscribers);

// Webhooks
app.get('/hooks/email', (req, res) => res.status(200).send('OK'));
app.post('/hooks/email', Webhooks.chimpEventsHandler);

// Users
app.post('/accounts', Accounts.createUser);
app.get('/accounts/:userID/settings', Accounts.userSettings);


server.listen(process.env.PORT, process.env.HOST, () => {
  log.info(`🖥️ Indenizou EMAILS up at: ${process.env.HOST}:${process.env.PORT}`);
});
