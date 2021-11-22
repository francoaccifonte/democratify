import Card from 'react-bootstrap/Card'

type PlaylistCardProps = {
  id?: number;
  url: string;
  name: string;
  onClick?: () => void;
}

const PlaylistCard = (props: PlaylistCardProps) => {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={props.url} onClick={props.onClick} style={{cursor: 'pointer'}}/>
    <Card.Body>
      <Card.Title onClick={props.onClick} style={{cursor: 'pointer'}}>{props.name}</Card.Title>
    </Card.Body>
  </Card>
  )
}

export default PlaylistCard;
