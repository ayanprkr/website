import React from "react";
import { 
    Flex, 
    Spacer, 
    Button, 
    Box, 
} from "@chakra-ui/react"
import Link from "next/link"
import ColorModeSwitch from "./ColorModeSwitch"
import SpotifyWidget from "./SpotifyWidget"

const Navbar: React.FC = () => {
    return (
        <>
            <Flex position='relative' top={0} flexDirection='row' justifyContent='space-between' alignItems='center' width='100%' as='nav' px={[6, 14, 14]} py={2} mt={8} mb={[0, 0, 8]} mx='auto' gap={10}>
                <Flex gap={5}>
                    <Link href="/" passHref>
                        <Button as="a">home</Button>
                    </Link>
                    <Link href="/blogs" passHref>
                        <Button as="a" variant='ghost'>blogs</Button>
                    </Link>
                    <Link href="/guestbook" passHref>
                        <Button as="a" variant='ghost'>guestbook</Button>
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