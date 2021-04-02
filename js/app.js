const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.owf');
console.log(icon);

const updateWeather = async (city) => {
    const weather = await getWeather(city);
    updateUI(weather);
    //console.log(weather);
    const forecast = await getForecast(weather.coord.lon, weather.coord.lat);
    console.log(forecast);
};

const updateMap = (weather) => {
    //mapa
    var center = SMap.Coords.fromWGS84(weather.coord.lon, weather.coord.lat);
    var m = new SMap(JAK.gel("mapa"), center, 10);
    m.addDefaultLayer(SMap.DEF_BASE).enable();
    m.addDefaultControls();

    var sync = new SMap.Control.Sync({bottomSpace:30}); 
    m.addControl(sync);
};

const updateUI = (weather) => {
    console.log("__updateUI__")

    const dt = {
        date:     new Date(weather.dt*1e3),
        tz:       weather.timezone*1e3,
        sunrise:  new Date(weather.sys.sunrise*1e3),
        sunset:   new Date(weather.sys.sunset*1e3)

    };
    console.log(`Date: ${dt.date} \n TZ: ${dt.tz} \n Sunrise: ${dt.sunrise} \n Sunset: ${dt.sunset}`);
    //update icon
    const image = (dt.sunrise < dt.date < dt.sunset) ? "img/day.svg" : "img/night.svg";
    time.setAttribute('src', image);
    
    const iconSrc = `owf owf-${weather.weather[0].id} owf-5x text-center`;
    console.log(iconSrc);
    //icon.setAttribute('src', `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`);
    icon.setAttribute('class', iconSrc);

    details.innerHTML = `
        <h5 class="my-3">${weather.name}</h5>
        <div class="my-3">${weather.weather[0].description}</div>
        <div class="display-4 my-4">
            <span>${weather.main.temp}</span><span>&deg;C</span><br>
            <span>${weather.main.pressure}</span><span> HPa</span><br>
            <span>${weather.main.humidity}</span><span>%</span><br>
        </div>
    `;

    //remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

    updateMap(weather);

}; 

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateWeather(city);

});
/*
// button
const button = document.querySelector('.btn');
button.addEventListener('click', () => {
    console.log('Refresh clicked');
});
*/
document.addEventListener('DOMContentLoaded', async () => {
    updateWeather('Brno');    
});