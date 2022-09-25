
import type { AppProps } from 'next/app'
import '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import {lightTheme} from '../themes';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react';
import "../styles/globals.css"
import { RecetasProvider } from '../context/recetas';
function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.js')
  }, [])
  return (
    <RecetasProvider>
      <ThemeProvider theme={lightTheme} >
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecetasProvider>
  )
}

export default MyApp
