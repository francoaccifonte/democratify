import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import Text from './text';

type HeaderProps = {
  isMobile?: boolean;
  public?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const AppHeader = (props: HeaderProps) => {
 return(
   <Container className={props.className} style={props.style}>
     <Row>
       <Col xs={3}>
        <Logo />
          <Text type="header" color="white">Rokolify</Text>
      </Col >
     </Row>
  </Container>
 )
};

export default AppHeader;
