import {APIKey, APIBase, optionalPoints } from './API/apiWeather.js';

import {containerCards, input, printError} from './nodos.js'

import {cardContent, cardInfoHeader} from './templates.js'

import {days} from './day.js'

import {moreInformation} from './events.js'

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault(); // se evita el comportamiento por defecto de recarga la pagina
  const data = Object.fromEntries(new FormData(e.target))
  const {city} = data;
  newBegin();

  if( city.trim() === "")
  {
    //mandar el mensaje de que coloque alguna ciudad
    input.classList.remove('normal');
    input.classList.add('alert');
    input.placeholder = 'Ingrese una ubicación';
  }
  else if(input.dataset.li === "on"){

    const objInfo = {
      lat : input.dataset.lat,
      lon : input.dataset.lon,
      name : input.dataset.name,
      state : input.dataset.state,
      country : input.dataset.country
    }
    
    getDataForSevendays(objInfo);
  }
  else {  
    getcoordenates(city);
  }

})

function newBegin() {
  input.classList.add('normal');
  input.classList.remove('alert');
  input.placeholder = 'Ciudad o país';

  printError.innerHTML = '';

  containerCards.innerHTML = '';
}

async function getcoordenates (city, country = "") {

  try {
    const responseGeo = await fetch(`${APIBase}/weather?q=${city}&appid=${APIKey}`);
  
    const dataGeo = await responseGeo.json();
  
    const objInfo = {
      lat : dataGeo.coord.lat,
      lon :dataGeo.coord.lon,
      name : dataGeo.name,
      state : "",
      country : dataGeo.sys.country
    }
  
    getDataForSevendays(objInfo); 
  }
  catch(e) {
    const error = document.createTextNode('❌ Ciudad no encontrada, por favor revisa tu búsqueda');
    printError.appendChild(error);
  }
}

/* Opción weather que sirve para encontrar el lugar de referencia y tambíen la latitud y longitud */
/* objInfo: lat, lon, name, state, country */
async function getDataForSevendays(objInfo){

  /* Para poder hacer la consulta hacia la API para averiguar la latitud y longitud */
  try {
    input.dataset.li = "off";

    const url = `${APIBase}/onecall?lat=${objInfo.lat}&lon=${objInfo.lon}&appid=${APIKey}${optionalPoints}`;
    const response = await fetch(url);
    const data = await response.json(); 

    const {daily} = data;

    const print = [];
    
    daily.forEach((element, index) => {

      const objInfoWeather = {
        date: getDate(getEpoch(element.dt)),
        day: getDay(getEpoch(element.dt)),
        humidity: element.humidity,
        sunrise: getHour(getEpoch(element.sunrise)), // amanecer
        sunset: getHour(getEpoch(element.sunset)), // puesta del sol
        uv: element.uvi,
        description: element.weather[0].description,
        weatherIcon: element.weather.icon,
        tempMax: element.temp.max,
        tempMin: element.temp.min,
        tempMorn: element.temp.morn,
        tempEve: element.temp.eve,
        tempNight: element.temp.night,
      };


      if(index == 0) {
        const cardMain = document.createElement('div');
        cardMain.classList.add('card-main');
        cardMain.innerHTML = cardContent(objInfoWeather);
        // containerCards.appendChild(cardMain);
        print.push(cardMain);
      }

      else {
        const cardInfoWeather = document.createElement('div');
        cardInfoWeather.classList.add('card-info-weather');
        cardInfoWeather.innerHTML = cardInfoHeader(objInfoWeather);

        const cardMain = document.createElement('div');
        cardMain.classList.add('card-main');
        cardMain.classList.add('inactive');
        cardMain.innerHTML = cardContent(objInfoWeather);

        cardInfoWeather.appendChild(cardMain);
        
        print.push(cardInfoWeather);
      }

    });

    const containerCardsWeather = document.createElement('div');
    containerCardsWeather.classList.add('container-cards-weather');
    
    /* Title del container-cards */
    const nameMain = document.createElement('div');
    nameMain.classList.add('name-main');
    const p = document.createElement('p');
    const name = objInfo.name;
    const state = objInfo.state == "" ? objInfo.name : objInfo.state;
    const country = objInfo.country;
    const textNode = document.createTextNode(`${name}, ${state}, ${country}`);
    p.appendChild(textNode);
    nameMain.appendChild(p);
    
    print.forEach( (element,index) => {
      
      if(index == 0){
        containerCards.appendChild(nameMain,containerCardsWeather);
        containerCards.appendChild(element,containerCardsWeather);
      }
      else {
        containerCardsWeather.appendChild(element);
      }
    })
    containerCards.appendChild(containerCardsWeather);
    moreInformation(containerCardsWeather);

  }
  catch(e) {
    //Aqui va el error de consulta
    console.log(e);
    // const error = document.createTextNode('❌ Ciudad no encontrada, por favor revisa tu búsqueda');
    // printError.appendChild(error);
  }
}

function getEpoch(element) {
  return element*1000+212
}

function getDate(element){
  const dateFormat = new Date(element);
  const date = `${dateFormat.getDate()}/${dateFormat.getMonth()+1}`;
  // console.log(date);
  return date;
}

function getHour(element){
  const dateFormat = new Date(element);
  const hour = dateFormat.getHours();
  const minutes = dateFormat.getMinutes() < 10 ? `0${dateFormat.getMinutes()}`: dateFormat.getMinutes();

  const date = `${hour}:${minutes}`;
  // console.log(date);
  return date;
}

function getDay(element){
  const dateFormat = new Date(element);
  const date = days[dateFormat.getDay()];
  // console.log(date);
  return date;
}











const apikey = "563492ad6f91700001000001d5f9568e759a4d9889bc473580b4e14b";
const url = "https://api.pexels.com/v1/search";

async function getPhotos(searchTerm) {
  const response = await fetch(`${url}?query=${searchTerm}`, {
    headers: {
      Authorization: apikey,
    }
  });
  const data = await response.json();
  console.log(data);
}

// getPhotos("winter landscape");

const search = ["winter landscape","mountain landscape","clouds landscape", "sun landscape", "seasons landscape", "weather landscape", "autumn landscape", "landscape"]
