import { useSelector, useDispatch } from 'react-redux'

import { authenticate, signUp } from '../features/slices/account_slice'
import { RootState } from '../features/root_reducer'
import client from '../backend/models/'

const useAuth = () => {
  // Handle token from local storage into redux state and backend client
  let { token, id } = useSelector((state: RootState) => state.account)
  const signUpState = useSelector((state: RootState) => state.account.accountCreationStatus)
  const dispatch = useDispatch()

  if (!client.token) {
    if (!token) {
      token = localStorage.getItem('account_token') || undefined
    }
    if (token) {
      client.setToken(token)
    }
  }
  const loggedIn = !!token

  if (loggedIn && !id) {
    dispatch(authenticate({ token: token }))
  }

  // Create new account
  const signUpAction = (signUpData: { email: string, password: string, name: string }) => {
    dispatch(signUp(signUpData))
  }

  return {
    signUp: signUpAction,
    signUpState
  }
}

export default useAuth
