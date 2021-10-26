import React, { ReactElement, ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import '@fontsource/overpass/400.css'
import '@fontsource/overpass/700.css'
import '@fontsource/overpass/900.css'
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
