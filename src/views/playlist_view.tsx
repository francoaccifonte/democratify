import {
  RouteComponentProps
} from "react-router-dom";
import CSS from 'csstype';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Player from "./components/player";
import SongList from "./components/song_list";
import { PlaylistModel } from "../backend/models/playlist_model"
import { useDispatch } from 'react-redux'
import { parseFromBackend } from '../features/slices/current_playlist_slice'
import { useEffect, useMemo } from "react"

type TParams = { id: string };

const PlaylistView = ({ match }: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  var playlist: any = new PlaylistModel();

  // This is just a hack to get the playlist from the backend without a thunk. Remove it when the backend is working.
  const memoizedValue = useMemo(
    () => {
      return(playlist.show(25))
    }, [25]);

  useEffect(() => {
    dispatch(parseFromBackend(memoizedValue));
  }, [dispatch, memoizedValue]);

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
            <SongList/>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PlaylistView;
