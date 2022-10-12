export const moreInformation = (containerCardsWeather) => {
  containerCardsWeather.addEventListener("click", (evento) => {
    let cardWeather =  "";
  
    for(const element of evento.path) {
      try {
        if(element.classList.contains('card-info-weather')){
          cardWeather = element;
          break;
        }
      }
      catch {
      }
      
    }  
  
    const {cardContentWeather,buttonMax,buttonMin} = getElements(cardWeather);
  
    if(evento.target.name === 'caret-down-circle-outline'){
      showDescription(cardContentWeather,buttonMax,buttonMin);
    }
    else if(evento.target.name === 'caret-up-circle-outline'){
      showNoDescription(cardContentWeather,buttonMax,buttonMin);
    }
  
  })
}


function getElements(element) {
  const cardWeather = element;
  const cardHeader = element.firstElementChild;
  const button = cardHeader.lastElementChild;
  const buttonMax = button.firstElementChild;
  const buttonMin = button.lastElementChild;
  const cardContentWeather = element.lastElementChild;

  return {cardContentWeather, buttonMax, buttonMin}
}

function showDescription(cardContentWeather,buttonMax,buttonMin) {

  cardContentWeather.classList.remove("inactive");

  buttonMax.classList.remove("active");
  buttonMax.classList.add("inactive");

  buttonMin.classList.remove("inactive");
  buttonMin.classList.add("active");
}

function showNoDescription(cardContentWeather,buttonMax,buttonMin) {

  cardContentWeather.classList.remove("active");
  cardContentWeather.classList.add("inactive");
  
  buttonMax.classList.remove("inactive");
  buttonMax.classList.add("active");

  buttonMin.classList.remove("active");
  buttonMin.classList.add("inactive");
}