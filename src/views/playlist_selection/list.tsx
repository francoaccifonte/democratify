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
  
  return(
    <Container>
      <Row>
        {
          props.playlists.map((data, id) => {
            return(
              <Col>
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

export default List;
