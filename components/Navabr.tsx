import { 
    Flex, 
    Spacer, 
    Button, 
    Box, 
} from "@chakra-ui/react"
import Link from "next/link"
import ColorModeSwitch from "./ColorModeSwitch"
import type { NextComponentType } from 'next'
import SpotifyWidget from "./SpotifyWidget"

const Navbar: NextComponentType = () => {
    return (
        <>
            <Flex position='relative' top={0} flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' as='nav' px={[6, 14, 14]} py={2} mt={8} mb={[0, 0, 8]} mx='auto' gap={10}>
                <Flex gap={5}>
                    <Link href="/" passHref>
                        <Button as="a">Home</Button>
                    </Link>
                    <Link href="/blogs" passHref>
                        <Button as="a" variant='ghost'>Blogs</Button>
                    </Link>
                </Flex>
                    <Flex gap={5} direction={'row'} alignItems={'center'}>
                        <SpotifyWidget />
                        <ColorModeSwitch />
                    </Flex>
            </Flex>
        </>
    )
}

export default Navbar