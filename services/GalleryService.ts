const API_KEY = '88fd3895463b4c5c914f9a9435d871a3';

export const fetchCoordinates = async (place: string) => {
    try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            place,
          )}&key=${API_KEY}`,
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const location = data.results[0].geometry;
          const coordinates = {
            latitude: parseFloat(location.lat),
            longitude: parseFloat(location.lng),
          };
          console.log(coordinates);
          return {coordinates: coordinates,loading: false};
        } else {
          console.log('Coordinates not found');
          return {coordinates: null,loading: false};
        }
    } catch (error) {
        console.error(error);
        return {coordinates: null,loading: false};
    }
};
