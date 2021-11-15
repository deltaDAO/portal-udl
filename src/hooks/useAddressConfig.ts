import { DDO } from '@oceanprotocol/lib'
import addressConfig from '../../address.config'

export interface UseAddressConfig {
  whitelists: {
    'publicKey.owner'?: string[]
    dataToken?: string[]
  }
  isAddressWhitelisted: (address: string) => boolean
  isDDOWhitelisted: (ddo: DDO) => boolean
}

export function useAddressConfig(): UseAddressConfig {
  const { whitelists }: { whitelists: UseAddressConfig['whitelists'] } =
    addressConfig

  const isAddressWhitelisted = function (
    address: string,
    field?: keyof UseAddressConfig['whitelists']
  ) {
    if (Object.entries(whitelists).length < 1) return true

    return field
      ? whitelists[field].some(
          (whitelistedAddress) => whitelistedAddress === address
        )
      : Object.values(whitelists).some((whitelist) =>
          whitelist.some((whitelistedAddress) => whitelistedAddress === address)
        )
  }

  const isDDOWhitelisted = function (ddo: DDO) {
    return (
      ddo &&
      (isAddressWhitelisted(ddo.dataTokenInfo.address, 'dataToken') ||
        ddo.publicKey
          .map((pk) => {
            return isAddressWhitelisted(pk.owner, 'publicKey.owner')
          })
          .some((isWhitelisted) => isWhitelisted === true))
    )
  }

  return { whitelists, isAddressWhitelisted, isDDOWhitelisted }
}
