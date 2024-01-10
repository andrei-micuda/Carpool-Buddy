import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { createContext, useState } from "react";
import AppContext from "../data/appContext";

function MyApp({ Component, pageProps }) {
  const [coordinates, setCoordinates] = useState();
  return (
    <AppContext.Provider value={{ coordinates, setCoordinates }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
