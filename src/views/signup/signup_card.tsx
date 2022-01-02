import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import withStyles from 'react-jss'
import { useHistory } from 'react-router-dom'

import Text from '../components/text'

const styles = (theme: any) => {
  return {
    container: {
      width: '380px'
    },
    card: {
      backgroundColor: theme.Muted,
      padding: '28px',
      borderRadius: '6px'
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
      color: theme.Danger
    },
    submitButton: {
      backgroundColor: theme.Info,
      borderRadius: '12px',
      border: 'none',
      composes: 'px-5'
    }
  }
}

type SignupCardProps = { classes: any };

const SignupCard = (props: SignupCardProps) => {
  const { classes } = props
  const history = useHistory()

  const [validPassword, setValidPassword] = useState(true)

  const [userValue, setUserValue] = useState('')
  const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setUserValue(event.target.value)
  }

  const [passwordValue, setPasswordValue] = useState('')
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPasswordValue(event.target.value)
  }

  const [repeatPasswordValue, setRepeatPasswordValue] = useState('')
  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setRepeatPasswordValue(event.target.value)
    if (passwordValue !== event.target.value) {
      setValidPassword(false)
    } else {
      setValidPassword(true)
    }
  }

  const [emailValue, setEmailValue] = useState('')
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setEmailValue(event.target.value)
  }

  const handleSubmit = () => {

  }

  return (
    <Container className={classes.container}>
        <Card className={classes.card}>
          <Card.Body className="text-left">
          <form>
            <input type="text" value={userValue} onChange={handleUserChange} className={classes.formInput} spellCheck="false"/>
            <br />
            <Text type="bodyCaption" color="White">
              USUARIO
            </Text>
            <input type="password" value={passwordValue} onChange={handlePasswordChange} className={validPassword ? classes.formInput : classes.formInputDanger}/>
            <br />
            <Text type="bodyCaption" color="White">
              CONTRASEÑA
            </Text>
            <input type="password" value={repeatPasswordValue} onChange={handleRepeatPasswordChange} className={validPassword ? classes.formInput : classes.formInputDanger}/>
            <br />
            <Text type="bodyCaption" color="White">
              CONFIRMAR CONTRASEÑA
            </Text>
            <input type="email" value={emailValue} onChange={handleEmailChange} className={classes.formInput} spellCheck="false"/>
            <br />
            <Text type="bodyCaption" color="White">
              CORREO ELECTRÓNICO
            </Text>
          </form>
          </Card.Body>
          <Card.Body className="text-center">
            <Button className={classes.submitButton} onClick={handleSubmit}>
              <Text type="title" color="Black">Enviar</Text>
            </Button>
            <br />
            <Text type="bodyRegular" color="White">Ya tenes cuenta? </Text>
            <Text type="link" color="White" onClick={() => history.push('/login')}>Entrar</Text>
          </Card.Body>
        </Card>
    </Container>
  )
}

export default withStyles(styles)(SignupCard)
