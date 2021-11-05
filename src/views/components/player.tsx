import Faker from 'faker'
import Image from 'react-bootstrap/Image'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { useSelector, useDispatch } from 'react-redux'
import { incrementPoolSize, decrementPoolSize } from '../../features/slices/current_playlist_slice'
import { RootState } from '../../features/root_reducer'
import SpotifyLoginButton from './spotify_login_button'

const Player = () => {
  const image = Faker.image.imageUrl;
  const candidatePoolSize = useSelector((state: RootState) => state.currentPlaylist.candidatePoolSize)
  const dispatch = useDispatch();

  return(
    <div className="player">
      <Image src={image()} alt={"asdfg"} rounded fluid/>
      <ButtonGroup className="d-flex" > 
        <Button variant="secondary">{"\u23EA"}</Button>
        <Button variant="secondary">{"\u23EF"}</Button>
        <Button variant="secondary">{"\u23E9"}</Button>
      </ButtonGroup>

      <Container className="bg-secondary mt-4 pt-2 rounded">
        <Row className="justify-content-md-center">Candidate songs: {candidatePoolSize}</Row>
        <ButtonGroup className="d-flex pb-4 pt-1">
          <Button variant="info" onClick={() => dispatch(decrementPoolSize())}>-</Button>
          <Button variant="info" onClick={() => dispatch(incrementPoolSize())}>+</Button>
        </ButtonGroup>
      </Container>

      <SpotifyLoginButton />
    </div>
    )
}

export default Player;
