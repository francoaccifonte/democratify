import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../features/root_reducer'
import { fetchPlaylist } from '../features/slices/playlist_data_slice'

export const usePlaylist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state: RootState) => state.playlistData.playlists);
  const fetchingPlaylistStatus = useSelector((state: RootState) => state.playlistData.status);

  const fetchPlaylistData = (id: number) => {
    if (fetchingPlaylistStatus !== 'pending') {
      dispatch(fetchPlaylist({id: id}));
    }
  }
  const playlistData = (id: number) => playlists[id];

  return {
    fetchPlaylistData,
    playlistData,
    fetchingPlaylistStatus,
  };
}
