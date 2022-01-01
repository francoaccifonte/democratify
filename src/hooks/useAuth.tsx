import { useContext, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { authenticate } from '../features/slices/account_slice'
import { RootState } from '../features/root_reducer'

type ContextProps = {
  token: string | undefined;
  loggedIn: boolean;
}

const authContext = createContext({ token: 'initialTokenState', loggedIn: false } as ContextProps)

export const useProvideAuth = () => {
  const dispatch = useDispatch()
  const { id, token, tokenExpiration } = useSelector((state: RootState) => state.account)
  const localStorageToken = localStorage.getItem('account_token')
  let loggedIn: boolean

  if ((token && !id) && (token !== 'initialTokenState')) {
    dispatch(authenticate({ token: token }))
    loggedIn = true
  } else if (!token && localStorageToken) {
    dispatch(authenticate({ token: localStorageToken }))
    loggedIn = true
  } else {
    loggedIn = false
  }

  return {
    token,
    loggedIn
  }
}

type ProvideAuthProps = { children: any };

export const ProvideAuth = (props: ProvideAuthProps) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{props.children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}
