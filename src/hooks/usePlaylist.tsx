import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../features/root_reducer'
import { fetchPlaylist } from '../features/slices/playlist_data_slice'
import { useEffect } from 'react'

const usePlaylist = (id: number) => {
  const dispatch = useDispatch()
  let playlist = useSelector((state: RootState) => state.playlistData.playlists[id])
  const requestStatus = useSelector((state: RootState) => state.playlistData.status)

  useEffect(() => {
    if (!playlist) {
      dispatch(fetchPlaylist({ id: id }))
    }
  }, [id, dispatch, playlist])

  playlist = useSelector((state: RootState) => state.playlistData.playlists[id])

  return {
    playlist,
    requestStatus
  }
}

export default usePlaylist
