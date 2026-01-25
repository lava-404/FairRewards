type SolanaNetwork = 'devnet' | 'mainnet';

interface SolanaNetworkConfig {
  label: string;
  rpcEndpoint: string;
  explorerBaseUrl: string;
  paymasterEndpoint: string;
}

const SOLANA_NETWORKS: Record<SolanaNetwork, SolanaNetworkConfig> = {
  devnet: {
    label: 'Devnet',
    rpcEndpoint: 'https://api.devnet.solana.com',
    explorerBaseUrl: 'https://explorer.solana.com/?cluster=devnet',
    paymasterEndpoint: 'https://kora.devnet.lazorkit.com',
  },

  mainnet: {
    label: 'Mainnet',
    rpcEndpoint: 'https://api.mainnet-beta.solana.com',
    explorerBaseUrl: 'https://explorer.solana.com/',
    paymasterEndpoint: 'https://kora.mainnet.lazorkit.com',
  },
};

// Toggle network here
export const CURRENT_NETWORK: SolanaNetworkConfig = SOLANA_NETWORKS.devnet;



export const TOKEN_REGISTRY = {
  devnet: {
    SOL: {
      symbol: 'SOL',
      mint: 'So11111111111111111111111111111111111111112',
      decimals: 9,
      icon: '◎',
    },
    USDC: {
      symbol: 'USDC-DEV',
      mint: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr',
      decimals: 6,
      icon: '$',
    },
  },

  mainnet: {
    SOL: {
      symbol: 'SOL',
      mint: 'So11111111111111111111111111111111111111112',
      decimals: 9,
      icon: '◎',
    },
    USDC: {
      symbol: 'USDC',
      mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      decimals: 6,
      icon: '$',
    },
  },
} as const;

/**
 * Returns token data for the currently active network
 */
export function getNetworkTokens() {
  return CURRENT_NETWORK.label === 'Mainnet'
    ? TOKEN_REGISTRY.mainnet
    : TOKEN_REGISTRY.devnet;
}

// -----------------------------------------------------------------------------
// Explorer helpers
// -----------------------------------------------------------------------------

export function txExplorerUrl(signature: string): string {
  return `${CURRENT_NETWORK.explorerBaseUrl}tx/${signature}`;
}

export function addressExplorerUrl(address: string): string {
  return `${CURRENT_NETWORK.explorerBaseUrl}address/${address}`;
}

export function shortenAddress(address: string, visible = 4): string {
  return `${address.slice(0, visible)}...${address.slice(-visible)}`;
}
