import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { createContext, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { hotjar } from 'react-hotjar'
import * as gtag from '../lib/gtag'
import AppContext from "../data/appContext";

function MyApp({ Component, pageProps }) {
  const [coordinates, setCoordinates] = useState();

  const router = useRouter()
  useEffect(() => {
  const handleRouteChange = url => {
    gtag.pageview(url)
  }
  router.events.on('routeChangeComplete', handleRouteChange)
  return () => {
    router.events.off('routeChangeComplete', handleRouteChange)
  }
}, [router.events])

  useEffect(() => {
    hotjar.initialize(3819666, 6)
  }, [])
  return (
    <AppContext.Provider value={{ coordinates, setCoordinates }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
