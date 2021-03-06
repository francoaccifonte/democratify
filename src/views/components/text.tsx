import React from 'react'

type TextProps = {
  type: string;
  color?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Text = (props: TextProps) => {
  const headerStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '2.5rem',
    lineHeight: '3.75rem'
  }
  const titleStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: '1.5rem'
  }
  const bodyRegularStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '1.125rem',
    lineHeight: '1.75rem'
  }
  const bodyImportantStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '1.5rem',
    lineHeight: '2.25rem'
  }
  const bodyCaptionStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '0.75rem',
    lineHeight: '1.125rem'
  }
  const linkStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    cursor: 'pointer',
    '&:hover': {
      cursor: 'pointer'
    }
  }
  let style: any

  switch (props.type) {
    case 'header':
      style = headerStyle
      break
    case 'title':
      style = titleStyle
      break
    case 'bodyRegular':
      style = bodyRegularStyle
      break
    case 'bodyImportant':
      style = bodyImportantStyle
      break
    case 'bodyCaption':
      style = bodyCaptionStyle
      break
    case 'link':
      style = linkStyle
      break
  }
  style.color = props.color

  return <span className ={props.className} style={style} onClick={props.onClick}>{props.children}</span>
}

export default Text
