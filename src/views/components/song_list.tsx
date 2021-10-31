import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../features/root_reducer'
import { parseFromPlaylistReorderer } from '../../features/slices/current_playlist_slice'
import CSS from 'csstype';

import SongListElementDraggable from './song_list_element_draggable'

const SongList = () => {
  const songListStyle: CSS.Properties = {
    height: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
  }

  const dispatch = useDispatch()
  const songs = useSelector((state: RootState) => state.currentPlaylist.songs)


  const handleDragEnd = (result: any) => {
    if (! (result && result.source && result.destination) ) { return }
    if (result.destination.index === 0) { return }

    const items = Array.from(songs);
    const from = result.source.index;
    const to = result.destination.index;
    const [reorderedItem] = items.splice(from, 1);
    items.splice(to, 0, reorderedItem);

    dispatch(parseFromPlaylistReorderer(items))
  }

  const renderListHeader = () => {
    return(
      <Row className="px-2 pt-2">
        <Col xs={6} sm={4}>Title</Col>
        <Col xs={6} sm={4}>Artist</Col>
        <Col sm={4} className="d-none d-sm-block">Album</Col>
      </Row>
    )
  }

  return(
    <Container>
      <div className="bg-dark" style={songListStyle}>
        {renderListHeader()}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="songs">
            {(provided, snapshot) => {
              return(
                <div className="songs" {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    songs.map((data, id) => {
                      return(
                        <SongListElementDraggable rowNumber={id} data={data} index={id}/>
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
