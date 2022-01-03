import React from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withStyles from 'react-jss'

import { RootState } from '../../features/root_reducer'
import Text from './text'

type SpotifyLoginButtonProps = {
  classes: any
}

const SpotifyLoginButton = (props: SpotifyLoginButtonProps) => {
  const { classes } = props
  const account = useSelector((state: RootState) => state.account)
  const state = account.id
  const scopes = ['user-read-email', 'playlist-read-private', 'playlist-read-collaborative', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing']
  const loginURI = 'https://accounts.spotify.com/authorize?' +
  'response_type=code&' +
  'client_id=9d48abfbbf194adc9051e1b82b0ecdb0&' +
  `scope=${scopes.join('%20')}&` +
  'redirect_uri=http://localhost:3001/spotify_login&' +
  `state=${state
  }`

  const { status, spotifyUsers } = useSelector((state: RootState) => state.account)
  const alreadyLinked = (status === 'fulfilled' && spotifyUsers?.length !== 0)

  const DisabledMessage = () => {
    if (alreadyLinked) {
      return (
        <>
          <br />
          <Text type="bodyRegular" color="White">Spotify ya fue vinculado</Text>
        </>
      )
    }
    return <></>
  }

  return (
    <Button
    variant="link"
    href={loginURI}
    target="_blank"
    disabled={alreadyLinked}
  >
    <FontAwesomeIcon icon={['fab', 'spotify']} className={classes.icon}/>
    <DisabledMessage />
  </Button>
  )
}

const styles = (theme: any) => {
  return {
    icon: {
      color: theme.White,
      fontSize: '200px'
    }
  }
}

export default withStyles(styles)(SpotifyLoginButton)
