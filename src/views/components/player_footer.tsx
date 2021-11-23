import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

import { useOngoingPlaylist } from '../../hooks/useOngoingPlaylist'

type PlayerFooterProps = {
  history: any
}

const PlayerFooter = (props: PlayerFooterProps) => {
  const { ongoingPlaylist } = useOngoingPlaylist()
  const redirect = () => props.history.push('/playlists/onging')

  type contentProps = { ongoingPlaylist: any, votation: any };
  const NavbarContent = (props: contentProps) => {
    return(
      <>
        <Navbar.Brand onClick={redirect}>
          <FontAwesomeIcon icon={faPlay} size="2x"/>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={redirect}>
            Estas escuchando:
          </Nav.Link>
          <Nav.Link onClick={redirect}>
            {ongoingPlaylist?.playingSong?.title} - {ongoingPlaylist?.playingSong?.artist}
          </Nav.Link>
          <Nav.Link onClick={redirect}>
            Proxima cancion lablabal
          </Nav.Link>
        </Nav>
      </>
    )
  }

  if (!ongoingPlaylist) {
    return(
      <div>fafa</div>
    )
  }

  if (ongoingPlaylist.status === 'fulfilled' && ongoingPlaylist.id) {
    return(
      <Navbar expand="lg" variant="dark" fixed="bottom" bg="dark" style={{height: "8rem"}}>
        <Container>
          <NavbarContent ongoingPlaylist={ongoingPlaylist} votation={{}}/>
        </Container>
      </Navbar>
    )
  }
  
  return (
    <></>
  )
}

export default PlayerFooter;
