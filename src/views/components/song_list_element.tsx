import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/root_reducer'
import { Song } from '../../types/song'

type songListProps = {
  rowNumber: number;
  data: Song;
}

const SongListElement = ({ rowNumber, data }: songListProps): JSX.Element => {
  const candidatePool = useSelector((state: RootState) => state.currentPlaylist.candidatePoolSize)
  let color: string = rowNumber === 0
    ? "bg-primary"
    : rowNumber <= candidatePool
      ? "bg-success"
      : "bg-secondary"

  return(
    <>
      <Row className={`${color} my-2 px-2 py-2`}>
        <Col lg={1}>
          <Image src={data.cover_art[2].url} alt="album art" roundedCircle/>
        </Col>
        <Col xs={4} sm={3}>{`${data.title}`}</Col>
        <Col xs={4} sm={3}>{`${data.artist}`}</Col>
        <Col sm={4} className="d-none d-sm-block">{`${data.album}`}</Col>
      </Row>
    </>
  )
}

export default SongListElement;
