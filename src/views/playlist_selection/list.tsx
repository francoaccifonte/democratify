import React from 'react'
import Playlist from '../../types/playlist'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PlaylistCard from './playlist_card'

type ListProps = {
  playlists: Playlist[],
  history: any,
}

const redirectToPlaylistShow = (playlistId: Number, history: any) => {
  history.push(`/playlists/${playlistId}`)
}

const List = (props: ListProps) => {
  if (props.playlists.length > 0) {
    return (
      <Container>
        <Row>
          {
            props.playlists.map((data, id) => {
              return (
                <Col key={id}>
                  <PlaylistCard
                    id={data.id}
                    name={data.name}
                    url={data.cover_art_url}
                    onClick={() => redirectToPlaylistShow(data.id, props.history)}
                  />
                </Col>
              )
            })
          }
          </Row>
      </Container>
    )
  }

  return (<></>)
}

export default List
