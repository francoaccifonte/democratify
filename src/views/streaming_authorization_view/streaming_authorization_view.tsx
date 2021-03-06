import React from 'react'
import withStyles from 'react-jss'

import { FullHeightSkeleton } from '../components'
import StreamingCard from './streaming_card'
import Text from '../components/text'

type StreamingAuthorizationViewProps = {
  classes: any
}
const StreamingAuthorizationView = (props: StreamingAuthorizationViewProps) => {
  const { classes } = props
  return (
    <FullHeightSkeleton flexDirectionColumn={true} header palette='admin' overflowY="hidden">
      <div className={classes.caption}><Text type="bodyRegular" color="White">Enlaza tu cuenta de Streaming</Text></div>
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
      alignItems: 'flex-start',
      composes: 'mt-5'
    },
    caption: {
      width: '100%',
      textAlign: 'center',
      composes: 'pt-5'
    }
  }
}
export default withStyles(styles)(StreamingAuthorizationView)
