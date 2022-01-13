import React from 'react'

import { FullHeightSkeleton } from '../components'
import { SignupCard, SignupSuccessCard } from '.'
import useAuth from '../../hooks/useAuth'

const SignupView = () => {
  const { signUpState } = useAuth()

  const Content = () => {
    switch (signUpState) {
      case 'idle':
      case 'pending':
        return <SignupCard />
      case 'fulfilled':
        return <SignupSuccessCard />
      case 'rejected':
        return <></>
        // TODO: Show error message
      default:
        return <></>
    }
  }
  return (
    <FullHeightSkeleton header palette='admin' overflowY="hidden">
      <div className="mt-5 d-flex flex-row justify-content-center w-100">
        <div >
          <Content />
        </div>
      </div>
    </FullHeightSkeleton>
  )
}

export default SignupView
