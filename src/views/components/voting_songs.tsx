import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Song } from '../../types/song'

type VotingSongsProps = {
  songs?: Song[];
}

const VotingSongs = (props: VotingSongsProps) => {
  const { songs } = props
  if (!songs) { return null }

  return(
    <>
      {
        songs.map((song, index) => {
          return(
            <Row className={"bg-success my-2 px-2 py-2"}>
              <Col lg={1}>
                <Image src={song.cover_art[2].url} alt="album art" roundedCircle/>
              </Col>
              <Col xs={4} sm={3}>{`${song.title}`}</Col>
              <Col xs={4} sm={3}>{`${song.artist}`}</Col>
              <Col sm={4} className="d-none d-sm-block">{`${song.album}`}</Col>
            </Row>
          )
        })
      }
    </>
  )
}

export default VotingSongs;
