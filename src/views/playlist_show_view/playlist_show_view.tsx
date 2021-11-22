import {
  RouteComponentProps
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import Playlist from '../../types/playlist'
import { fetchPlaylist } from '../../features/slices/playlist_data_slice'
import { RootState } from '../../features/root_reducer'

type TParams = { id: string };

const PlaylistShowView = ({ match }: RouteComponentProps<TParams>) => {
  const dispatch = useDispatch();
  const playlist = useSelector((state: RootState) => state.playlistData.playlists[Number(match.params.id)])
  const fetchingPlaylistStatus = useSelector((state: RootState) => state.playlistData.status)

  console.log(playlist)
  console.log(match.params.id)
  console.log(fetchingPlaylistStatus)

  if (!playlist) {
    dispatch(fetchPlaylist({id: Number(match.params.id)}))
  }

  if (!playlist && ['pending', 'idle'].includes(fetchingPlaylistStatus)) {
    console.log("A")
    return (
      <div>
        Cargando
      </div>
    )
  }

  if (!playlist && fetchingPlaylistStatus === 'fulfilled') {
    console.log("B")
    return (
      <div>
        404
      </div>
    )
  }

  return(
    <div>
      {
        playlist.spotify_songs.map((data, id) => {
            return(
              <div>
                {data.title}
                <br />
              </div>
            )
        })
      }
    </div>
  )
}

export default PlaylistShowView
