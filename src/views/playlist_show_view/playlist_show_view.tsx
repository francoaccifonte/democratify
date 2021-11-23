import {
  RouteComponentProps
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import { fetchPlaylist } from '../../features/slices/playlist_data_slice'
import { startOngoingPlaylist } from '../../features/slices/current_playlist_slice'
import { RootState } from '../../features/root_reducer'
import { useOngoingPlaylist } from '../../hooks/useOngoingPlaylist'

type TParams = { id: string };

const PlaylistShowView = ({ match }: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state: RootState) => state.playlistData.playlists[Number(match.params.id)])
  const fetchingPlaylistStatus = useSelector((state: RootState) => state.playlistData.status)
  const { startPlaylist } = useOngoingPlaylist();

  const handleClick = () => {
    startPlaylist(playlist.id)
  }

  if (!playlist) {
    dispatch(fetchPlaylist({id: Number(match.params.id)}))
  }

  if (!playlist && ['pending', 'idle'].includes(fetchingPlaylistStatus)) {
    console.log("A")
    return (
      <div>
        Cargando
      </div>
    )
  }

  if (!playlist && fetchingPlaylistStatus === 'fulfilled') {
    console.log("B")
    return (
      <div>
        404
      </div>
    )
  }

  return(
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
  )
}

export default PlaylistShowView
