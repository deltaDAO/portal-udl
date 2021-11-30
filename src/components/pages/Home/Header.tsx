import React, { ReactElement } from 'react'
import styles from './Header.module.css'
import Markdown from '../../atoms/Markdown'
import Img, { FluidObject } from 'gatsby-image'

export default function Header({
  title,
  content,
  image
}: {
  title: string
  content: string
  image: FluidObject
}): ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>{title}</h1>
          <Markdown text={content} />
        </div>
        <div className={styles.image}>
          <Img fluid={image} alt={title} />
        </div>
      </div>
    </div>
  )
}
