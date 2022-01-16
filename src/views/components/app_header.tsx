import React from 'react'
import withStyles from 'react-jss'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ColorProps } from '../../color_palette'
import useRedirects from '../../hooks/useRedirects'
import Text from './text'
import UserSetupDropdown from './user_setup_dropdown'
import { RootState } from '../../features/root_reducer'

export const useAppHeaderUtils = () => {
  const { userIsLoggedIn } = useRedirects()
  return {
    readyToShow: () => {
      const fetchState = useSelector((state: RootState) => state.account.status)
      if (fetchState === 'fulfilled') { return true }
      if (fetchState === 'idle' && !userIsLoggedIn()) { return true }
      return true
    }
  }
}

type HeaderProps = {
  palette: ColorProps['palette']
  isMobile?: boolean;
  public?: boolean;
  className?: string;
  style?: React.CSSProperties;
  classes: any;
  type?: boolean | 'landing' | 'default';
}

const AppHeader = (props: HeaderProps) => {
  const history = useHistory()
  const { userIsLoggedIn } = useRedirects()

  const LogInButtons = () => {
    if (!userIsLoggedIn()) {
      return (
        <>
          <Text type="link" color="White" onClick={() => history.push('/login')} className="pe-5">Entrar</Text>
          <Text type="link" color="White" onClick={() => history.push('/signup')}>Registrarse</Text>
        </>
      )
    } else {
      return (
        <Text type="link" color="White" onClick={() => history.push('/playlists')}>Playlists</Text>
      )
    }
  }

  const RightCluster = ({ type }: { type: HeaderProps['type'] }) => {
    if (type === true || type === 'default') {
      if (userIsLoggedIn()) { return <UserSetupDropdown /> }
    }
    if (type === 'landing') { return <LogInButtons /> }

    return <></>
  }

  return (
    <div className={props.classes.container}>
      <div className={props.classes.brand}>
        <Logo className={props.classes.logo} onClick={() => history.push('/')}/>
        <Text type="header" color="white">Rokolify</Text>
      </div>
      <div className={props.classes.leftCluster}>
        <RightCluster type={props.type} />
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
    brand: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo: {
      height: '4rem',
      width: '4rem',
      composes: 'm-3',
      '&:hover': {
        cursor: 'pointer'
      }
    }
  }
}
export default withStyles(styles)(AppHeader)
