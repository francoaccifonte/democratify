import React from 'react'
import {
  RouteComponentProps
} from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { useRedirects, usePlaylist, useOngoingPlaylist } from '../../hooks'
import FullHeightSkeleton from '../full_height_skeleton'

type TParams = { id: string };

const PlaylistShowView = ({ match }: RouteComponentProps<TParams>) => {
  useRedirects().redirectBySpotifyUser()
  const routeId = Number(match.params.id)
  const { ongoingPlaylist, startPlaylist } = useOngoingPlaylist()
  const { playlist, requestStatus } = usePlaylist(routeId)

  const handleClick = () => {
    startPlaylist(playlist.id)
  }

  if (!playlist && ['pending', 'idle'].includes(requestStatus)) {
    return (
      <div>
        Cargando
      </div>
    )
  }

  if (!playlist) {
    return (
      <div>
        404
      </div>
    )
  }

  return (
    <FullHeightSkeleton header footer palette='admin'>
      <Container className="d-flex flex-row justify-content-between">
        <Col md={4} className="align-items-center d-flex flex-column">
          <Image src={playlist.cover_art_url} fluid/>
          <div className="d-grid gap-2" style={{ width: '100%' }}>
            <Button variant={ongoingPlaylist.id ? 'danger' : 'primary'} className="mt-5" size="lg" onClick={handleClick} >
              Reproducir
            </Button>
          </div>
        </Col>
        <Col md={6} className="text-white">
          {
            playlist.spotify_songs.map((data, id) => {
              return (
                <div key={id}>
                  {data.title}
                  <br />
                </div>
              )
            })
          }
        </Col>
      </Container>
    </FullHeightSkeleton>
  )
}

export default PlaylistShowView
