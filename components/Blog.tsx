import React from "react";
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue
} from "@chakra-ui/react";

const Blog: React.FC = () => {
    return (
        <Center>
            <Box
                maxW={["sm", "md", "md"]}
                bg={useColorModeValue('white', 'gray.900')}
                rounded={["sm", "md", "md"]}
                p={6}
                overflow={'hidden'}
            >
                <Stack>
                    <Text
                        color={'green.300'}
                        textTransform={'lowercase'}
                        fontWeight={800}
                        fontSize={['xs', 'sm', 'sm']}
                        letterSpacing={1.1}
                    >
                        Blog
                    </Text>
                    <Heading
                        fontSize={['lg', '2xl', '2xl']}
                        fontFamily={'body'}
                        textTransform={'lowercase'}
                    >
                        Lorem ipsum dolor sit amet
                    </Heading>
                    <Text fontSize={['sm', 'lg', 'lg']} color={'gray.500'} textTransform={'lowercase'}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                        et ea rebum.
                    </Text>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                        src={'https://avatars.githubusercontent.com/u/38457291'}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>Ayan (MetalOoze)</Text>
                        <Text color={'gray.500'}>{new Date(1662028787988).toISOString()}</Text>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    )
}

export default Blog;