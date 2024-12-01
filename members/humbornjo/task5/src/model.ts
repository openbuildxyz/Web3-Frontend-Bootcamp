export type address = string

export type Nftem = {
  owner: address
  nftURI: string
  price: bigint
  tstamp: bigint
  listing: boolean
  onceupon: boolean
}

export type Nftag = {
  nftContract: address
  nftID: number
}

export type Nftsum = {
  nftContract: address
  nftID: number
  owner: address
  nftURI: string
  price: bigint
  tstamp: bigint
  listing: boolean
  onceupon: boolean
}
