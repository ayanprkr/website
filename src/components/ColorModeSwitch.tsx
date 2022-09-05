import { useColorMode, IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import React from "react";

const ColorModeSwitch: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <IconButton onClick={toggleColorMode} icon={ colorMode === 'dark' ? <SunIcon /> : <MoonIcon />} aria-label='null'></IconButton>
    )
}

export default ColorModeSwitch