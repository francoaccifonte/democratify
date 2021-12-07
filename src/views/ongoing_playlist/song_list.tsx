import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import CSS from 'csstype';

import { parseFromPlaylistReorderer, updateInBackend } from '../../features/slices/current_playlist_slice'
import SongListElementDraggable from './song_list_element_draggable'
import { useOngoingPlaylist } from '../../hooks/useOngoingPlaylist'
import PlayingSong from './playing_song'
import VotingSongs from './voting_songs'

const SongList = () => {
  const songListStyle: CSS.Properties = {
    height: "100vh",
    overflowX: "hidden",
    overflowY: "auto",
  }

  var timerId: any;
  const dispatch = useDispatch();
  const { ongoingPlaylist } = useOngoingPlaylist();
  const { playingSong, votingSongs, remainingSongs } = ongoingPlaylist;

  const handleDragEnd = (result: any) => {
    if (! (result && result.source && result.destination) ) { return }

    const items = Array.from(remainingSongs);
    const from = result.source.index;
    const to = result.destination.index;
    const [reorderedItem] = items.splice(from, 1);
    items.splice(to, 0, reorderedItem);

    dispatch(parseFromPlaylistReorderer(items))
    if (timerId) { clearTimeout(timerId) }
    timerId = setTimeout(() => {
      dispatch(updateInBackend({songs: items}))
    }, 3000)
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

  if (!ongoingPlaylist.id) { 
    return (
      <div>
        404 
      </div>
    )
   }


  return(
    <Container>
      <div style={songListStyle}>
        {renderListHeader()}
        <PlayingSong song={playingSong} />
        <VotingSongs songs={votingSongs} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="songs">
            {(provided, snapshot) => {
              return(
                <div className="songs" {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    remainingSongs.map((data, id) => {
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
