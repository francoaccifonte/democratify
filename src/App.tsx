import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'react-jss'

import './App.css'
import { adminPalette } from './color_palette'
import useAuth from './hooks/useAuth'

import {
  OngoingPlaylistView,
  LoginView,
  SignupView,
  PlaylistSelectionView,
  PlaylistShowView,
  StreamingAuthorizationView,
  VotationView,
  LandingView
} from './views'

function App () {
  useAuth()
  return (
    <ThemeProvider theme={adminPalette}>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingView} />
          <Route exact path="/login" component={LoginView} />
          <Route exact path="/signup" component={SignupView} />
          <Route exact path="/register_users" component={StreamingAuthorizationView} />
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
