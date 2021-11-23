import {
  RouteComponentProps
} from "react-router-dom";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { useOngoingPlaylist } from '../../hooks/useOngoingPlaylist'
import { usePlaylist } from '../../hooks/usePlaylist'
import PlayerFooter from '../components/player_footer'

type TParams = { id: string };

const PlaylistShowView = ({ match }: RouteComponentProps<TParams>) => {
  const routeId = Number(match.params.id);
  const { startPlaylist } = useOngoingPlaylist();
  const { playlistData, fetchPlaylistData, fetchingPlaylistStatus } = usePlaylist();

  const playlist = playlistData(routeId)

  const handleClick = () => {
    startPlaylist(playlist.id)
  }

  if (!playlist) {
    fetchPlaylistData(routeId)
  }

  if (!playlist && ['pending', 'idle'].includes(fetchingPlaylistStatus)) {
    return (
      <div>
        Cargando
      </div>
    )
  }

  if (!playlist && fetchingPlaylistStatus === 'fulfilled') {
    return (
      <div>
        404
      </div>
    )
  }

  return(
    <>
      <Container fluid>
        <Row>
          <Col md={4}>
            <Image src={playlist.cover_art_url} fluid/>
            <div className="d-grid gap-2">
              <Button variant="primary" className="mt-5" size="lg" onClick={handleClick}>
                Reproducir
              </Button>
            </div>
          </Col>
          <Col md={8}>
            {
              playlist.spotify_songs.map((data, id) => {
                  return(
                    <div>
                      {data.title}
                      <br />
                    </div>
                  )
              })
            }
          </Col>
        </Row>
      </Container>
      <PlayerFooter />
    </>
  )
}

export default PlaylistShowView
