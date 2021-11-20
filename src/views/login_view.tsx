import { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

import { authenticate } from '../features/slices/account_slice'
import { RootState } from '../features/root_reducer'

const LoginView = () => {
  const dispatch = useDispatch()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const accountId = useSelector((state: RootState) => state.account.id)

  let history = useHistory();
  useEffect(() => {
    if (accountId) {
      history.push('/playlists');
    }
  }, [accountId])


  const handleLogIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(authenticate({email: email, password: password}))
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.getAttribute('id');
    const value = event.target.value;
    if (id === 'emailLogin') {
      setEmail(value)
    } else if (id === 'passwordLogin') {
      setPassword(value)
    }
  };

  const logInComponent = () => {
    return(
      <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col className="center" sm={4}>
            <Form onSubmit={handleLogIn}>

              <Form.Group controlId="emailLogin">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="fafa" type="emailf" placeholder="Enter email" onChange={handleChange}/>
              </Form.Group>

              <Form.Group controlId="passwordLogin">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      </>
    )
  };

  const success = () => {
    return(
      <div>
        Log in successful! go to /playlists
      </div>
    )
  };

  if (accountId === undefined) {
    return logInComponent()
  } else {
    return success()
  }
}

export default LoginView;
