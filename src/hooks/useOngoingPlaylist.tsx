import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/root_reducer'
import { startOngoingPlaylist, fetchOngoingPlaylist } from '../features/slices/current_playlist_slice'

export const useOngoingPlaylist = () => {
  const dispatch = useDispatch();
  const ongoingPlaylist = useSelector((state: RootState) => state.currentPlaylist);
  const fetchingPlaylistStatus = useSelector((state: RootState) => state.currentPlaylist.status);
  const fetchPlaylist = () => dispatch(fetchOngoingPlaylist({}));
  const startPlaylist = (playlistId: number) => dispatch(startOngoingPlaylist({playlistId}));

  if (!ongoingPlaylist.id && fetchingPlaylistStatus === 'idle') {
    fetchPlaylist();
  }
  return {
    ongoingPlaylist,
    fetchingPlaylistStatus,
    fetchPlaylist,
    startPlaylist,
  };
}
