import config from '../config'

const fetchDiscoverTopic = async (token, path) => {
  const { baseUrl } = config.api
  const url = `${baseUrl}/browse/${path}`
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
  const response = await fetch(url, {
    headers
  })

  return response.json()
}

const discoverServices = {
  async getNewReleases(token) {
    const bodyResponse = await fetchDiscoverTopic(token, 'new-releases')
    return bodyResponse.albums?.items ?? []
  },

  async getPlaylists(token) {
    const bodyResponse = await fetchDiscoverTopic(token, 'featured-playlists')
    return bodyResponse.playlists?.items ?? []
  },

  async getCategories(token) {
    const bodyResponse = await fetchDiscoverTopic(token, 'categories')
    return bodyResponse.categories?.items ?? []
  }
}

export default discoverServices
