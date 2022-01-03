import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import withStyles from 'react-jss'

import { authenticate } from '../features/slices/account_slice'
import { RootState } from '../features/root_reducer'
import useAuth from '../hooks/useAuth'
import Text from './components/text'
import LoadingSpinner from './components/loading_spinner'
import FullHeightSkeleton from './full_height_skeleton'

const styles = (theme: any) => {
  return {
    container: {
      marginTop: '3.5rem',
      width: '380px'
    },
    card: {
      backgroundColor: theme.Muted,
      padding: '28px',
      borderRadius: '6px'
    },
    messageContainer: {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    },
    formInput: {
      backgroundColor: theme.Muted,
      border: 'none',
      borderBottom: '1px solid white',
      color: theme.White,
      fontFamily: 'Poppins',
      fontWeight: '400',
      width: '100%',
      '&:focus': {
        outline: 'none',
        borderBottom: `1px solid ${theme.Primary}`,
        color: theme.Primary
      }
    },
    formInputDanger: {
      composes: '$formInput',
      color: theme.Danger,
      '&:focus': {
        color: theme.Danger
      }
    },
    submitButton: {
      backgroundColor: theme.Info,
      borderRadius: '12px',
      border: 'none',
      composes: 'px-5 mt-3'
    }
  }
}

type LogInViewProps = { classes: any };
const LoginView = (props: LogInViewProps) => {
  const { logInState } = useAuth()
  const classes = props.classes
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const accountId = useSelector((state: RootState) => state.account.id)

  const history = useHistory()
  useEffect(() => {
    if (accountId) {
      history.push('/playlists')
    }
  }, [accountId, history])

  const handleLogIn = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault()
    dispatch(authenticate({ email: email, password: password }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.getAttribute('id')
    const value = event.target.value
    if (id === 'email') {
      setEmail(value)
    } else if (id === 'password') {
      setPassword(value)
    }
  }

  const isDataValid = () => {
    return true
  }

  const ErrorMessage = () => {
    if (logInState === 'rejected') return (<Text type="title" color="Danger">Usuario o contraseña incorrectos</Text>)
    return null
  }

  return (
    <FullHeightSkeleton header palette='admin' overflowY="hidden">
      <Container className={classes.container}>
        <Card className={classes.card}>
          <Card.Body className="text-left">
            <form>
              <input type="email" value={email} onChange={handleChange} className={classes.formInput} spellCheck="false" id="email"/>
              <br />
              <Text type="bodyCaption" color="White">
                EMAIL
              </Text>
              <input type="password" value={password} onChange={handleChange} className={classes.formInput} id="password"/>
              <br />
              <Text type="bodyCaption" color="White">
                CONTRASEÑA
              </Text>
            </form>

            <div className={classes.messageContainer}>
              <ErrorMessage />
              <Button className={classes.submitButton} onClick={handleLogIn} disabled={!isDataValid() && logInState !== 'pending'}>
                { logInState !== 'pending' && <Text type="title" color="Black">Enviar</Text>}
                { logInState === 'pending' && <LoadingSpinner />}
              </Button>
            </div>
            <Text type="bodyRegular" color="White">No tenés cuenta? </Text>
            <Text type="link" color="White" onClick={() => history.push('/signup')}>Registrate</Text>
          </Card.Body>
        </Card>
      </Container>
    </FullHeightSkeleton>
  )
}

export default withStyles(styles)(LoginView)
