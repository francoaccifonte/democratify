import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router'
import withStyles from 'react-jss'

import { useOngoingPlaylist, useVotation } from '../../hooks'
import Text from './text'

type PlayerFooterProps = {
  className?: string,
  style?: React.CSSProperties,
  classes: any
}

const PlayerFooter = (props: PlayerFooterProps) => {
  const { ongoingPlaylist } = useOngoingPlaylist()
  const { votationState } = useVotation()
  const history = useHistory()
  const redirect = () => history.push('/playlists/ongoing')

  if (!ongoingPlaylist) {
    return (null)
  }

  if (ongoingPlaylist.status === 'fulfilled' && ongoingPlaylist.id) {
    return (
      <div className={props.classes.container + ' ' + (props?.className || '')} onClick={redirect}>
        <div className={props.classes.playButton}>
          <FontAwesomeIcon icon={faPlay} color="white"/>
        </div>
        <div className={props.classes.listeningContainer}>
          <div className={props.classes.listeningLabel}>
            <Text type="bodyRegular">Estas escuchando:</Text>
          </div>
          <div className={props.classes.listeningNames}>
            <div><Text type="bodyRegular">{ongoingPlaylist?.playingSong?.title}</Text></div>
            <div><Text type="bodyRegular">{ongoingPlaylist?.playingSong?.artist}</Text></div>
          </div>
        </div>
        <div className={props.classes.nextSongCircle}>
        <Text type="bodyRegular">Proxima cancion:</Text>
        </div>
        <div className={props.classes.votation}>
          <Text type="bodyRegular">{votationState.currentWinner?.spotify_song?.title}</Text>
        </div>
      </div>
    )
  }

  return (
    null
  )
}

const styles = (theme: any) => {
  return {
    container: {
      backgroundColor: theme.Muted,
      width: '100%',
      height: '8rem',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    playButton: {
      backgroundColor: theme.Primary,
      width: '15%',
      color: theme.White,
      fontSize: '5rem',
      textAlign: 'center'
    },
    listeningContainer: {
      backgroundColor: theme.Primary,
      height: '100%',
      width: '40%',
      color: theme.White,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    listeningLabel: {
      composes: 'me-5'
    },
    listeningNames: {
      display: 'flex',
      flexDirection: 'column'
    },
    nextSongCircle: {
      display: 'flex',
      alignItems: 'center',
      borderRadius: '0 8rem 8rem 0',
      color: theme.White,
      width: '10%',
      height: '100%',
      backgroundColor: theme.Primary
    },
    votation: {
      width: '35%',
      display: 'flex',
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems: 'center',
      color: theme.White,
      composes: 'ps-3'
    }
  }
}

export default withStyles(styles)(PlayerFooter)
