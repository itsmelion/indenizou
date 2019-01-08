require('dotenv-extended').load(); // Expose environment variables on this document
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const log = require('./log');
const File = require('./model');

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors()); // allow cors

app.get('/', (req, res) => {
  return res.format({
    html: () => res.send('Developed with love, at <a href="https://alia.ml">ΛLIΛ<a>'),
    json: () => res.jsonp({
      body: "Successful the JSON Request!"
    }),
  });
});

app.get('/files', async (req, res) => {
  const files = await File.find().lean();
  return res.json(files);
});

app.post('/files', async (req, res) => {
  const { body } = req;

  log.debug('new file uploaded');

  const file = await File.create({
    name: body.fileName,
    status: 'uploaded',
  });

  log.debug('uploaded file registered');

  file.set({ status: 'encoding' }).save();

  return res.json({ id: file._id, status: 'encoding' });
});

app.post('/files/:fileId/encoding', async (req, res) => {
  const { fileId } = req.params;
  const { outputs } = req.body;

  log.debug('Webhook notification');

  const file = await File.findOne({ _id: fileId });

  const parsedOutputs = outputs.map(output => ({
    _id: output.id,
    url: output.url,
    format: output.label,
  }));

  file.set({ encoderOutputs: parsedOutputs, status: 'completed' }).save();
  const { _id } = file.toObject();

  log.debug('Videos converted and saved with success ✅');
  return res.json({ status: 'completed' });
});

app.get('/files/:fileId', async (req, res) => {
  const { fileId } = req.params;


  const file = await File.findById(fileId).lean()
    .catch(e => log.error('Not found file', e));

  return res.json(file);
});


http.createServer(app).listen(process.env.PORT, process.env.HOST, () => {
  log.info(`🖥️ Indenizou EMAILS up at: ${process.env.HOST}:${process.env.PORT}`);
});
