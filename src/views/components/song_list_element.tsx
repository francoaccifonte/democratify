import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import { RootState } from '../../features/root_reducer'

type songListProps = {
  rowNumber: number;
  data: string;
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
      <Row className={`${color} mt-2 mb-2`}>
        <Col xs={6} sm={4}>{`The truth is in here ${data}`}</Col>
        <Col xs={6} sm={4}>Ayreon</Col>
        <Col sm={4} className="d-none d-sm-block">01100101</Col>
      </Row>
    </>
  )
}

export default SongListElement;
