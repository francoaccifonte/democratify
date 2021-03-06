import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { List } from './index'
import { fetchPlaylists } from '../../features/slices/playlists_slice'
import { RootState } from '../../features/root_reducer'
import { FullHeightSkeleton } from '../components'
import { useRedirects } from '../../hooks'

const PlaylistSelectionView = () => {
  useRedirects().redirectBySpotifyUser()
  const playlists = useSelector((state: RootState) => state.playlists)
  const account = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch()
  const history = useHistory()

  if (!account.id) {
    history.push('/login')
  }

  useEffect(() => {
    if (!account.token) { return }
    dispatch(fetchPlaylists({}))
  }, [account.token, dispatch])

  return (
    <FullHeightSkeleton header footer palette='admin'>
      <List playlists={playlists.playlists} history={history}/>
    </FullHeightSkeleton>
  )
}

export default PlaylistSelectionView
