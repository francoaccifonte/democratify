import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { List } from './index'
import { fetchPlaylists } from '../../features/slices/playlists_slice'
import { RootState } from '../../features/root_reducer'
import SpotifyLoginButton from '../components/spotify_login_button'
import PlayerFooter from "../components/player_footer";

const PlaylistSelectionView = () => {
  const playlists = useSelector((state: RootState) => state.playlists)
  const account = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch()
  let history = useHistory();

  if (!account.id) {
    history.push('/')
  }
  
  useEffect(() => {
    if (!account.token) { return }
    dispatch(fetchPlaylists({}))
  }, [account.token, dispatch]);

  return(
    <>
      <SpotifyLoginButton />
      <List playlists={playlists.playlists} history={history}/>
      <PlayerFooter history={history}/>
    </>
  );
};  

export default PlaylistSelectionView;
