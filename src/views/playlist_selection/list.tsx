import Playlist from '../../types/playlist'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type ListProps = {
  playlists: Playlist[],
  history: any,
}

const redirectToPlaylistShow = (playlistId: Number, history: any) => {
  history.push(`/playlists/${playlistId}`)
}

const renderPlaylist = (playlist: Playlist, index: Number, history: any) => {
  return (
    <Row>
      <Col onClick={() => redirectToPlaylistShow(playlist.id, history)}>
        {playlist.name}
      </Col>
    </Row>
  )
};

const List = (props: ListProps) => {
  return(
    <Container>
      {
        props.playlists.map((data, id) => {
          return(renderPlaylist(data, id, props.history))
        })
      }
    </Container>
  )
}

export default List;
