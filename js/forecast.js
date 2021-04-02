console.log('__forecast__');

const API_ID = "14f53b553cd123cad205a0fb4ff25106";

const getWeather = async (city) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_ID}`;
    const options = {};
	return (await fetch(url, options)).json();

};

/*
const weather = {
    coord: {
        lon: 16.608,
        lat: 49.1952
    },
    weather: [{
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d"
    }],
    base: "stations",
    main: {
        temp: 14.59,
        feels_like: 13.04,
        temp_min: 13,
        temp_max: 16.11,
        pressure: 1027,
        humidity: 58
    },
    visibility: 10000,
    wind: {
        speed: 1.03,
        deg: 0
    },
    clouds: {
        all: 0
    },
    dt: 1617178243,
    sys: {
        type: 1,
        id: 6851,
        country: "CZ",
        sunrise: 1617165171,
        sunset: 1617211337
    },
    timezone: 7200,
    id: 3078610,
    name: "Brno",
    cod: 200
};
*/

const getForecast = async (cityId) => {

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityId}&units=metric&appid=${API_ID}`;
    const options = {};
	return (await fetch(url, options)).json();

};

