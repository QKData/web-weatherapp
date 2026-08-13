// src/index.js
import { Todo } from './todo.js';
import { AppController } from './appController.js';
import { DOM } from './dom.js';
import './style.css';

export function processWeatherData(rawWeatherData) {
  const current = rawWeatherData?.currentConditions ?? {};
  const today = rawWeatherData?.days?.[0] ?? {};

  return {
    location: rawWeatherData?.address ?? 'Unknown location',
    description: rawWeatherData?.description ?? current.conditions ?? today.conditions ?? '',
    currentTemp: current.temp ?? today.temp ?? null,
    feelsLike: current.feelslike ?? today.feelslike ?? null,
    highTemp: today.tempmax ?? null,
    lowTemp: today.tempmin ?? null,
    humidity: current.humidity ?? today.humidity ?? null,
    windSpeed: current.windspeed ?? today.windspeed ?? null,
    conditions: current.conditions ?? today.conditions ?? '',
    icon: current.icon ?? today.icon ?? '',
  };
}

async function getLocation(city = 'london') {
  try {
    const encodedCity = encodeURIComponent(city);
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity}?unitGroup=us&key=G89X899ZUNJRADGXYXP373CCM&contentType=json`);
    const rawWeatherData = await response.json();
    const weatherData = processWeatherData(rawWeatherData);

    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// const cityInput = document.querySelector('#city-input');

// document.querySelector('#search-btn').addEventListener('click', () => {
//   const city = cityInput.value.trim() || 'london';
//   getLocation(city);
// });

getLocation();