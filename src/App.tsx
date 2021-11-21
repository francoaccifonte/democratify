import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { RootState } from './features/root_reducer'
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import OngoingPlaylistView from './views/ongoing_playlist/ongoing_playlist_view';
import LoginView from './views/login_view';
import PlaylistSelectionView from './views/playlist_selection/playlist_selection_view';
import client from './backend/models/'
import { authenticate } from './features/slices/account_slice'

function App() {
  let { token, id } = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch();

  // TODO: Move elsewhere this logic, and remove the useAuth file, or fix it so it goes there.
  if (!client.token) {
    if (!token) {
      token = localStorage.getItem("account_token") || undefined;
    }
    if (token) {
      client.setToken(token);
    }
  }
  const loggedIn = !!token

  if (loggedIn && !id) {
    dispatch(authenticate({token: token}))
  }

  return(
      <Router>
        <Switch>
          <Route exact path="/" component={LoginView} />
          <Route exact path="/playlists" component={PlaylistSelectionView} />
          <Route exact path="/playlists/ongoing" component={OngoingPlaylistView} />
        </Switch>
      </Router>
  )
}

export default App;
