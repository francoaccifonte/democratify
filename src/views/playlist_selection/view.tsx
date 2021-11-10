import CSS from 'csstype';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchPlaylists } from '../../features/slices/playlists_slice'
import { RootState } from '../../features/root_reducer'

import { List } from './index'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SpotifyLoginButton from '../components/spotify_login_button'


const PlaylistSelectionView = () => {
  const playlists = useSelector((state: RootState) => state.playlists)
  const account = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!account.token) { return }
    dispatch(fetchPlaylists({}))
  }, [account.token, dispatch]);

  const containerStyle: CSS.Properties = {
    height: "100vh"
  }

  return(
    <Container >
      <SpotifyLoginButton />
      <List playlists={playlists.playlists}/>
    </Container>
  );
};  

export default PlaylistSelectionView;
