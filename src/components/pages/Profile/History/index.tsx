import React, { ReactElement } from 'react'
import Tabs from '../../../atoms/Tabs'
import PoolShares from './PoolShares'
import PoolTransactions from '../../../molecules/PoolTransactions'
import PublishedList from './PublishedList'
import Downloads from './Downloads'
import ComputeJobs from './ComputeJobs'
import { useLocation } from '@reach/router'
import styles from './index.module.css'
import OceanProvider from '../../../../providers/Ocean'
import { useWeb3 } from '../../../../providers/Web3'
import { useSiteMetadata } from '../../../../hooks/useSiteMetadata'

interface HistoryTab {
  title: string
  content: JSX.Element
}

function getTabs(
  accountId: string,
  userAccountId: string,
  allowDynamicPricing: boolean
): HistoryTab[] {
  const defaultTabs: HistoryTab[] = [
    {
      title: 'Published',
      content: <PublishedList accountId={accountId} />
    },
    {
      title: 'Pool Shares',
      content: <PoolShares accountId={accountId} />
    },
    {
      title: 'Pool Transactions',
      content: <PoolTransactions accountId={accountId} />
    },
    {
      title: 'Downloads',
      content: <Downloads accountId={accountId} />
    }
  ]

  const filteredTabs = defaultTabs.filter(
    (tab) => !allowDynamicPricing && !tab.title.includes('Pool')
  )

  const computeTab: HistoryTab = {
    title: 'Compute Jobs',
    content: (
      <OceanProvider>
        <ComputeJobs />
      </OceanProvider>
    )
  }
  if (accountId === userAccountId) {
    filteredTabs.push(computeTab)
  }
  return filteredTabs
}

export default function HistoryPage({
  accountIdentifier
}: {
  accountIdentifier: string
}): ReactElement {
  const { accountId } = useWeb3()
  const location = useLocation()
  const { allowDynamicPricing } = useSiteMetadata().appConfig
  const url = new URL(location.href)
  const defaultTab = url.searchParams.get('defaultTab')
  const tabs = getTabs(
    accountIdentifier,
    accountId,
    allowDynamicPricing === 'true'
  )

  let defaultTabIndex = 0
  defaultTab === 'ComputeJobs' ? (defaultTabIndex = 4) : (defaultTabIndex = 0)

  return (
    <Tabs items={tabs} className={styles.tabs} defaultIndex={defaultTabIndex} />
  )
}
