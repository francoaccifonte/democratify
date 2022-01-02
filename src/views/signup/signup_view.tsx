import React, { useState } from 'react'
import { ThemeProvider } from 'react-jss'

import FullHeightSkeleton from '../full_height_skeleton'
import { SignupCard } from '.'
import { adminPalette } from '../../color_palette'

type SignupForm = {
  user?: string,
  password: string,
  email: string,
} | null
type Steps = '0' | '1'

const SignupView = () => {
  const [formData, setFormData] = useState<SignupForm>()
  const [step, setStep] = useState<Steps>('0')

  const Content = () => {
    switch (step) {
      case '0':
        return <SignupCard />
      case '1':
        return <></>
    }
  }
  return (
    <ThemeProvider theme={adminPalette} >
      <FullHeightSkeleton header palette='admin' overflowY="hidden">
        <div className="mt-5 d-flex flex-row justify-content-center w-100">
          <div >
            <SignupCard />
          </div>
        </div>
      </FullHeightSkeleton>
    </ThemeProvider>
  )
}

export default SignupView
