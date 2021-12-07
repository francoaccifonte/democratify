
type TextProps = {
  type: string;
  color: string;
  children: React.ReactNode;
}

const Text = (props: TextProps) => {
  const headerStyle = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "2.5rem",
    lineHeight: "3.75rem",
  }
  const bodyRegularStyle = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
  }
  var style: any;

  switch(props.type) {
    case "header":
      style = headerStyle;
      break;
    case "bodyRegular":
      style = bodyRegularStyle;
      break;
  }
  style.color = props.color;

  return <span style={style}>{props.children}</span>

}

export default Text;