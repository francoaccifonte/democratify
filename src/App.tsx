import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'react-jss'

import './App.css'
import { adminPalette } from './color_palette'
import useAuth from './hooks/useAuth'

import OngoingPlaylistView from './views/ongoing_playlist/ongoing_playlist_view'
import LoginView from './views/login_view'
import SignupView from './views/signup/signup_view'
import PlaylistSelectionView from './views/playlist_selection/playlist_selection_view'
import PlaylistShowView from './views/playlist_show_view/playlist_show_view'
import VotationView from './views/votation/votation_view'

function App () {
  useAuth()
  return (
    <ThemeProvider theme={adminPalette}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginView} />
          <Route exact path="/signup" component={SignupView} />
          <Route exact path="/playlists" component={PlaylistSelectionView} />
          <Route exact path="/playlists/ongoing" component={OngoingPlaylistView} />
          <Route exact path="/playlists/:id" component={PlaylistShowView} />
          <Route exact path="/account/:id/votation" component={VotationView} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
