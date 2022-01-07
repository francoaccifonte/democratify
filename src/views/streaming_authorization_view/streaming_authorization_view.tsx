import React from 'react'
import withStyles from 'react-jss'

import FullHeightSkeleton from '../full_height_skeleton'
import StreamingCard from './streaming_card'

type StreamingAuthorizationViewProps = {
  classes: any
}
const StreamingAuthorizationView = (props: StreamingAuthorizationViewProps) => {
  const { classes } = props
  return (
    <FullHeightSkeleton header palette='admin' overflowY="hidden">
      <div className={classes.container}>
        <StreamingCard service="Spotify"/>
        <StreamingCard service="Youtube"/>
      </div>
    </FullHeightSkeleton>
  )
}

const styles = (theme: any) => {
  return {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      composes: 'mt-5'
    }
  }
}
export default withStyles(styles)(StreamingAuthorizationView)
