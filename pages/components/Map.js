import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken = "NULL";

const Map = (props) => {
  console.log("Initializing map...");

  const map = useRef(null);

  const [coordinates, setCoordinates] = useState([-74.5 + (Math.random() - 0.5) * 10, // Example data
  40 + (Math.random() - 0.5) * 10])

  useEffect(() => {
    const pickupCoord = props.pickupCoordinate;
    const dropoffCoord = props.dropoffCoordinate;

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8],
      zoom: 3,
    });

    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      });
    
      geolocate.on('geolocate', (pos) => {
        centerMap(map.current, [pos.coords.latitude, pos.coords.longitude]);
        console.log('A geolocate event has occurred.');
      });

    map.current.addControl(
      geolocate
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setCoordinates([position.coords.longitude, position.coords.latitude]);
        // centerMap(map, coordinates);
        // console.log(coordinates);
      });
    }

    map.current.on('load', function()
    {
      geolocate.trigger();
    });

    if (pickupCoord && dropoffCoord) {
      addToMap(map.current, pickupCoord, dropoffCoord);
    }
  }, []);

  useEffect(() => centerMap(map.current, coordinates), [coordinates]);

  const centerMap = (map, coordinates) => {
    map.on('load', function () {
      map.flyTo({
         center: [
            coordinates[0],
            coordinates[1]
         ],
         essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
  }

  const addToMap = (map, pickupCoord, dropoffCoord) => {
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker().setLngLat(pickupCoord).addTo(map);

    // Create a default Marker and add it to the map.
    const marker2 = new mapboxgl.Marker().setLngLat(dropoffCoord).addTo(map);

    // Add padding to the map to visualize correctly the markers
    map.fitBounds([pickupCoord, dropoffCoord], { padding: 100 });
  };

  return <Wrapper id="map"></Wrapper>;
};

export default Map;

const Wrapper = tw.div`
flex flex-1  

`;
