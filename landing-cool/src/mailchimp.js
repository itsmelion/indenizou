import Network from 'network';

class Mailchimp {
  constructor (config = {}) {
    this.list = config.list || process.env.MAILCHIMP_LIST || 'samplelist';
    this.api = 'https://api.mailchimp.com/3.0';
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
  subscribeUser (list = this.list, data) {
    return Network.post(`${ this.api }/lists/${ list }/members/`, data)
      .then(
        () => console.info('User subscribed at list'),
        e => new Error('Could not Subscribe user', e),
      );
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
    return Network.get(`${ this.api }/lists/${ list }/members/${ user }`)
      .catch(e => new Error('Could not FETCH user', e));
  }

  updateUser (list = this.list, user, data = {}) {
    return Network.patch(`${ this.api }/lists/${ list }/members/${ user }`, data)
      .catch(e => new Error('Could not UPDATE user', e));
  }

  deleteUser (list = this.list, user) {
    return Network.patch(
      `${ this.api }/lists/${ list }/members/${ user }`,
      { status: 'cleaned' },
    ).catch(e => new Error('Could not DELETE user', e));
  }
}

export default new Mailchimp();
