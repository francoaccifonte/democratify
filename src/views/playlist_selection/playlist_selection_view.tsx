import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { fetchPlaylists } from '../../features/slices/playlists_slice'
import { RootState } from '../../features/root_reducer'

import { List } from './index'

import SpotifyLoginButton from '../components/spotify_login_button'


const PlaylistSelectionView = () => {
  const playlists = useSelector((state: RootState) => state.playlists)
  const account = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch()
  let history = useHistory();
  
  useEffect(() => {
    if (!account.token) { return }
    dispatch(fetchPlaylists({}))
  }, [account.token, dispatch]);

  return(
    <>
      <SpotifyLoginButton />
      <List playlists={playlists.playlists} history={history}/>
    </>
  );
};  

export default PlaylistSelectionView;
