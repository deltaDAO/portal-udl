import React, { ReactElement } from 'react'
import styles from './Footer.module.css'
import Markdown from '../atoms/Markdown'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import { useUserPreferences } from '../../providers/UserPreferences'
import Button from '../atoms/Button'
import { useGdprMetadata } from '../../hooks/useGdprMetadata'

export default function Footer(): ReactElement {
  const { copyright, appConfig } = useSiteMetadata()
  const { setShowPPC } = useUserPreferences()

  const cookies = useGdprMetadata()

  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          © {year} <Markdown text={copyright} />
          <br />
          <Button
            className={styles.link}
            style="text"
            href="https://portal.minimal-gaia-x.eu/imprint"
          >
            Imprint
          </Button>
          {' — '}
          <Button
            className={styles.link}
            style="text"
            href="https://portal.minimal-gaia-x.eu/privacy/en"
          >
            Privacy
          </Button>
          {appConfig.privacyPreferenceCenter === 'true' && (
            <>
              {' — '}
              <Button
                style="text"
                size="small"
                className="link"
                onClick={() => {
                  setShowPPC(true)
                }}
              >
                {cookies.optionalCookies ? 'Cookie Settings' : 'Cookies'}
              </Button>
            </>
          )}
        </div>
      </div>
    </footer>
  )
}
