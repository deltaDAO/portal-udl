#!/usr/bin/env node
'use strict'

const axios = require('axios')

// https://github.com/ethereum-lists/chains
const chainDataUrl = 'https://chainid.network/chains.json'

axios(chainDataUrl).then((response) => {
  //Hack in GX network data
  response.data.push({
    name: 'Gaia-X Testnet',
    chain: 'Gaia-X',
    network: 'testnet',
    rpc: ['https://rpc.gaiaxtestnet.oceanprotocol.com'],
    faucets: [
      'https://faucet.gaiaxtestnet.oceanprotocol.com/',
      'https://faucet.gx.gaiaxtestnet.oceanprotocol.com/'
    ],
    nativeCurrency: {
      name: 'Gaia-X',
      symbol: 'GX',
      decimals: 18
    },
    infoURL: 'https://gaia-x.eu',
    shortName: 'Gaia-X',
    chainId: 2021000,
    networkId: 2021000,
    explorers: [{ url: 'https://blockscout.gaiaxtestnet.oceanprotocol.com/' }]
  })

  //Hack in CX network data
  response.data.push({
    name: 'Catena-X Testnet',
    chain: 'Catena-X',
    network: 'testnet',
    rpc: ['https://rpc.catenaxtestnet.oceanprotocol.com'],
    faucets: [
      'https://faucet.catenaxtestnet.oceanprotocol.com/',
      'https://faucet.cx.catenaxtestnet.oceanprotocol.com/'
    ],
    nativeCurrency: {
      name: 'Catena-X',
      symbol: 'CX',
      decimals: 18
    },
    infoURL: 'https://catena-x.net',
    shortName: 'Catena-X',
    chainId: 2021001,
    networkId: 2021001,
    explorers: [{ url: 'https://blockscout.catenaxtestnet.oceanprotocol.com/' }]
  })

  process.stdout.write(JSON.stringify(response.data, null, '  '))
})
