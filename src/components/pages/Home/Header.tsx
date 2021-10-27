import React, { ReactElement } from 'react'
import styles from './Header.module.css'
import { ReactComponent as DataXChange } from '../../../images/dataxchange.svg'
import { ReactComponent as DeltadaoText } from '../../../images/deltaDAO_logo_text.svg'

export default function Header(): ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.gradient} />
      <DeltadaoText className={styles.logoText} />
      <DataXChange className={styles.dataXChange} />
      <p className={styles.tagLine}>
        privacy preserving,
        <br />
        self-sovereign,
        <br />
        decentralized data exchange
      </p>
    </div>
  )
}
