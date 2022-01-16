import React from 'react'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withStyles from 'react-jss'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector } from 'react-redux'

import { openQrOnNewWindow } from './qr'
import { RootState } from '../../features/root_reducer'

type UserSetupDropdownProps = {
  classes: any
}

const UserSetupDropdown = (props: UserSetupDropdownProps) => {
  const { classes } = props
  const history = useHistory()

  const handleLogout = () => {
    localStorage.removeItem('account_token')
    history.push('/')
  }
  const accountId = useSelector((state: RootState) => state.account.id)

  type FarafaProps = { children: any, onClick: any }
  const Farafa = React.forwardRef((props: FarafaProps, ref: any) => (
    <a
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        props.onClick(e)
      }}
    >
      <div className={classes.userMenuContainer}>
        <div className={classes.userMenu}><FontAwesomeIcon icon={['fas', 'user-circle']} /></div>
        <FontAwesomeIcon icon={['fas', 'sort-down']} />
      </div>
      {props.children}
    </a>
  ))
  Farafa.displayName = 'Farafa'

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="none" id="dropdown-basic" as={Farafa}>
          {/* <div className={props.classes.userMenu}><FontAwesomeIcon icon={['fas', 'user-circle']} /></div> */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => history.push('/register_users')}>Configuracion de Streaming</Dropdown.Item>
          <Dropdown.Item onClick={() => history.push('/playlists')}>Mis Playlists</Dropdown.Item>
          <Dropdown.Item onClick={() => history.push('/playlists/ongoing')}>Reproduccion Activa</Dropdown.Item>
          <Dropdown.Item onClick={() => openQrOnNewWindow(accountId)}>QR Votacion</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Salir</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

const styles = (theme: any) => {
  return {
    userMenuContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    userMenu: {
      color: theme.White,
      fontSize: '3rem',
      composes: 'pe-4'
    }
  }
}

export default withStyles(styles)(UserSetupDropdown)
