import Container from 'react-bootstrap/Container'

type BackgroundContainerProps = {
  backgroundColor?: string,
  children: React.ReactNode,
}

const BackgroundContainer = (props: BackgroundContainerProps) => {
  const backgroundColor = props.backgroundColor || "#E953C9"
  return(
    <Container 
      className="d-flex flex-column"
      style={{background: backgroundColor, height: "100vh", overflowY:"hidden", alignItems: "flex-start"}}
      fluid
    >
      {props.children}
      </Container>
  )
}

export default BackgroundContainer;
