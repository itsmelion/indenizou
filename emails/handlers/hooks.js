const Boom = require('boom');
const log = require('../log');
const Customer = require('../models/customer');

exports.chimpEventsHandler = async ({ body }, res) => {
  switch (body.type) {
    case 'subscribe':
      return subscribe(body.data)(res);

    case 'unsubscribe':
      return unsubscribe(body.data)(res);

    case 'profile':
      return profile(body.data)(res);

    case 'upemail':
      return updateEmail(body.data)(res);

    case 'cleaned':
      return cleaned(body.data)(res);

    default:
      return res.status(501).send(Boom.notImplemented(`Type: ${body.type} was not implemented yet.`));
  }
};

const customerObj = (data, status) => ({
  status,
  id: data.id,
  email: data.email,
  name: data.merges && data.merges.NAME,
  phone: data.merges && data.merges.PHONE,
  contactby: data.merges && data.merges.CONTACTBY,
  assunto: data.merges && data.merges.ASSUNTO,
  outros: data.merges && data.merges.OUTROS,
  list_id: data.list_id,
  campaign_id: data.campaign_id
});

const removeEmpty = obj => Object.keys(obj)
.filter(k => obj[k] !== null && obj[k] !== undefined)  // Remove undef. and null.
.reduce((newObj, k) =>
  typeof obj[k] === 'object' ?
    Object.assign(newObj, {[k]: removeEmpty(obj[k])}) :  // Recurse.
    Object.assign(newObj, {[k]: obj[k]}),  // Copy value.
  {});

async function saveData (data, res) {
  const opt = { new: true, upsert: true };
  const query = data.id ? { id: data.id } : { email: data.email || data.old_email };
  const notFound = e => {
    log.error('Customer not Found');
    return res.status(404).json(Boom.notFound('Customer not Found', e));
  };

  const customer = await Customer.findOne(query, undefined, opt)
  .catch(e => notFound(e));

  if(!customer) notFound();

  if (data.new_id) customer.id = data.new_id; delete customer.new_id;
  if (data.new_email) customer.email = data.new_email; delete customer.new_email; delete customer.old_email;

  const savedCustomer = await customer.set({ ...customer, ...data }).save()
  .catch(e => {
    log.error('Internal Error at saving entity on DB');
    return res.send(Boom.internal('Internal Error at saving entity on DB', e))
  });

  return res.status(201).json(savedCustomer);
};

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
  const customer = removeEmpty(customerObj(data));
  customer.new_id = data.new_id;
  customer.new_email = data.new_email;
  customer.old_email = data.old_email;
  return res => saveData(customer, res);
};

const cleaned = data => {
  const customer = removeEmpty(customerObj(data));
  if (data.reason === 'abuse') customer.abuse = true;
  return res => saveData(customer, res);
};