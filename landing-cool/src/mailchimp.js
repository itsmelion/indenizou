// import axios from 'axios';
import Network from 'network';

class Mailchimp {
  constructor (config = {}) {
    this.list = config.list || process.env.MAILCHIMP_LIST || 'samplelist';
    this.api = 'https://us7.api.mailchimp.com/3.0';
    this.options = {
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'include',
      crossdomain: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.MAILCHIMP_AUTH,
      },
    };
  }


  /**
   * @description Subscribes an User
   * Model
   * {
   *  email_address: 'user@email.com',
   *   status: 'subscribed', // subscribed, unsubscribed, pending
   *   merge_fields: {
   *       'FNAME': 'Urist',
   *       'LNAME': 'McVankab'
   *   }
   * }
  */
  subscribeUser (data, list = this.list) {
    return Network.post(
      'https://indenizou.us7.list-manage.com/subscribe/post?u=41fbe73c16e8812fc47a541af&id=5a902846d0',
      null,
      data,
    )
      .then(
        () => console.info('User were subscribed at list'),
        e => new Error('Could not Subscribe user', e),
      )
      .catch(e => new Error('Could not Subscribe user', e));
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
    return Network.get(`${ this.api }/lists/${ list }/members/${ user }`, this.options)
      .catch(e => new Error('Could not FETCH user', e));
  }

  updateUser (list = this.list, user, data = {}) {
    return Network.patch(`${ this.api }/lists/${ list }/members/${ user }`, this.options, data)
      .catch(e => new Error('Could not UPDATE user', e));
  }

  deleteUser (list = this.list, user) {
    return Network.patch(
      `${ this.api }/lists/${ list }/members/${ user }`,
      this.options,
      { status: 'cleaned' },
    ).catch(e => new Error('Could not DELETE user', e));
  }

  COMPLETELY_REMOVE_USER (list = this.list, user) {
    return Network.delete(
      `${ this.api }/lists/${ list }/members/${ user }`,
    ).catch(e => new Error('Could not DELETE user', e));
  }
}

export default new Mailchimp();
