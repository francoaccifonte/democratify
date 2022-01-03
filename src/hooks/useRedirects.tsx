import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../features/root_reducer'

const useRedirects = () => {
  const history = useHistory()

  const { status, spotifyUsers, id } = useSelector((state: RootState) => state.account)

  const redirectBySpotifyUser = () => {
    if (status === 'fulfilled' && spotifyUsers?.length === 0) {
      history.push('/register_users')
    }
  }

  const userIsLoggedIn = () => {
    return (id !== undefined && status === 'fulfilled')
  }

  const redirectHomeIfNotLoggedIn = () => {
    if (userIsLoggedIn()) { history.push('/') }
  }

  const redirectToPlaylistsIfLogedIn = () => {
    if (!userIsLoggedIn()) { history.push('/playlists') }
  }

  const redirectToLoginIfNotLoggedIn = () => {
    if (!userIsLoggedIn()) { history.push('/login') }
  }

  return {
    userIsLoggedIn,
    redirectBySpotifyUser,
    redirectToPlaylistsIfLogedIn,
    redirectHomeIfNotLoggedIn,
    redirectToLoginIfNotLoggedIn
  }
}

export default useRedirects
