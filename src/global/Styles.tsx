import React, { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import '../global/styles.css'

export default function Styles({
  children
}: {
  children: ReactNode
}): ReactElement {
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  )
}
