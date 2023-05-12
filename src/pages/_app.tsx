import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';

export default function App({ Component, pageProps }: AppProps) {
  const chainId = ChainId.Polygon;
  const queryClient = new QueryClient();

  return (
    <ThirdwebProvider activeChain={chainId}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}
