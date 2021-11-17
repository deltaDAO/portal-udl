// chain configs in ocean.js ConfigHelperConfig format
// see: https://github.com/oceanprotocol/ocean.js/blob/e07a7cb6ecea12b39ed96f994b4abe37806799a1/src/utils/ConfigHelper.ts#L8
// networkId is required, since its used to look for overwrites
// all other fields are first loaded from ocean.js and are optional
const chains = {
  GaiaXTestnet: {
    networkId: 2021000,
    nodeUri: 'https://rpc.gaiaxtestnet.oceanprotocol.com/',
    providerUri: 'https://provider.gaiax.delta-dao.com/',
    explorerUri: 'https://blockscout.gaiaxtestnet.oceanprotocol.com/',
    isDefault: true
  }
}

module.exports = chains
