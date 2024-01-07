const mapboxAccessToken = "NULL";


export const coordsToPlace = async (coordinates) => {
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxAccessToken}`;
    const response = await fetch(endpoint);
    const place = await response.json();
    return place.features[0].place_name;
}

// export default {coordsToPlace};