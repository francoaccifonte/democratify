import SongListElement from './song_list_element';
import { Draggable } from 'react-beautiful-dnd'

type songListProps = {
  rowNumber: number;
  data: string;
  index: number;
}

const SongListElementDraggable = ({ rowNumber, data, index }: songListProps): JSX.Element => {
  return(
    <Draggable key={data} draggableId={data} index={index} isDragDisabled={rowNumber===0}>
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
