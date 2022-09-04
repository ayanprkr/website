import type { NextPage, NextComponentType } from 'next';
import FadeAlert from '../components/FadeAlert'
import { Flex } from '@chakra-ui/react'
const GuestBook: NextPage = () => {
    return (
        <>  
            <Flex direction={'column'} px={[6, 10, 14]} py={2} mt={8} mb={[0, 0, 8]} mx="auto">
                <FadeAlert title='This webpage is under development' description='Please check back in some time' />
            </Flex>
        </>
    )
}

export default GuestBook;