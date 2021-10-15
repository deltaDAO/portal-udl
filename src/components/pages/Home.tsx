import React, { ReactElement, useEffect, useState } from 'react'
import AssetList from '../organisms/AssetList'
import { SearchQuery } from '@oceanprotocol/lib/dist/node/metadatacache/MetadataCache'
import Button from '../atoms/Button'
import Bookmarks from '../molecules/Bookmarks'
import {
  queryMetadata,
  transformChainIdsListToQuery,
  getDynamicPricingQuery
} from '../../utils/aquarius'
import Permission from '../organisms/Permission'
import { DDO, Logger } from '@oceanprotocol/lib'
import { useUserPreferences } from '../../providers/UserPreferences'
import styles from './Home.module.css'
import { useIsMounted } from '../../hooks/useIsMounted'
import { useCancelToken } from '../../hooks/useCancelToken'

function getQueryLatest(chainIds: number[]): SearchQuery {
  return {
    size: 9,
    query: {
      query_string: {
        query: `(${transformChainIdsListToQuery(
          chainIds
        )}) ${getDynamicPricingQuery()} AND -isInPurgatory:true `
      }
    },
    sort: { created: 'desc' }
  }
}

function sortElements(items: DDO[], sorted: string[]) {
  items.sort(function (a, b) {
    return sorted.indexOf(a.dataToken) - sorted.indexOf(b.dataToken)
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
  queryData?: string
}) {
  const { chainIds } = useUserPreferences()
  const [result, setResult] = useState<any>()
  const [loading, setLoading] = useState<boolean>()
  const isMounted = useIsMounted()
  const newCancelToken = useCancelToken()
  useEffect(() => {
    async function init() {
      if (chainIds.length === 0) {
        const result: any = {
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
            const searchDIDs = queryData.split(' ')
            const sortedAssets = sortElements(result.results, searchDIDs)
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
  }, [isMounted, newCancelToken, query])

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
  const { chainIds } = useUserPreferences()

  return (
    <Permission eventType="browse">
      <>
        <section className={styles.section}>
          <h3>Bookmarks</h3>
          <Bookmarks />
        </section>

        <SectionQueryResult
          title="Recently Published"
          query={getQueryLatest(chainIds)}
          action={
            <Button style="text" to="/search?sort=created&sortOrder=desc">
              All data sets and algorithms →
            </Button>
          }
        />
      </>
    </Permission>
  )
}
