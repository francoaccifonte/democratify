
type Text2Props = {
  type: string;
  color: string;
  children: React.ReactNode;
}

const Text = (props: Text2Props) => {
  const headerStyle = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "40px",
    lineHeight: "60px",
  }
  var style: any;

  switch(props.type) {
    case "header":
      style = headerStyle;
      break;
  }
  style.color = props.color;

  return <span style={style}>{props.children}</span>

}

export default Text;