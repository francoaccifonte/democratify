import BackgroundContainer from "./components/background_container";
import AppHeader from "./components/app_header";
import PlayerFooter from "./components/player_footer";
import Container from "react-bootstrap/Container";

import { ColorProps } from '../color_palette'

type SkeletonProps = {
  header?: boolean;
  footer?: boolean;
  flexDirectionColumn?: boolean;
  palette: ColorProps['palette'];
  children: React.ReactNode;
};

const AddHeader = (props: { header?: boolean, palette: ColorProps['palette'] }) => {
  if (props.header) return <AppHeader palette={props.palette}/>
  return null
}

const AddFooter = (props: { footer?: boolean }) => {
  if (props.footer) return <PlayerFooter className="mt-auto" style={{alignSelf: "flex-end"}} />
  return null
}

const FullHeightSkeleton = (props: SkeletonProps) => {
  const classNames = props.flexDirectionColumn ? "d-flex align-self-start flex-column" : "d-flex align-self-start flex-row"

  return (
    <BackgroundContainer backgroundColor={{palette: props.palette}}>
      <AddHeader header={props.header} palette={props.palette}/>
      <Container className={classNames} style={{overflowY: "auto"}}>
        {props.children}
      </Container>
      <AddFooter footer={props.footer}/>
    </BackgroundContainer>
  );
}

export default FullHeightSkeleton;
