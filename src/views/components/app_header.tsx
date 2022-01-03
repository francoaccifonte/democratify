import React from 'react'
import withStyles from 'react-jss'
import { useHistory } from 'react-router'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ColorProps } from '../../color_palette'
import useRedirects from '../../hooks/useRedirects'
import Text from './text'
import UserSetupDropdown from './user_setup_dropdown'

type HeaderProps = {
  palette: ColorProps['palette']
  isMobile?: boolean;
  public?: boolean;
  className?: string;
  style?: React.CSSProperties;
  classes: any
}

const AppHeader = (props: HeaderProps) => {
  const history = useHistory()
  const { userIsLoggedIn } = useRedirects()
  console.log(userIsLoggedIn())

  return (
    <div className={props.classes.container}>
      <div >
        <Logo className={props.classes.logo} onClick={() => history.push('/')}/>
        <Text type="header" color="white">Rokolify</Text>
      </div>
      <div className={props.classes.leftCluster}>
        {userIsLoggedIn() && <UserSetupDropdown />}
      </div>
    </div>
  )
}

const styles = (theme: any) => {
  return {
    container: {
      width: '100%',
      backgroundColor: theme.Primary,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    leftCluster: {
      display: 'flex',
      alignItems: 'center',
      composes: 'pe-5',
      color: theme.White,
      '&:hover': {
        cursor: 'pointer'
      }
    },
    userMenu: {
      fontSize: '4rem',
      composes: 'pe-4'
    },
    logo: {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  }
}
export default withStyles(styles)(AppHeader)
