import Button from 'react-bootstrap/Button';

const SpotifyLoginButton = () => {
  const state = '34fFs29kd09';
  const scopes = ['user-read-email', 'playlist-read-private', 'playlist-read-collaborative', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing']
  const loginURI = "https://accounts.spotify.com/authorize?" +
  "response_type=code&" +
  "client_id=9d48abfbbf194adc9051e1b82b0ecdb0&" +
  `scope=${scopes.join("%20")}&` +
  "redirect_uri=http://localhost:3001/spotify_login&" +
  `state=${state}`

  return (
    <Button 
    href={loginURI}
    target="_blank"
  >
    Login Spotify
  </Button>
  );
}

export default SpotifyLoginButton;