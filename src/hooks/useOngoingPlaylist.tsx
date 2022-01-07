import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../features/root_reducer'
import { startOngoingPlaylist, fetchOngoingPlaylist } from '../features/slices/current_playlist_slice'
import { useEffect } from 'react'

const useOngoingPlaylist = () => {
  const dispatch = useDispatch()
  const startPlaylist = (playlistId: number, songId?: number) => dispatch(startOngoingPlaylist({ playlistId, songId }))

  let ongoingPlaylist = useSelector((state: RootState) => state.currentPlaylist)

  if (!ongoingPlaylist.id && ongoingPlaylist.status === 'idle') {
    dispatch(fetchOngoingPlaylist({}))
  }

  ongoingPlaylist = useSelector((state: RootState) => state.currentPlaylist)

  const reloadOngoingPlaylist = () => {
    dispatch(fetchOngoingPlaylist({}))
  }

  return {
    ongoingPlaylist,
    reloadOngoingPlaylist,
    startPlaylist
  }
}

export default useOngoingPlaylist
