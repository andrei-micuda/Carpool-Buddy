import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { createContext, useState } from 'react'
import AppContext from '../data/appContext'

function MyApp({ Component, pageProps }) {
  const [coordinates, setCoordinates] = useState([-74.5 + (Math.random() - 0.5) * 10, // Example data
  40 + (Math.random() - 0.5) * 10])
  return <AppContext.Provider value={{coordinates, setCoordinates}}>
      <Component {...pageProps} />
    </AppContext.Provider>
}

export default MyApp
