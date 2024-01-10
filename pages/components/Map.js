import { useEffect, useRef, useState, useContext } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";
import AppContext from "../../data/appContext";
import * as turf from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWljdTAxIiwiYSI6ImNscjN4emk5bTAyODYycmw3eGl1ODJ6ZXUifQ.53Ou-aCAC_Kfp2yo9bjUOg";

const Map = ({ pickupCoordinate, dropoffCoordinate, style, radius }) => {
  const map = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const { coordinates, setCoordinates } = useContext(AppContext);
  // const {coordinates, setCoordinates} = userCoordinates;
  // const [walkDistance, setWalkDistance] = useState(100);

  // useEffect(() => {
  //   var center = [84.82512804700335, 26.241818082937552];
  //   var radius = 5;
  //   var options = {steps: 50, units: 'kilometers', properties: {foo: 'bar'}};
  //   var circle = turf.circle(center, radius, options);
  // }, [walkDistance]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoordinates([position.coords.longitude, position.coords.latitude]);
      });
    }
  }, []);

  useEffect(() => {
    if (coordinates) {
      map.current = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 5,
        center: coordinates,
      });

      var geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      });

      geolocate.on("geolocate", (pos) => {
        centerMap(map.current, [pos.coords.latitude, pos.coords.longitude]);
        console.log("A geolocate event has occurred.");
      });

      map.current.addControl(geolocate);

      if (!pickupCoordinate && !dropoffCoordinate)
        map.current.on("load", () => {
          geolocate.trigger();
        });

      if (pickupCoordinate && dropoffCoordinate) {
        addToMap(map.current, pickupCoordinate, dropoffCoordinate);
      }
      map.current.on("load", () => {
        circleWalkable(map.current);
        setLoaded(true);
      });
    }
  }, [coordinates]);

  const circleWalkable = (map) => {
    if (map && radius !== undefined && loaded) {
      var center = dropoffCoordinate;
      var options = {
        steps: 50,
        units: "kilometers",
        properties: { foo: "bar" },
      };
      var circle = turf.circle(center, radius, options);
      console.log(circle);
      if (circle) {
        if (map.getSource("walkDistance")) {
          map.getSource("walkDistance").setData(circle);
        } else {
          map.addSource("walkDistance", {
            type: "geojson",
            data: circle,
          });
          map.addLayer({
            id: "walkDistance",
            type: "fill",
            source: "walkDistance", // reference the data source
            layout: {},
            paint: {
              "fill-color": "#0080ff", // blue color fill
              "fill-opacity": 0.5,
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    circleWalkable(map.current);
  }, [radius, loaded]);

  // useEffect(() => {
  //   console.log(pickupCoordinate, dropoffCoordinate);
  // }, [pickupCoordinate, dropoffCoordinate]);

  const centerMap = (map, coordinates) => {
    map.on("load", function () {
      map.flyTo({
        center: [coordinates[0], coordinates[1]],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    });
  };

  async function getRoute(map, start, end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoibWljdTAxIiwiYSI6ImNscjN4emk5bTAyODYycmw3eGl1ODJ6ZXUifQ.53Ou-aCAC_Kfp2yo9bjUOg",
        })
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.routes[0]);
        if (data.routes[0]) {
          const route = data.routes[0].geometry.coordinates;
          console.log(route);
          const geojson = {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          };
          // if the route already exists on the map, we'll reset it using setData
          if (map.getSource("route")) {
            map.getSource("route").setData(geojson);
          }
          // otherwise, we'll make a new request
          else {
            map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: geojson,
              },
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "#3887be",
                "line-width": 5,
                "line-opacity": 0.75,
              },
            });
          }
        }
      });
  }

  const addToMap = (map, pickupCoord, dropoffCoord) => {
    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker().setLngLat(pickupCoord).addTo(map);

    // Create a default Marker and add it to the map.
    const marker2 = new mapboxgl.Marker().setLngLat(dropoffCoord).addTo(map);

    // Add padding to the map to visualize correctly the markers
    map.fitBounds([pickupCoord, dropoffCoord], { padding: 100 });
    getRoute(map, pickupCoord, dropoffCoord);
  };

  return <Wrapper id="map" style={style}></Wrapper>;
};

export default Map;

const Wrapper = tw.div`
flex flex-1  

`;
