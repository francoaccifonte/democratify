import React, { useState } from 'react'
import withStyles from 'react-jss'

import { Loading, FullHeightSkeleton, useAppHeaderUtils } from '../components'
import { VotingBox } from './'

type LandingViewProps = {
  classes: any
}

const LandingView = (props: LandingViewProps) => {
  const [finishedLoading, setFinishedLoading] = useState(false)
  const headerReadyToShow = useAppHeaderUtils().readyToShow()

  if (!finishedLoading && headerReadyToShow) { setFinishedLoading(true) }

  if (finishedLoading) {
    return (
    <FullHeightSkeleton header="landing" footer="landing" palette='admin' overflowY="hidden">
      <div className={props.classes.container}>
        <div>
          <VotingBox />
        </div>
        <div className={props.classes.captionContainer}>
          <div className={props.classes.captionTitle}>Democratiza</div>
          <div className={props.classes.captionTitle}>tu playlist</div>
          <div className={props.classes.captionBody}>Votación del siguiente tema en tiempo real</div>
        </div>
      </div>
    </FullHeightSkeleton>
    )
  } else {
    return <Loading />
  }
}

const styles = (theme: any) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      composes: 'mt-5 ms-5'
    },
    caption: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      composes: 'ms-5'
    },
    captionTitle: {
      composes: '$caption',
      fontSize: '3.75rem',
      color: theme.White
    },
    captionBody: {
      composes: '$caption mt-5',
      fontSize: '1.5rem',
      color: theme.White
    }
  }
}
export default withStyles(styles)(LandingView)
