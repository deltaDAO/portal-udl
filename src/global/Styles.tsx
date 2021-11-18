import React, { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/500.css'
import '@fontsource/open-sans/800.css'
import '@fontsource/overpass-mono'
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
