import React from 'react'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withStyles from 'react-jss'

import Text from './text'

type YoutubeLoginButtonProps = {
  classes: any
}

const YoutubeLoginButton = (props: YoutubeLoginButtonProps) => {
  const { classes } = props

  return (
    <>
      <Button
        variant="link"
        target="_blank"
        disabled
        >
        <FontAwesomeIcon icon={['fab', 'youtube']} className={classes.icon}/>
      </Button>
      <Text type="bodyRegular" color="White" >Proximamente</Text>
    </>
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

export default withStyles(styles)(YoutubeLoginButton)
