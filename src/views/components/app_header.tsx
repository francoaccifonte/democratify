import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { findColor, ColorProps, adminPalette } from '../../color_palette';
import Text from './text';

type HeaderProps = {
  palette: ColorProps["palette"]
  isMobile?: boolean;
  public?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const AppHeader = (props: HeaderProps) => {
  const backgroundColor = findColor({palette: props.palette, color: "Primary"}) || adminPalette.Primary;

 return(
   <Container fluid className={props.className} style={{height: "8rem", flexDirection: 'row', backgroundColor: backgroundColor, ...props.style}} >
     <Row>
       <Col>
        <Logo />
        <Text type="header" color="white">Rokolify</Text>
      </Col >
     </Row>
  </Container>
 )
};

export default AppHeader;
