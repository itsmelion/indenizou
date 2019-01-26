require('dotenv-extended').load(); // Expose environment variables on this document
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const log = require('./log');
const app = express();

// Handlers
const Lists = require('./handlers/subscriptions');
const ChimpHooks = require('./handlers/mailchimp.hooks');
const ChatbotHooks = require('./handlers/chatbot.hooks');
// const Accounts = require('./handlers/users');

// Middlewares
const authBot = require('./middlewares/authChatbot');


app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

const mongoParams = { useNewUrlParser: true, useCreateIndex: true };
mongoose.connect(process.env.DB_URL, mongoParams);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = http.createServer(app);

// Chatbot
app.post('/chatbot', authBot, ChatbotHooks);
app.post('/chatbot/user', authBot, ChatbotHooks);
app.post('/chatbot/indicacao', authBot, ChatbotHooks);

app.post('/subscribe', Lists.subscribe);
app.get('/subscribers', Lists.subscribers);

// ChimpHooks
app.get('/hooks/email', (req, res) => res.status(200).send('OK'));
app.post('/hooks/email', ChimpHooks.chimpEventsHandler);

// Users
// app.post('/accounts', Accounts.createUser);
// app.get('/accounts/:userID/settings', Accounts.userSettings);


server.listen(process.env.PORT, process.env.HOST, () => {
  log.info(`🖥️ Indenizou EMAILS up at: ${process.env.HOST}:${process.env.PORT}`);
});
