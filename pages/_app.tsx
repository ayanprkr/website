import { ChakraProvider, Box, Skeleton, extendTheme, useColorMode, type ThemeConfig } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navabr'
import useSWR from 'swr'
import { NextComponentType } from 'next'

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

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <ChakraProvider theme={theme}>
      <DiscordStatus />
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
