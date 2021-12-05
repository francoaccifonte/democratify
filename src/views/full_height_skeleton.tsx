import BackgroundContainer from "./components/background_container";
import AppHeader from "./components/app_header";
import PlayerFooter from "./components/player_footer";
import Container from "react-bootstrap/Container";

type SkeletonProps = {
  header?: boolean;
  footer?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
};

const FullHeightSkeleton = (props: SkeletonProps) => {
  return (
    <BackgroundContainer>
      <AppHeader className=""/>
      <Container className="d-flex align-self-start" style={{overflowY: "auto", alignSelf: "flex-end"}}>
        {props.children}
      </Container>
      ()
      <AppHeader className="mt-auto" style={{alignSelf: "flex-end"}} />
    </BackgroundContainer>
  );
}

export default FullHeightSkeleton;
