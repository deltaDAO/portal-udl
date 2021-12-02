import React, { ReactElement } from 'react'
import styles from './Footer.module.css'
import Markdown from '../../atoms/Markdown'
import Img, { FluidObject } from 'gatsby-image'

export default function Footer({
  content,
  image
}: {
  content: string
  image: FluidObject
}): ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <Markdown text={content} />
        </div>
        <div className={styles.image}>
          <Img fluid={image} alt="funded by" />
        </div>
      </div>
    </div>
  )
}
