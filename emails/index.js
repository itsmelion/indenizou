require('dotenv-extended').load(); // Expose environment variables on this document
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const log = require('./log');
const Customer = require('./model');
const Mailchimp = require('./mailchimp');

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

const mongoParams = { useNewUrlParser: true, useCreateIndex: true };
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, mongoParams);

const server = http.createServer(app);

app.get('/', (req, res) => res.format({
  html: () => res.send('Developed with love, at <a href="https://alia.ml/">ΛLIΛ<a>'),
  json: () => res.jsonp({
    body: "Awesome! Success at your JSON Request!"
  }),
}));

app.post('/subscribe', async (req, res) => {
  log.debug('\n\n Subscribing customer \n');
  let subscriber, status;

  try {
    subscriber = await Mailchimp.subscribeUser(req.body);
    status = subscriber.status;
  }
  catch(e) { throw new Error(e); }

  if (status >= 300) return res.status(status).json(subscriber);

  log.debug('Saving customer on DB');

  try {
    subscriber = await Customer.create(req.body)
      .catch(e => log.error(e));
    return res.status(status).json(subscriber);
  }
  catch(e) { throw new Error(e); }
});

app.get('/subscribers', async (req, res) => {
  const customer = await Customer.find().lean();
  return res.json(customer);
});

server.listen(process.env.PORT, process.env.HOST, () => {
  log.info(`🖥️ Indenizou EMAILS up at: ${process.env.HOST}:${process.env.PORT}`);
});
