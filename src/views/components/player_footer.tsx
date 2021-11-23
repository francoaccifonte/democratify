import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { useOngoingPlaylist } from '../../hooks/useOngoingPlaylist'

type PlayerFooterProps = {
}

const PlayerFooter = (props: PlayerFooterProps) => {

  const { ongoingPlaylist, fetchPlaylist } = useOngoingPlaylist()

  if (ongoingPlaylist.status === 'idle') { fetchPlaylist() }

  if (ongoingPlaylist.status === 'fulfilled' && !ongoingPlaylist.id) {
    return(
      <div>fafa</div>
    )
  }

  if (ongoingPlaylist.status === 'fulfilled' && ongoingPlaylist.id) {
    return(
      <Navbar expand="lg" variant="light" fixed="bottom" bg="dark" style={{height: "8rem"}}>
        <Container>
          <Navbar.Brand>
            <FontAwesomeIcon icon={faPlay} color="white" size="2x"/>
            Estas escuchando "Tu Vieja"
          </Navbar.Brand>
        </Container>
      </Navbar>
    )
  }
  
  return (
    <></>
  )
}

export default PlayerFooter;
