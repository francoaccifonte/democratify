import Playlist from '../../types/playlist'

type ListProps = {
  playlists: Playlist[],
}

const List = (props: ListProps) => {
  return(
    <div>
      {
        props.playlists.map((data, id) => {
          console.log(data)
          return(
            <>
              {data['name']}
              <br />
            </>
          )
        })
      }
    </div>
  )
}

export default List;
