import React from 'react'
import Image from 'react-bootstrap/Image'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useDispatch } from 'react-redux'

import { incrementPoolSize, decrementPoolSize } from '../../features/slices/current_playlist_slice'
import SpotifyLoginButton from '../components/spotify_login_button'
import { useOngoingPlaylist } from '../../hooks/useOngoingPlaylist'

const Player = () => {
  const { ongoingPlaylist } = useOngoingPlaylist()
  const candidatePoolSize = ongoingPlaylist.candidatePoolSize
  const dispatch = useDispatch()
  const image = ongoingPlaylist.playingSong?.cover_art[1].url
  return (
    <Container>
      <Image src={image} alt={'asdfg'} rounded fluid/>

      <Container className="bg-secondary mt-4 pt-2 rounded">
        <Row className="justify-content-md-center">Candidate songs: {candidatePoolSize}</Row>
        <ButtonGroup className="d-flex pb-4 pt-1">
          <Button variant="info" onClick={() => dispatch(decrementPoolSize())}>-</Button>
          <Button variant="info" onClick={() => dispatch(incrementPoolSize())}>+</Button>
        </ButtonGroup>
      </Container>

      <SpotifyLoginButton />
    </Container>
  )
}

export default Player
