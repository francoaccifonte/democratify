import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PlaylistView from './views/playlist_view';

function App() {
  return(
    <Router>
      <Switch>
        <Route exact path="/playlists/:id" component={PlaylistView} />
      </Switch>
    </Router>
  )
}

export default App;
