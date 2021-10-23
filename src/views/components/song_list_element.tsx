import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/root_reducer'
import Song from '../../backend/models/song_model'

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
      <Row className={`${color} my-2 px-2`}>
        <Col xs={6} sm={4}>{`${data.title}`}</Col>
        <Col xs={6} sm={4}>{`${data.artist}`}</Col>
        <Col sm={4} className="d-none d-sm-block">{`${data.album}`}</Col>
      </Row>
    </>
  )
}

export default SongListElement;
