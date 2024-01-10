const mapboxAccessToken =
  "pk.eyJ1IjoibWljdTAxIiwiYSI6ImNscjN4emk5bTAyODYycmw3eGl1ODJ6ZXUifQ.53Ou-aCAC_Kfp2yo9bjUOg";

export const coordsToPlace = async (coordinates) => {
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxAccessToken}`;
  const response = await fetch(endpoint);
  const place = await response.json();
  return place.features[0] ? place.features[0].place_name : null;
};

export const textToPlaces = async (input, proximityCoords) => {
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    input
  )}.json?proximity=${proximityCoords[0]},${
    proximityCoords[1]
  }&access_token=${mapboxAccessToken}`;
  const response = await fetch(endpoint);
  const places = await response.json();
  return places.features.map((place) => place.place_name);
};

// export default {coordsToPlace};
