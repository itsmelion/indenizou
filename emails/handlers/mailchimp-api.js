const axios = require('axios');

class Mailchimp {
  constructor (config = {}) {
    this.list = config.list || process.env.MAILCHIMP_LIST;
    this.username = config.username || process.env.MAILCHIMP_USER;
    this.password = config.password || process.env.MAILCHIMP_KEY;
    this.api = 'https://us7.api.mailchimp.com/3.0';
  }


  /**
   * @description Subscribes an User
   * Model
   * {
   *  email_address: 'user@email.com',
   *   status: 'subscribed', // subscribed, unsubscribed, pending, cleaned
   *   merge_fields: {
   *       'FNAME': 'Urist',
   *       'LNAME': 'McVankab'
   *   }
   * }
  */
  subscribeUser (body, list = this.list) {
    const data = {
      email_address: body.email,
      status: 'subscribed',
      merge_fields: {
        NAME: body.name,
        PHONE: body.phone,
        CONTACTBY: body.contactby,
        ASSUNTO: body.assunto,
        OUTROS: body.outros,
      },
    };

    return axios({
      method: 'post',
      url: `${ this.api }/lists/${ list }/members`,
      data,
      auth: {
        username: this.username,
        password: this.password,
      },
    })
    .catch(r => r.response.data);
  }


  /**
   * @description Checks the status of an User

   *** If the call returns a 200 response, check the status field.
      You’ll see one of these labels in the "status" field:

    ** subscribed
        This address is on the list and ready to receive email.
        You can only send campaigns to ‘subscribed’ addresses.
    **  unsubscribed
        This address used to be on the list but isn’t anymore.
    **  pending
        This address requested to be added with double-opt-in
        but hasn’t confirmed their subscription yet.
    **  cleaned
        This address bounced and has been removed from the list.
  */
  checkUser (list = this.list, user) {
    return axios({
      url: `${ this.api }/lists/${ list }/members/${ user }`,
      auth: {
        username: this.username,
        password: this.password,
      },
    })
      .catch(() => new Error('Could not FETCH user'));
  }

  updateUser (list = this.list, user, data = {}) {
    return axios({
      method: 'patch',
      url: `${ this.api }/lists/${ list }/members/${ user }`,
      auth: {
        username: this.username,
        password: this.password,
      },
      data,
    })
      .catch(() => new Error('Could not UPDATE user'));
  }

  deleteUser (list = this.list, user) {
    return axios({
      method: 'patch',
      url: `${ this.api }/lists/${ list }/members/${ user }`,
      auth: {
        username: this.username,
        password: this.password,
      },
      data: { status: 'cleaned' },
    }).catch(() => new Error('Could not DELETE user'));
  }

  COMPLETELY_REMOVE_USER (list = this.list, user) {
    return axios({
      method: 'delete',
      url: `${ this.api }/lists/${ list }/members/${ user }`,
      auth: {
        username: this.username,
        password: this.password,
      },
    })
    .catch(r => r.response.data);
  }

  createTag (list = this.list, name) {
    const data = {
      name,
      Static_segment: []
    };

    return axios({
      method: 'post',
      url: `${ this.api }/lists/${ list }/segments`,
      data,
      auth: {
        username: this.username,
        password: this.password,
      },
    })
    .catch(r => r.response.data);
  }

  viewTags (list = this.list, subscriber) {
    return axios({
      method: 'get',
      url: `${ this.api }/lists/${ list }/members/${ subscriber }/tags`,
      auth: {
        username: this.username,
        password: this.password,
      },
    })
    .then(r => r.tags)
    .catch(r => r.response.data);
  }

  addTag (list = this.list, segment, email_address) {
    const data = { email_address };
    return axios({
      method: 'post',
      url: `${ this.api }/lists/${ list }/segments/${ segment }/members`,
      auth: {
        username: this.username,
        password: this.password,
      },
      data,
    })
    .catch(r => r.response.data);
  }

  deleteTag (list = this.list, segment, subscriber) {
    return axios({
      method: 'delete',
      url: `${ this.api }/lists/${ list }/segments/${ segment }/members/${ subscriber }`,
      auth: {
        username: this.username,
        password: this.password,
      },
    })
    .catch(r => r.response.data);
  }
}

module.exports = new Mailchimp();
