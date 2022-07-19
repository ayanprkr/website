import type { NextPage, NextComponentType } from 'next'
import {
  Flex,
  Text,
  Heading,
  Box
} from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <>
      <Flex direction={'column'} px={[6, 10, 14]} py={2} mt={8} mb={[0, 0, 8]} mx="auto">

        {/* HERO SECTION */}
        <Heading color={'gray.300'}>Hey there! 👋</Heading>
        <Flex direction={'column'} mt={[2, 6, 6]}>
          <Text fontSize={['sm', 'lg', 'lg']} color={'gray.400'}>
            I&apos;m Ayan, a 16 year old developer and progamming enthusiast from India. I&apos;m interested in Machine Learning, Deep Learning and Full-Stack development.
            <br /><br />
            I started programming back in 2020 when COVID-19 was at its peak. I was in my 10th grade but still I managed to learn programming, most of the time I created Discord Bots using NodeJS (technically copying codes from github). At first I had no interest in programming and I used to code because I was kinda bored with my 10th grade syllabus, then I started learning properly and was able to implement my own idas to discord bots. Later when my boards got cancelled, I started learning more languages like Python, Go, etc. and also beautiful frameworks like React, Vue, NextJS, etc.
            <br /><br />
            Since then, my proficiency in programming has considerably increased and now I&apos;m pursuing an integrated B-Tech degree in CSE.
            <br /><br />
            P.S - The green/red/yellow/gray line above indicates my discord status 😎
          </Text>
        </Flex>
        {/* DASBOARD SECTION */}
        <Flex direction={['column', 'row', 'row']} mt={'6'} gap={['4', '10', '10']}>
          <Box maxW={['xs', 'sm', 'sm']} py={'4'} px={'6'} borderWidth={'1px'} borderRadius={'lg'} overflow={'hidden'}>
            <Box color={'gray.300'} wordBreak={'break-word'} fontSize={'2xl'} fontWeight={'bold'} as={'h2'} lineHeight={'tight'}>
              LeetCode Acceptance Rate
            </Box>
            <Box color={'gray.400'} wordBreak={'break-word'} fontSize={'lg'} fontWeight={'regular'} as={'h4'} lineHeight={'tight'}>
              Lorem Ipsum
            </Box>
          </Box>
          <Box maxW={['xs', 'sm', 'sm']} py={'4'} px={'6'} borderWidth={'1px'} borderRadius={'lg'} overflow={'hidden'}>
            <Box color={'gray.300'} wordBreak={'break-word'} fontSize={'2xl'} fontWeight={'bold'} as={'h2'} lineHeight={'tight'}>
              Github Contribution
            </Box>
            <Box color={'gray.400'} wordBreak={'break-word'} fontSize={'lg'} fontWeight={'regular'} as={'h4'} lineHeight={'tight'}>
              Lorem Ipsum
            </Box>
          </Box>
          <Box maxW={['xs', 'sm', 'sm']} py={'4'} px={'6'} borderWidth={'1px'} borderRadius={'lg'} overflow={'hidden'}>
            <Box color={'gray.300'} wordBreak={'break-word'} fontSize={'2xl'} fontWeight={'bold'} as={'h2'} lineHeight={'tight'}>
              Twitter Followers
            </Box>
            <Box color={'gray.400'} wordBreak={'break-word'} fontSize={'lg'} fontWeight={'regular'} as={'h4'} lineHeight={'tight'}>
              Lorem Ipsum
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default Home
