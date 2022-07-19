import type { NextPage, NextComponentType } from 'next'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    ScaleFade,
  } from '@chakra-ui/react'

interface Props {
    title: string,
    description?: string
}

const FadeAlert: NextPage<Props> = (props) => {
    return (
        <>
            <ScaleFade initialScale={0.9} in={true}>
                <Alert mb={8} variant='left-accent'>
                    <AlertIcon />
                    <AlertTitle>{props.title}</AlertTitle>
                    <AlertDescription>{props.description ? props.description : null}</AlertDescription>
                </Alert>
            </ScaleFade>
        </>
    )
}

export default FadeAlert