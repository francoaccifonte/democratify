import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Candidate } from '../../types/votation';

type CandidateElementProps = {
  data: Candidate,
  key: number,
  onSelect: Function,
  selected?: number,
};

const CandidateElement = (props: CandidateElementProps) => {
  const isSelected = props.selected === props.data.id;
  const backgroundColor = isSelected ? '#3CA1FF' : '#E782D1';
  return(

    <Container className="my-4 py-2 rounded-3" style={{background: backgroundColor}} >
      <Row onClick={() => props.onSelect()}>
        <Col xs={4}>
          <Image src={props.data.spotify_song?.cover_art[1].url} style={{maxWidth: "5rem"}}/>
        </Col>
        <Col xs={8}>
          <Container>
            <Row className="text-truncate">{props.data.spotify_song?.title}</Row>
            <Row className="text-truncate">{props.data.spotify_song?.artist}</Row>
            <Row className="text-truncate">{props.data.spotify_song?.album}</Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
};

export default CandidateElement;
