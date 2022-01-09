import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'react-bootstrap/Image'

import { RootState } from '../../features/root_reducer'

const QR = () => {
  const accountId = useSelector((state: RootState) => state.account.id)
  const uri = `https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=http://rockolify.click/account/${accountId}/votation`
  window.open(uri, '_blank')
  return <Image src={uri} />
}

const openQrOnNewWindow = (accountId?: number) => {
  const uri = `https://chart.googleapis.com/chart?cht=qr&chs=400x400&chl=http://rockolify.click/account/${accountId}/votation`
  window.open(uri, '_blank')
}

export default QR
export { openQrOnNewWindow }
