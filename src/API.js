
class BaseAPI {

  static get API_ENDPOINT() {
    return 'https://example.com/api'
  }

  constructor(token) {
    this._token = token
    this._retries_limit = 3
  }

  _get(api, params = {}) {
    params = this.extend({ token: this._token }, params)
    const encodedParams = this.queryEncode(params)
    const url = `${BaseAPI.API_ENDPOINT}${api}?${encodedParams}`

    return this._fetch(url, 'get')
  }

  _post(api, data = {}) {
    const url = `${BaseAPI.API_ENDPOINT}${api}`

    return this._fetch(url, 'post', data)
  }

  _fetch(url, method, payload) {
    const headers = this._token ? { 'Authorization' : this._token } : null

    let response = null
    for (let retry = 0; retry < this._retries_limit; retry++) {
      try {
        response = UrlFetchApp.fetch(url, {
          'method': method,
          'contentType': 'application/json',
          'headers': headers,
          'payload': JSON.stringify(payload)
        })
      } catch (e) {
        throw e
      }

      return response
    }

    throw Error('Try limit over')
  }

  queryEncode(params) {
    const l = []
    for (let key in params) {
      if (params[key] !== null) {
        let p = params[key]
        if (Array.isArray(p)) p = p.join(',')
        if (typeof p == 'object') p = JSON.stringify(p)
        l.push(`${key}=${p}`)
      }
    }

    return l.join('&')
  }

  extend(obj1, obj2) {
    const result = obj1
    for (let key in obj2) {
      result[key] = obj2[key]
    }

    return result
  }
}

class LoginAPI extends BaseAPI {

  auth(email, password) {
    if (!email || !password) throw Error('[LoginAPI][auth] email/password is required')

    return this._post('/login',  { user: { email: email, password: password }})
  }
}

class SampleAPI extends BaseAPI {

  search(search_keywords = "") {

    let data = {}

    if (search_keywords) {
      data = ({ search_keywords: search_keywords }, data)
    }

    return this._post('/search',  { search: data })
  } 
}

export class Methods {
  
  constructor(token) {
    this.login = (new LoginAPI("")).auth
    this.sample = new SampleAPI(token)
  }
}
