import React from 'react'
import Container from 'react-bootstrap/Container'

import BackgroundContainer from './background_container'
import AppHeader from './app_header'
import PlayerFooter from './player_footer'
import { LandingFooter } from './'
import { ColorProps } from '../../color_palette'

type SkeletonProps = {
  header?: boolean | 'landing' | 'default';
  footer?: boolean | 'landing' | 'default';
  flexDirectionColumn?: boolean;
  overflowY?: 'scroll' | 'hidden';
  palette: ColorProps['palette'];
  children: React.ReactNode;
};

const AddHeader = (props: { header?: SkeletonProps['header'], palette: ColorProps['palette'] }) => {
  if (props.header) return <AppHeader palette={props.palette} type={props.header}/>
  return <></>
}

const AddFooter = (props: { footer?: SkeletonProps['footer'] }) => {
  if (props.footer === true || props.footer === 'default') {
    return <PlayerFooter className="mt-auto" style={{ alignSelf: 'flex-end' }} />
  } else if (props.footer === 'landing') {
    return <LandingFooter className="mt-auto" style={{ alignSelf: 'flex-end' }} />
  }

  return <></>
}

const FullHeightSkeleton = (props: SkeletonProps) => {
  const overflowY = props.overflowY ? props.overflowY : 'scroll'
  const classNames = props.flexDirectionColumn ? 'd-flex align-self-start flex-column' : 'd-flex align-self-start flex-row'

  return (
    <BackgroundContainer backgroundColor={{ palette: props.palette }}>
      <AddHeader header={props.header} palette={props.palette}/>
      <Container className={classNames} style={{ overflowY: overflowY }}>
        {props.children}
      </Container>
      <AddFooter footer={props.footer}/>
    </BackgroundContainer>
  )
}

export default FullHeightSkeleton
