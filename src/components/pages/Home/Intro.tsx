import React, { ReactElement } from 'react'
import Markdown from '../../atoms/Markdown'
import styles from './Intro.module.css'

export default function Intro({
  title,
  tagline
}: {
  title: string
  tagline: string
}): ReactElement {
  return (
    <div className={styles.powered}>
      <h1>{title}</h1>
      <Markdown className={styles.tagline} text={tagline} />
    </div>
  )
}
