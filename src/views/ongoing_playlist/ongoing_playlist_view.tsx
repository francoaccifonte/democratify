import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Player from './player'
import SongList from './song_list'
import FullHeightSkeleton from '../full_height_skeleton'
import { RootState } from '../../features/root_reducer'
import { useVotation } from '../../hooks'

const OngoingPlaylistView = () => {
  const history = useHistory()
  const account = useSelector((state: RootState) => state.account)
  const { votationState, reloadVotation } = useVotation(account.id as number, 'asdf')

  useEffect(() => {
    if (votationState.status === 'fulfilled' && votationState.votation.id) {
      const interval = setInterval(() => reloadVotation(), 3000)
      return () => clearInterval(interval)
    }
  }, [reloadVotation, votationState])
  if (!account.id && ['rejected', 'fullfilled'].includes(account.status)) {
    history.push('/login')
  }

  return (
    <>
      <FullHeightSkeleton header palette='admin' overflowY="hidden">
        <Container style={{ width: '40%' }}>
          <Player/>
        </Container>
        <Container>
          <SongList/>
        </Container>
      </FullHeightSkeleton>
    </>
  )
}

export default OngoingPlaylistView
