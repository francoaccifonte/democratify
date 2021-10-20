import Faker from 'faker'
import Image from 'react-bootstrap/Image'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

const Player = () => {
  const image = Faker.image.imageUrl;
  
  return(
    <div className="player">
      <Image src={image()} alt={"asdfg"} rounded fluid/>
      <ButtonGroup className="d-flex" > 
        <Button variant="secondary">{"\u23EA"}</Button>
        <Button variant="secondary">{"\u23EF"}</Button>
        <Button variant="secondary">{"\u23E9"}</Button>
      </ButtonGroup>
    </div>
    )
}

export default Player;
