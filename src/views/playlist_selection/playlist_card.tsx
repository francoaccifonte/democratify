import React from 'react'
import Card from 'react-bootstrap/Card'
import { useTheme } from 'react-jss'

import { Text } from '../components'

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
      <Card.Title onClick={props.onClick} style={{ cursor: 'pointer' }}>
        <Text type='bodyRegular' color='White' >{props.name}</Text>
      </Card.Title>
    </Card.Body>
  </Card>
  )
}

export default PlaylistCard
