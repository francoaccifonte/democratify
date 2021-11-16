import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import OngoingPlaylistView from './views/ongoing_playlist/ongoing_playlist_view';
import LoginView from './views/login_view';
import PlaylistSelectionView from './views/playlist_selection/playlist_selection_view';

import { RootState } from './features/root_reducer'
import { useSelector } from 'react-redux';

function App() {
  const token =  useSelector((state: RootState) => state.account.token);
  const loggedIn = ():boolean => {
    return !!token;
  }

  // TODO: no idea how to type this
  const redirectIfNotLoggedIn = (path: string, View: any) => {
    return(
      <Route exact path={path}>
        {loggedIn() ? <View /> : <Redirect to="/"/>}
      </Route>
    )
  }

  return(
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn() ? <Redirect to="/playlists"/> : <LoginView />}
        </Route>
        {redirectIfNotLoggedIn('/playlists', PlaylistSelectionView)}
        {/* {redirectIfNotLoggedIn("/playlists/:id", PlaylistView)} */}
        <Route exact path="/playlists/ongoing" component={OngoingPlaylistView} />
      </Switch>
    </Router>
  )
}

export default App;
