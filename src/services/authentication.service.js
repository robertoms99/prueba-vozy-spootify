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

    const { access_token, refresh_token } = await response.json()

    return { access_token, refresh_token }
  }
}

export default authenticationServices
