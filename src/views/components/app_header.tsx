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
   <Container fluid className={props.className} style={{height: "8rem", backgroundColor: "#0B2355", ...props.style}} >
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
