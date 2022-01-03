import React from 'react'

import { useRedirects } from '../../hooks'
const LandingView = () => {
  const redirects = useRedirects()
  redirects.redirectToPlaylistsIfLogedIn()
  return <></>
}

export default LandingView
