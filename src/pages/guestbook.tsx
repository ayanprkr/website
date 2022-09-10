import type { NextPage, NextComponentType } from 'next';
import { Flex, Heading, Text } from '@chakra-ui/react'
import GuestBook from '../components/GuestBook';
import Head from 'next/head';

const GuestBookPage: NextPage = () => {
    return (
        <>  
            <Head>
                <title>guestbook • ayanprkr</title>
            </Head>
            <Flex direction={'column'} gap={2} px={[6, 10, 14]} py={2} mt={8} mb={[0, 0, 8]} mx="auto">
                <Heading>guestbook</Heading>
                <Text fontSize={['sm', 'lg', 'lg']} textTransform="lowercase">Leave a comment below to sign my Guestbook. It could literally be anything - a joke, a quote or even a cool fact. Surprise me!</Text>

                <Flex direction={"column"} my={5}>
                   <GuestBook />
                </Flex>
            </Flex>
        </>
    )
}

export default GuestBookPage;