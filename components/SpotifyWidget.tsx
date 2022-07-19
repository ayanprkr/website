import type { NextComponentType } from "next"
import useSWR, { Key, Fetcher } from "swr"
import Image from "next/image"
import {
    Box,
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    Text,
    Flex,
    Heading
} from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeadphonesSimple } from "@fortawesome/free-solid-svg-icons"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const SpotifyWidget: NextComponentType = () => {
    const { data, error } = useSWR("/api/spotify", fetcher)

    if (error || !data) {
        return (
            <>
            </>
        )
    }

    if (data.data.spotify) {
        return (
            <Box>
                <Popover placement="left-end" offset={[0, 20]}>
                    <PopoverTrigger>
                        <Button py={5} px={3}>
                            <FontAwesomeIcon icon={faHeadphonesSimple} size={'1x'} color={'#68D391'} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent borderColor={'transparent'}>
                        <PopoverArrow />
                        <PopoverBody>
                            <Flex direction={'column'} alignItems={'left'} gap={5} py={3} px={3}>
                                <Heading fontSize={'lg'}>Currently Playing</Heading>
                                <Flex direction={'row'} alignItems={'center'} gap={5}>
                                    <Image src={data.data.spotify?.album_art_url} alt="ayan" height={100} width={100} />
                                    <Flex direction={'column'}>
                                        <Text fontSize={'md'} fontWeight={'bold'}>{data.data.spotify?.song.charAt(0).toUpperCase() + data.data.spotify?.song.slice(1)}</Text>
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
        <Box>
            <Popover placement="left-end" offset={[0, 20]}>
                <PopoverTrigger>
                    <Button py={5} px={3} disabled>
                        <FontAwesomeIcon icon={faHeadphonesSimple} size={'1x'} color={'#A0AEC0'} />
                    </Button>
                </PopoverTrigger>
            </Popover>
        </Box>
    )
}

export default SpotifyWidget