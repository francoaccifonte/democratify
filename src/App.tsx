import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlaylistView from './views/playlist_view';
import LoginView from './views/login_view';
import PlaylistSelectionView from './views/playlist_selection_view';

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route exact path="/playlists" component={PlaylistSelectionView} />
        <Route exact path="/playlists/:id" component={PlaylistView} />
      </Switch>
    </Router>
  )
}

export default App;
