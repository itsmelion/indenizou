export class Network {
  constructor () {
    this.options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      credentials: 'include',
      mode: 'no-cors',
      cache: 'default',
    };
  }

  get (url, headers) {
    const options = Object.assign(this.options, { method: 'get', headers: new Headers(headers) });
    return fetch(url, options)
      .then(r => r.json())
      .catch(e => new Error(`Could not GET ${ url }`, e));
  }

  post (url, headers = {}, data = {}) {
    const body = JSON.stringify(data);
    console.warn(headers);
    const options = Object.assign(this.options, { method: 'POST', headers: new Headers(headers), body });
    return fetch(url, options)
      .then(r => r.json())
      .catch(e => new Error(`Could not POST to ${ url }`, e));
  }

  put (url, headers = {}, data = {}) {
    const body = JSON.stringify(data);
    const options = Object.assign(this.options, { method: 'PUT', headers: new Headers(headers), body });
    return fetch(url, options)
      .then(r => r.json())
      .catch(e => new Error(`Could not PUT to ${ url }`, e));
  }

  patch (url, headers = {}, data = {}) {
    const body = JSON.stringify(data);
    const options = Object.assign(this.options, { method: 'PATCH', headers: new Headers(headers), body });
    return fetch(url, options)
      .then(r => r.json())
      .catch(e => new Error(`Could not PATCH to ${ url }`, e));
  }

  delete (url, headers = {}, data = {}) {
    const body = JSON.stringify(data);
    const options = Object.assign(this.options, { method: 'DELETE', headers: new Headers(headers), body });
    return fetch(url, options)
      .then(r => r.json())
      .catch(e => new Error(`Could not DELETE to ${ url }`, e));
  }
}

export default new Network();
