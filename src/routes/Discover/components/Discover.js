import React, { Component } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import '../styles/_discover.scss'
import AuthenticationContext from '../../../common/context/AuthenticationContext'
import discoverServices from '../../../services/discover.service'

export default class Discover extends Component {
  static contextType = AuthenticationContext

  constructor() {
    super()

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    }
  }

  componentDidMount() {
    const { token } = this.context
    if (token) this.getAllDiscoverData(token)
  }

  async getAllDiscoverData(token) {
    const [newReleasesResponse, playlistsReponse, categoriesResponse] = await Promise.allSettled([
      discoverServices.getNewReleases(token),
      discoverServices.getPlaylists(token),
      discoverServices.getCategories(token)
    ])

    this.setState((currentState) => {
      const newState = {
        newReleases: newReleasesResponse.value ?? [],
        playlists: playlistsReponse.value ?? [],
        categories: categoriesResponse.value ?? []
      }

      return {
        ...currentState,
        ...newState
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
