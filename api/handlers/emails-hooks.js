const Boom = require('boom');
const log = require('../log');
const Customer = require('../models/customer');

exports.chimpEventsHandler = async ({ body: { type, data } }, res) => {
  switch (type) {
    case 'subscribe':
      return subscribe(data)(res);

    case 'unsubscribe':
      return unsubscribe(data)(res);

    case 'profile':
      return profile(data)(res);

    case 'upemail':
      return updateEmail(data)(res);

    case 'cleaned':
      return cleaned(data)(res);

    default:
      return res.status(501).send(Boom.notImplemented(`Type: ${type} was not implemented yet.`));
  }
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

const saveData = (data, res) => {
  const opt = { new: true, upsert: true };

  return Customer.findOneAndUpdate({ id: data.id, email: data.email }, data, opt)
    .then(() => res.status(201).end())
    .catch(e => res.send(Boom.internal('Internal Error at finding or saving entity on DB', e)));
}

const subscribe = data => {
  const customer = removeEmpty(customerObj(data, 'subscribed'));
  return res => saveData(customer, res);
};

const unsubscribe = data => {
  const customer = removeEmpty(customerObj(data, 'unsubscribed'));
  if (data.reason === 'abuse') customer.abuse = true;
  return res => saveData(customer, res);
};

const profile = data => {
  const customer = removeEmpty(customerObj(data));
  return res => saveData(customer, res);
};

const updateEmail = data => {
  data.id = data.new_id;
  data.email = data.new_email;
  const customer = removeEmpty(customerObj(data));
  return res => saveData(customer, res);
};

const cleaned = data => {
  const customer = removeEmpty(customerObj(data));
  if (data.reason === 'abuse') customer.abuse = true;
  return res => saveData(customer, res);
};