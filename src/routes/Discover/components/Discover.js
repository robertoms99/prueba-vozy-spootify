import React, { Component } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import '../styles/_discover.scss'
import config from '../../../config'

const gettingData = {
  async getNewReleases(token) {
    const { baseUrl } = config.api
    const url = `${baseUrl}/browse/new-releases`
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const response = await fetch(url, {
      headers
    })

    const bodyResponse = await response.json()

    return bodyResponse.albums?.items ?? []
  },
  async getPlaylists(token) {
    const { baseUrl } = config.api
    const url = `${baseUrl}/browse/featured-playlists`
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const response = await fetch(url, {
      headers
    })

    const bodyResponse = await response.json()

    return bodyResponse.playlists?.items ?? []
  },

  async getCategories(token) {
    const { baseUrl } = config.api
    const url = `${baseUrl}/browse/categories`
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const response = await fetch(url, {
      headers
    })

    const bodyResponse = await response.json()

    return bodyResponse.categories?.items ?? []
  }
}

export default class Discover extends Component {
  constructor() {
    super()

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    }
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    if (token) this.getAllDiscoverData(token)
  }

  async getAllDiscoverData(token) {
    const { getNewReleases, getPlaylists, getCategories } = gettingData

    const [newReleasesResponse, playlistsReponse, categoriesResponse] = await Promise.allSettled([
      getNewReleases(token),
      getPlaylists(token),
      getCategories(token)
    ])

    this.setState((currentState) => {
      const newItems = {}
      if (newReleasesResponse.status === 'fulfilled')
        newItems.newReleases = newReleasesResponse.value
      if (playlistsReponse.status === 'fulfilled') newItems.playlists = playlistsReponse.value
      if (categoriesResponse.status === 'fulfilled') newItems.categories = categoriesResponse.value

      return {
        ...currentState,
        ...newItems
      }
    })
  }

  render() {
    const { newReleases, playlists, categories } = this.state

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    )
  }
}
