import React from "react";
import useSWR, { Key, Fetcher } from "swr"
import Image from "next/image"
import {
    Box,
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Text,
    Flex,
    Heading,
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadphonesSimple } from "@fortawesome/free-solid-svg-icons"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const SpotifyWidget: React.FC = () => {
    const { data, error } = useSWR("/api/spotify", fetcher)

    if (error || !data) {
        return (
            <Box m={0}>
                <Popover placement="bottom-end" offset={[0, 20]}>
                    <PopoverTrigger>
                        <Button disabled>
                            <FontAwesomeIcon icon={faHeadphonesSimple} size={'1x'} color={'#A0AEC0'} />
                        </Button>
                    </PopoverTrigger>
                </Popover>
            </Box>
        )
    }

    if (data.data.spotify) {
        return (
            <Box m={0}>
                <Popover placement="bottom-end" offset={[0, 20]}>
                    <PopoverTrigger>
                        <Button>
                            <FontAwesomeIcon icon={faHeadphonesSimple} size={'1x'} color={'#68D391'} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent maxW={['max-content', 'full', 'full']} borderColor={'transparent'}>
                        <PopoverArrow />
                        <PopoverBody>
                            <Flex direction={'column'} alignItems={'left'} gap={5} p={3}>
                                <Heading fontSize={['md', 'lg', 'lg']}>Currently Playing</Heading>
                                <Flex direction={'row'} alignItems={'center'} gap={5}>
                                    <Image src={data.data.spotify?.album_art_url} alt="ayan" height={100} width={100} />
                                    <Flex direction={'column'}>
                                        <Text fontSize={['sm', 'md', 'md']} fontWeight={'bold'}>{data.data.spotify?.song.charAt(0).toUpperCase() + data.data.spotify?.song.slice(1)}</Text>
                                        <Text fontWeight={'medium'} fontSize={'xs'} color={'gray.400'}>{data.data.spotify?.artist}</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>
        )
    }

    return (
        <Box m={0}>
            <Popover placement="bottom-end" offset={[0, 20]}>
                <PopoverTrigger>
                    <Button disabled>
                        <FontAwesomeIcon icon={faHeadphonesSimple} size={'1x'} color={'#A0AEC0'} />
                    </Button>
                </PopoverTrigger>
            </Popover>
        </Box>
    )
}

export default SpotifyWidget