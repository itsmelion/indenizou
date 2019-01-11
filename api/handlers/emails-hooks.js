const Boom = require('boom');
const log = require('../log');

exports.chimpEventsHandler = async ({ body: { type, data } }, res) => {
  log.info(`\n\n==> INFO: Webhook from MailChimp\n Type: ${ type }\n\n`);

  switch (type) {
    case 'subscribe':
      subscribe(data);
      break;

    case 'unsubscribe':
      unsubscribe(data);
      break;

    case 'profile':
      profile(data);
      break;

    case 'upemail':
      updateEmail(data);
      break;

    case 'cleaned':
      cleaned(data);
      break;

    default:
      res.status(501).send(Boom.notImplemented(`Type: ${type} was not implemented yet.`));
      break;
  }

  return res.status(200).send('OK from ALIA');
};

const customerObj = (data, status) => ({
  status,
  id: data.id,
  email: data.email,
  name: data.merges.NAME,
  phone: data.merges.PHONE,
  contactby: data.merges.CONTACTBY,
  assunto: data.merges.ASSUNTO,
  outros: data.merges.OUTROS,
  list_id: data.list_id,
  campaign_id: data.campaign_id
});

const removeEmpty = obj =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val && typeof val === 'object') removeEmpty(val)
    else if (val == null) delete obj[key]
})

const subscribe = data => {
  const customer = removeEmpty(customerObj(data, 'subscribed'));
};

const unsubscribe = data => {
  const customer = removeEmpty(customerObj(data, 'unsubscribed'));
  if (data.reason === 'abuse') customer.abuse = true;
};

const profile = data => {
  const customer = removeEmpty(customerObj(data));
};

const updateEmail = data => {
  data.id = data.new_id;
  data.email = data.new_email;
  const customer = removeEmpty(customerObj(data));
};

const cleaned = data => {
  const customer = removeEmpty(customerObj(data));
  if (data.reason === 'abuse') customer.abuse = true;
};