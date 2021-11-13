import SongListElement from './song_list_element';
import { Draggable } from 'react-beautiful-dnd'
import { Song } from '../../types/song'

type songListProps = {
rowNumber: number;
  data: Song;
  index: number;
}

const SongListElementDraggable = ({ rowNumber, data, index }: songListProps): JSX.Element => {
  return(
    <Draggable key={index.toString()} draggableId={index.toString()} index={index} isDragDisabled={rowNumber===0}>
      {(provided, snapshot) => {
        return(
          <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
            <SongListElement rowNumber={rowNumber} data={data}/>
          </div>
        )
      }}
    </Draggable>
  )
}

export default SongListElementDraggable;
