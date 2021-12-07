import BackgroundContainer from "./components/background_container";
import AppHeader from "./components/app_header";
import PlayerFooter from "./components/player_footer";
import Container from "react-bootstrap/Container";

import { ColorProps } from '../color_palette'

type SkeletonProps = {
  header?: boolean;
  footer?: boolean;
  backgroundColor: ColorProps;
  children: React.ReactNode;
};

const FullHeightSkeleton = (props: SkeletonProps) => {
  return (
    <BackgroundContainer backgroundColor={props.backgroundColor}>
      <AppHeader className=""/>
      <Container className="d-flex align-self-start" style={{overflowY: "auto", alignSelf: "flex-end"}}>
        {props.children}
      </Container>
      <PlayerFooter className="mt-auto" style={{alignSelf: "flex-end"}} />
    </BackgroundContainer>
  );
}

export default FullHeightSkeleton;
