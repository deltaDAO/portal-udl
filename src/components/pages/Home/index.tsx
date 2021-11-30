import React, { ReactElement, useEffect, useState } from 'react'
import AssetList from '../../organisms/AssetList'
import Button from '../../atoms/Button'
import { generateBaseQuery, queryMetadata } from '../../../utils/aquarius'
import Permission from '../../organisms/Permission'
import { DDO, Logger } from '@oceanprotocol/lib'
import { useUserPreferences } from '../../../providers/UserPreferences'
import styles from './index.module.css'
import { useIsMounted } from '../../../hooks/useIsMounted'
import { useCancelToken } from '../../../hooks/useCancelToken'
import { SearchQuery } from '../../../models/aquarius/SearchQuery'
import {
  SortDirectionOptions,
  SortOptions,
  SortTermOptions
} from '../../../models/SortAndFilters'
import { BaseQueryParams } from '../../../models/aquarius/BaseQueryParams'
import { PagedAssets } from '../../../models/PagedAssets'
import Header from './Header'
import { graphql, useStaticQuery } from 'gatsby'
import Markdown from '../../atoms/Markdown'
import Intro from './Intro'

const contentQuery = graphql`
  query ContentQuery {
    intro: file(relativePath: { eq: "pages/home/intro.json" }) {
      childHomeJson {
        title
        tagline
      }
    }
    header: file(relativePath: { eq: "pages/home/header.json" }) {
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
    topics: file(relativePath: { eq: "pages/home/topics.json" }) {
      childHomeJson {
        topics {
          title
          content
        }
      }
    }
  }
`

interface TTopic {
  title: string
  content: string
}

function sortElements(items: DDO[], sorted: string[]) {
  items.sort(function (a, b) {
    return (
      sorted.indexOf(a.dataToken.toLowerCase()) -
      sorted.indexOf(b.dataToken.toLowerCase())
    )
  })
  return items
}

function SectionQueryResult({
  title,
  query,
  action,
  queryData
}: {
  title: ReactElement | string
  query: SearchQuery
  action?: ReactElement
  queryData?: string[]
}) {
  const { chainIds } = useUserPreferences()
  const [result, setResult] = useState<any>()
  const [loading, setLoading] = useState<boolean>()
  const isMounted = useIsMounted()
  const newCancelToken = useCancelToken()
  useEffect(() => {
    async function init() {
      if (chainIds.length === 0) {
        const result: PagedAssets = {
          results: [],
          page: 0,
          totalPages: 0,
          totalResults: 0
        }
        setResult(result)
        setLoading(false)
      } else {
        try {
          setLoading(true)
          const result = await queryMetadata(query, newCancelToken())
          if (!isMounted()) return
          if (queryData && result?.totalResults > 0) {
            const sortedAssets = sortElements(result.results, queryData)
            const overflow = sortedAssets.length - 9
            sortedAssets.splice(sortedAssets.length - overflow, overflow)
            result.results = sortedAssets
          }
          setResult(result)
          setLoading(false)
        } catch (error) {
          Logger.error(error.message)
        }
      }
    }
    init()
  }, [chainIds.length, isMounted, newCancelToken, query, queryData])

  return (
    <section className={styles.section}>
      <h3>{title}</h3>
      <AssetList
        assets={result?.results}
        showPagination={false}
        isLoading={loading}
      />
      {action && action}
    </section>
  )
}

export default function HomePage(): ReactElement {
  const [queryLatest, setQueryLatest] = useState<SearchQuery>()
  const { chainIds } = useUserPreferences()

  const data = useStaticQuery(contentQuery)
  const { topics } = data.topics.childHomeJson
  const intro = data.intro.childHomeJson
  const header = data.header.childHomeJson
  const image = data.image.childImageSharp.fluid

  useEffect(() => {
    const baseParams = {
      chainIds: chainIds,
      esPaginationOptions: { size: 3 },
      sortOptions: {
        sortBy: SortTermOptions.Created,
        sortDirection: SortDirectionOptions.Descending
      }
    } as BaseQueryParams

    setQueryLatest(generateBaseQuery(baseParams))
  }, [chainIds])

  return (
    <>
      <Intro {...intro} />
      <Header {...header} image={image} />
      <div className={styles.topicsWrapper}>
        <div className={styles.topics}>
          {(topics as TTopic[]).map((topic, i) => (
            <div key={i} className={styles.content}>
              <h1>{topic.title}</h1>
              <Markdown text={topic.content} />
            </div>
          ))}
        </div>
      </div>
      <Permission eventType="browse">
        <>
          {queryLatest && (
            <SectionQueryResult
              title="browse our data services"
              query={queryLatest}
              action={
                <Button style="text" to="/search?sort=created&sortOrder=desc">
                  All data sets and algorithms →
                </Button>
              }
            />
          )}
        </>
      </Permission>
    </>
  )
}
