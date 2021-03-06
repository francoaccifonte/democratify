import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Song } from '../../types/song'
import Text from '../components/text'
import { adminPalette } from '../../color_palette'

type PlayingSongProps = {
  song?: Song;
}

const PlayingSong = (props: PlayingSongProps) => {
  const { song } = props

  if (!song) { return null }

  return (
    <>
      <Row className={'my-2 px-2 py-2'} style={{ backgroundColor: adminPalette.Primary }}>
        <Col lg={1}>
          <Image src={song.cover_art[2].url} alt="album art" roundedCircle/>
        </Col>
        <Col xs={4} sm={3}>
          <Text type="bodyRegular" color="White">{song.title}</Text>
        </Col>
        <Col xs={4} sm={3}>
          <Text type="bodyRegular" color="White">{song.artist}</Text>
        </Col>
        <Col sm={4} className="d-none d-sm-block">
          <Text type="bodyRegular" color="White">{song.album}</Text>
        </Col>
      </Row>
    </>
  )
}

export default PlayingSong
