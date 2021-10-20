import { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import SongListElementDragabble from './song_list_element_draggable'

const SongList = () => {
  const [songs, setSongs] = useState(["A", "B", "C", "D", "E", "F"]);

  const handleDragEnd = (result: any) => {
    if (! (result && result.source && result.destination) ) { return }
    if (result.destination.index === 0) { return }

    const items = Array.from(songs);
    const from = result.source.index;
    const to = result.destination.index;
    const [reorderedItem] = items.splice(from, 1);
    items.splice(to, 0, reorderedItem);

    setSongs(items);
  }

  const renderListHeader = () => {
    return(
      <Row className="">
        <Col xs={6} sm={4}>Song</Col>
        <Col xs={6} sm={4}>Artist</Col>
        <Col sm={4} className="d-none d-sm-block">Album</Col>
      </Row>
    )
  }

  return(
    <Container>
      <div className="bg-dark">
        {renderListHeader()}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="songs">
            {(provided, snapshot) => {
              return(
                <div className="songs" {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    songs.map((data, id) => {
                      return(
                        <SongListElementDragabble rowNumber={id} data={data} index={id}/>
                      )
                    })
                  }
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </Container>
  )
}

export default SongList;
