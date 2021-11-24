import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/root_reducer'
import { startOngoingPlaylist, fetchOngoingPlaylist } from '../features/slices/current_playlist_slice'
import { useEffect } from 'react';

export const useOngoingPlaylist = () => {
  const dispatch = useDispatch();
  const startPlaylist = (playlistId: number) => dispatch(startOngoingPlaylist({playlistId}));

  var ongoingPlaylist = useSelector((state: RootState) => state.currentPlaylist);

  useEffect(() => {
    if (!ongoingPlaylist.id) {
      dispatch(fetchOngoingPlaylist({}))
    }
  }, [dispatch, ongoingPlaylist]);
  

  ongoingPlaylist = useSelector((state: RootState) => state.currentPlaylist);
  return {
    ongoingPlaylist,
    startPlaylist,
  }
}
