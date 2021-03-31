const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
//console.log(details);

var button = document.querySelector('.btn');
console.log(button);
button.addEventListener('click', () => {
    console.log('Refresh clicked');
});

document.addEventListener('DOMContentLoaded', async () => {
    const weather = await loadWeather();
    console.log(weather);

    let city = document.querySelector('.my-3');
    city.innerHTML = weather.name;
    
    console.log(`<img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" class="pull-left mr-2">`);

    let display = document.querySelector('.display-4');
    display.innerHTML = `\
    <img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" class="pull-left mr-2">\
    <span>${weather.weather[0].description}</span><br>\
    <span>${weather.main.temp}</span><span> &deg;C</span><br>\
    <span>${weather.main.pressure}</span><span> HPa</span><br>\
    <span>${weather.main.humidity}</span><span>%</span><br>`;

    //mapa
    var center = SMap.Coords.fromWGS84(weather.coord.lon, weather.coord.lat);
    var m = new SMap(JAK.gel("mapa"), center, 13);
    m.addDefaultLayer(SMap.DEF_BASE).enable();
    m.addDefaultControls();

    var sync = new SMap.Control.Sync({bottomSpace:30}); 
    m.addControl(sync);

});