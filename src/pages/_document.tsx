import { ColorModeScript, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
export default class Document extends NextDocument {
    render() {
        return (
            <Html lang='en'>
                <Head />
                <Main />
                <NextScript />
            </Html>
        )
    }
}