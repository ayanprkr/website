import { ChakraProvider, Box, Skeleton, extendTheme, ThemeConfig } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navabr'
import useSWR from 'swr'
import { NextComponentType } from 'next'
import { SessionProvider } from 'next-auth/react'
import superjson from "superjson"
import { withTRPC } from '@trpc/next'
import { AppRouter } from '~/server/router'

const theme: ThemeConfig = extendTheme({
  fonts: {
    heading: 'IBM Ples Mono, monospace',
    body: 'IBM Plex Mono, monospace',
  },
  initialColorMode: 'dark',
  useSystemColorMode: false,
})

const fetcher = (url: string) => fetch(url).then((res) => res.json()) 

const DiscordStatus: NextComponentType = () => {
  const { data, error } = useSWR("/api/discord", fetcher)

  if (error || !data) {
    return (
      <Box width={'full'} height={1}>
        <Skeleton height={1}></Skeleton>
      </Box>
    )
  }
  
  if (data.data.discord_status === "online") {
    return <Box bg={'green.300'} width={'full'} height={1}/>
  } else if (data.data.discord_status === "idle") {
    return <Box bg={'yellow.300'} width={'full'} height={1}/>
  } else if (data.data.discord_status === "dnd") {
    return <Box bg={'red.300'} width={'full'} height={1}/>
  } else {
    return <Box width={'full'} height={1}><Skeleton height={1} /></Box>
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {  
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <DiscordStatus />
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.browser) return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);