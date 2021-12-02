// Maybe in the future the rotue /playlist/:id can be accessed while another playlist is running.
// The view over which the votation occurs can be different from a playlist show view.

import CSS from 'csstype';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Player from "./player";
import SongList from "./song_list";
import { RootState } from "../../features/root_reducer";

const OngoingPlaylistView = () => {
  const containerStyle: CSS.Properties = {
    height: "100vh"
  }
  const history = useHistory()
  const account = useSelector((state: RootState) => state.account)

  if (!account.id && ['rejected', 'fullfilled'].includes(account.status) ) {
    history.push('/')
  }

  return(
    <>
      <Container fluid style={containerStyle}>
        <Row className="bg-dark text-white h-100">
          <Col sm={2}>
            <Player/>
          </Col>
          <Col sm={10}>
            <SongList/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default OngoingPlaylistView;