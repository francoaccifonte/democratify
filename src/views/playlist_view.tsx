import {
  RouteComponentProps
} from "react-router-dom";
import CSS from 'csstype';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Player from "./components/player";
import SongList from "./components/song_list";

type TParams = { id: string };

const PlaylistView = ({ match }: RouteComponentProps<TParams>) => {

  const containerStyle: CSS.Properties = {
    height: "100vh"
  }

  return(
    <>
      <Container fluid style={containerStyle}>
        <Row className="bg-dark text-white h-100">
          <Col sm={2}>
            <Player />
          </Col>
          <Col sm={10}>
            <SongList />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PlaylistView;
