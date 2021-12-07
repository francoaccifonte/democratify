import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { useOngoingPlaylist } from '../../hooks/useOngoingPlaylist'

type PlayerFooterProps = {
  className?: string,
  style?: React.CSSProperties,
}

const PlayerFooter = (props: PlayerFooterProps) => {
  const { ongoingPlaylist } = useOngoingPlaylist()
  const history = useHistory();
  const redirect = () => history.push('/playlists/ongoing')

  if (!ongoingPlaylist) {
    return(null)
  }

  if (ongoingPlaylist.status === 'fulfilled' && ongoingPlaylist.id) {
      return(
        <>
          <Container fluid onClick={redirect} style={{height: "8rem", backgroundColor: "#0B2355"}} className={`${props.className} d-flex flex-row`}>
            <Col >
              <FontAwesomeIcon icon={faPlay} size="5x" color="white"/>
            </Col>
            <Col>
              <Col>
                Estas escuchando:
              </Col>
              <Col>
                <Row>
                  {ongoingPlaylist?.playingSong?.title}
                </Row>
                <Row>
                  {ongoingPlaylist?.playingSong?.artist}
                </Row>
              </Col>
            </Col>
            <Col>
              Proxima cancion lablabal
            </Col>
          </Container>
        </>
      )
  }
  
  return (
    null
  )
}

export default PlayerFooter;
