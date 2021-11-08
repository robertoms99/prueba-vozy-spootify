import config from '../config'

const authenticationServices = {
  async authenticateSpootify() {
    const { authUrl, clientId, clientSecret } = config.api
    const url = authUrl
    const headers = {
      Authorization: `Basic ${window.btoa(`${clientId}:${clientSecret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: 'grant_type=client_credentials'
    })
    const bodyResponse = await response.json()

    return bodyResponse.access_token
  }
}

export default authenticationServices
