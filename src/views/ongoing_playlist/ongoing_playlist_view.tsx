import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Player from "./player";
import SongList from "./song_list";
import FullHeightSkeleton from "../full_height_skeleton"
import { RootState } from "../../features/root_reducer";

const OngoingPlaylistView = () => {
  const history = useHistory()
  const account = useSelector((state: RootState) => state.account)

  if (!account.id && ['rejected', 'fullfilled'].includes(account.status) ) {
    history.push('/')
  }

  return(
    <>
      <FullHeightSkeleton header palette='admin' overflowY="hidden">
        <Container style={{width: "40%"}}>
          <Player/>
        </Container>
        <Container>
          <SongList/>
        </Container>
      </FullHeightSkeleton>
    </>
  )
}

export default OngoingPlaylistView;