import {input,resultsElem} from './nodos.js'
import {APIKey, APIBase, optionalPoints } from './API/apiWeather.js';

let countries = [];
let activeIndex = 0;
let filteredResults = [];
let dataPrueba;

function init() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => (countries = data));

    
  resultsElem.addEventListener("click", (event) => {
    handleResultClick(event);
  });
  input.addEventListener("input", (event) => {
    autocomplete(event);
  });
  input.addEventListener("keyup", (event) => {
    handleResultKeyDown(event);
  });
}

async function autocomplete(event) {
  filteredResults = [];
  const value = input.value;
  try {
    let newApi = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${APIKey}`;
    const prueba = await fetch(newApi);
    filteredResults = await prueba.json();
  }catch(e){
    console.error(e);
  }

  if (!value) {
    hideResults();
    // input.value = "";
    return;
  }
  
  resultsElem.innerHTML = filteredResults
    .map((result, index) => {
      const isSelected = index === 0;
      return `
        <li
          id='autocomplete-result-${index}'
          data-lat = '${result.lat}'
          data-lon = '${result.lon}'
          data-name = '${result.name}'
          data-state = '${result.state}'
          data-country = '${result.country}'
          class='autocomplete-result${isSelected ? " selected" : ""}'
          role='option'
          ${isSelected ? "aria-selected='true'" : ""}
        >
        ${result.name}, ${result.state}, ${result.country}
        </li>
      `;
    })
    .join("");
  resultsElem.classList.remove("hidden");
  // input.dataset.lat = "";
  // input.dataset.lon = "";
}

function handleResultClick(event) {
  if (event.target && event.target.nodeName === "LI") {
    selectItem(event.target);
  }
}
function handleResultKeyDown(event) {
  const { key } = event;
  switch (key) {
    case "Backspace":
      return;
    case "Escape":
      hideResults();
      // input.value = "";
      return;
    case "ArrowUp": {
      if (activeIndex === 0) {
        activeIndex = filteredResults.length - 1;
      }
      activeIndex--;
      break;
    }
    case "ArrowDown": {
      if (activeIndex === filteredResults.length - 1) {
        activeIndex = 0;
      }
      activeIndex++;
      break;
    }
    default:
      selectFirstResult();
  }
  // console.log(activeIndex);
  selectResult();
}

function selectFirstResult() {
  activeIndex = 0;
}

function selectResult() {
  try {
    const value = input.value;
    const autocompleteValue = filteredResults[activeIndex].name.common;
    const activeItem = getItemAt(activeIndex);
  
    if(activeItem){
      activeItem.classList.add('selected');
      activeItem.setAttribute('aria-selected','true');
    }
    if (!value || !autocompleteValue) {
      return;
    }
    // if (value !== autocompleteValue.innerText) {
    //   input.value = autocompleteValue.innerText;
    //   input.setSelectionRange(
    //     value.length,
    //     autocompleteValue.innerText.length
    //   );
    // }
  }
  catch(e){
    // console.log(e);
  }
}

function selectItem(node) {
  if (node) {
    input.dataset.lat = node.dataset.lat;
    input.dataset.lon = node.dataset.lon;
    input.dataset.name = node.dataset.name;
    input.dataset.state = node.dataset.state;
    input.dataset.country = node.dataset.country;
    input.dataset.li = "on";
    input.value = node.innerText;
    hideResults();
  }
}

function hideResults() {
  resultsElem.innerHTML = "";
  resultsElem.classList.add("hidden");
}

function getItemAt(index) {
  return resultsElem.querySelector(`#autocomplete-result-${index}`)
}

init();