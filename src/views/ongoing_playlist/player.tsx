import React from 'react'
import { useDispatch } from 'react-redux'
import withStyles from 'react-jss'

import { incrementPoolSize, decrementPoolSize } from '../../features/slices/current_playlist_slice'
import { useOngoingPlaylist } from '../../hooks'
import PlaylistCard from '../playlist_selection/playlist_card'
import { Loading, Text } from '../components'

type PlayerProps = {
  classes: any
}

const Player = (props: PlayerProps) => {
  const { ongoingPlaylist } = useOngoingPlaylist()
  const candidatePoolSize = ongoingPlaylist.candidatePoolSize
  const dispatch = useDispatch()
  const image = ongoingPlaylist?.spotifyPlaylist?.cover_art_url

  const isLoading = ongoingPlaylist.status !== 'fulfilled'

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={props.classes.container}>
      <PlaylistCard
        id={ongoingPlaylist.spotifyPlaylist.id}
        name={ongoingPlaylist.spotifyPlaylist.name}
        url={image}
      />

      <Text type='bodyRegular' color='White'>Canciones por votación</Text>
      <div className={props.classes.poolSizeContainer}>
        <div className={props.classes.poolSizeLeft} onClick={() => dispatch(decrementPoolSize())}>-</div>
        <div className={props.classes.poolSizeLabel}>
          <Text type='bodyRegular' color='Black'>{candidatePoolSize}</Text>
        </div>
        <div className={props.classes.poolSizeRight} onClick={() => dispatch(incrementPoolSize())}>+</div>
      </div>
    </div>
  )
}

const styles = (theme: any) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    poolSizeContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
      height: '2rem',
      composes: 'mt-3'
    },
    poolSizeButton: {
      backgroundColor: theme.Muted,
      borderColor: theme.Muted,
      height: '100%',
      width: '2.35rem',
      color: theme.White,
      '&:hover': {
        cursor: 'pointer'
      }
    },
    poolSizeLeft: {
      composes: '$poolSizeButton',
      borderRadius: '0.75rem 0px 0px 0.75rem'
    },
    poolSizeRight: {
      composes: '$poolSizeButton',
      borderRadius: '0px 0.75rem 0.75rem 0px'
    },
    poolSizeLabel: {
      backgroundColor: theme.Info,
      width: '3.75rem',
      height: '100%'
    }
  }
}

export default withStyles(styles)(Player)
