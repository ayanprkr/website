import React from "react";
import Link from "next/link";
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue
} from "@chakra-ui/react";

type Props = {
    url: string;
    repo: string;
    description: string;
    stars: string;
    forks: string;
    language: string;
    languageColor?: string;
};

const Project: React.FC<Props> = ({ url, repo, stars, forks, description, language, languageColor }) => {
    return (
        <Center>
            <Box
                maxW={["xs", "sm", "sm"]}
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
                        {language}
                    </Text>
                    <Heading
                        fontSize={['lg', '2xl', '2xl']}
                        fontFamily={'body'}
                        textTransform={'lowercase'}
                    >
                        <Link href={url}>{repo}</Link>
                    </Heading>
                    <Text fontSize={['sm', 'lg', 'lg']} color={'gray.500'} textTransform={'lowercase'}>
                        {description}
                    </Text>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                        src={'https://avatars.githubusercontent.com/u/38457291'}
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>ayan (metalooze05)</Text>
                        <Text color={'gray.500'}>stars: {stars}, forks: {forks}</Text>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    )
}

export default Project;