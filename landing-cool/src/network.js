export class Network {
  constructor () {
    this.options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      cache: 'default',
    };
  }

  get (url) {
    return fetch(url)
      .then(r => r.json())
      .catch(e => new Error(`Could not GET ${ url }`, e));
  }

  post (url, data = {}) {
    const body = JSON.stringify(data);
    const options = Object.assign(this.options, { method: 'POST', body });
    return fetch(url, options)
      .then(r => r.json())
      .catch(e => new Error(`Could not POST to ${ url }`, e));
  }

  put (url, data = {}) {
    const body = JSON.stringify(data);
    const options = Object.assign(this.options, { method: 'PUT', body });
    return fetch(url, options)
      .then(r => r.json())
      .catch(e => new Error(`Could not PUT to ${ url }`, e));
  }

  patch (url, data = {}) {
    const body = JSON.stringify(data);
    const options = Object.assign(this.options, { method: 'PATCH', body });
    return fetch(url, options)
      .then(r => r.json())
      .catch(e => new Error(`Could not PATCH to ${ url }`, e));
  }

  delete (url, data = {}) {
    const body = JSON.stringify(data);
    const options = Object.assign(this.options, { method: 'DELETE', body });
    return fetch(url, options)
      .then(r => r.json())
      .catch(e => new Error(`Could not DELETE to ${ url }`, e));
  }
}

export default new Network();
