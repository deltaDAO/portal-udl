import React, { ReactElement } from 'react'
import styles from './Header.module.css'
import { graphql, useStaticQuery } from 'gatsby'
import Markdown from '../../atoms/Markdown'
import Img from 'gatsby-image'

const contentQuery = graphql`
  query TaglineQuery {
    file(relativePath: { eq: "pages/home/intro.json" }) {
      childHomeJson {
        title
        content
      }
    }
    image: file(relativePath: { eq: "microscope.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default function Header(): ReactElement {
  const data = useStaticQuery(contentQuery)
  const { title, content } = data.file.childHomeJson
  const image = data.image.childImageSharp.fluid

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
