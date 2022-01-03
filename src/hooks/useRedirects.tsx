import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../features/root_reducer'

const useRedirects = () => {
  const history = useHistory()

  const { status, spotifyUsers } = useSelector((state: RootState) => state.account)

  const redirectBySpotifyUser = () => {
    if (status === 'fulfilled' && spotifyUsers?.length === 0) {
      history.push('/register_users')
    }
  }
  return {
    redirectBySpotifyUser
  }
}

export default useRedirects
