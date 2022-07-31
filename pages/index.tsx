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
        <Flex direction={'column'} my={[2, 6, 6]}>
          <Text fontSize={['sm', 'lg', 'lg']}>
            hey there!
            <br /><br />
            i&apos;m ayan, a 16 year old programming enthusiast from india currently a student and interested in machine learning.
            <br /><br />
            p.s - the green/red/yellow/gray line above indicates my discord status 😎
          </Text>
        </Flex>

        <Flex direction={'column'} my={[2, 6, 6]}>
          <Heading fontSize={['lg', '2xl', '2xl']}>Skills</Heading>
          <Text my={[1, 3, 3]} fontSize={['sm', 'lg', 'lg']}>
            here&apos;s my essentials.
          </Text>
        </Flex>

        <Flex direction={'column'} my={[2, 6, 6]}>
          <Heading fontSize={['lg', '2xl', '2xl']}>Projects</Heading>
          <Text my={[1, 3, 3]} fontSize={['sm', 'lg', 'lg']}>
            none, i&apos;m useless.
          </Text>
        </Flex>
      </Flex>
    </>
  )
}

export default Home
