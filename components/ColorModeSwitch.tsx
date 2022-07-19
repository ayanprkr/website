import { useColorMode, IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import type { NextPage, NextComponentType } from 'next'

const ColorModeSwitch: NextComponentType = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <IconButton onClick={toggleColorMode} icon={ colorMode === 'dark' ? <SunIcon /> : <MoonIcon />} aria-label='null'></IconButton>
    )
}

export default ColorModeSwitch