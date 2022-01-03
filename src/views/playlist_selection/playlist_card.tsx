import React from 'react'
import Card from 'react-bootstrap/Card'
import whithStyles, { useTheme } from 'react-jss'

type PlaylistCardProps = {
  id?: number;
  url: string;
  name: string;
  onClick?: () => void;
  theme?: any;
}

const PlaylistCard = (props: PlaylistCardProps) => {
  const theme: any = useTheme()
  return (
    <Card style={{ width: '18rem', backgroundColor: theme?.Muted }} className='mb-3 mt-3'>
    <Card.Img variant="top" src={props.url} onClick={props.onClick} style={{ cursor: 'pointer' }}/>
    <Card.Body>
      <Card.Title onClick={props.onClick} style={{ cursor: 'pointer' }}>{props.name}</Card.Title>
    </Card.Body>
  </Card>
  )
}

export default PlaylistCard
