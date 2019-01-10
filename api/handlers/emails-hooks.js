const log = require('../log');

exports.chimpEventsHandler = async (req, res) => {
  log.info(`\n\n==> INFO: Webhook from MailChimp\n Type: ${ req.body.type }`);

  return res.status(200).send('OK');
};