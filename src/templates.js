
const cardContent = (objInfoWeather) => {

  const cardMainContent = 
  `<div class="card-main--content">
  <div class="date">
    <p>
      <span>${objInfoWeather.day} ${objInfoWeather.date}</span>
    </p>
  </div>

  <div class="temperature">

    <div class="temperature-day">
      <p class="flex">
        Día
        <span class="icon">
          <ion-icon name="partly-sunny-outline"></ion-icon>
        </span>
      </p>
      <span>${objInfoWeather.tempMorn}°</span>
    </div>

    <div class="temperature-day">
      <p class="flex">
        Tarde
        <span class="icon">
          <ion-icon name="sunny-outline"></ion-icon>
        </span>
      </p>
      <span>${objInfoWeather.tempEve}°</span>
    </div>

    <div class="temperature-day">
      <p class="flex">
        Noche
        <span class="icon">
          <ion-icon name="cloudy-night-outline"></ion-icon>
        </span>
      </p>
      <span>${objInfoWeather.tempNight}°</span>
    </div>

  </div>

  <div class="description">
    <p>Descripción: ${objInfoWeather.description}</p>
  </div>

  <div class="card-more-description">
    <div class="card-more-description-container">
      <div class="card-more-description--features">
        <span class="icon">
          <ion-icon name="water-outline"></ion-icon>
        </span>
        <div class="description-icon">
          <p>Humedad</p>
          <p class="strong">${objInfoWeather.humidity}%</p>
        </div>
      </div>

      <div class="card-more-description--features">
        <span class="icon">
          <ion-icon name="sunny-outline"></ion-icon>
        </span>
        <div class="description-icon">
          <p>Indice UV</p>
          <p class="strong">${objInfoWeather.uv}</p>
        </div>
      </div>
    </div>

    <div class="card-more-description-container">
      <div class="card-more-description--features">
        <div class="mix-icons">
          <span class="icon--mix">
            <ion-icon name="arrow-up-outline"></ion-icon>
          </span>
          <span class="icon--mix">
            <ion-icon name="sunny-outline"></ion-icon>
          </span>
        </div>
        <div class="description-icon">
          <p>Salida del sol</p>
          <p class="strong">${objInfoWeather.sunrise}</p>
        </div>
      </div>
      <div class="card-more-description--features">
        <div class="mix-icons">
          <span class="icon--mix">
            <ion-icon name="arrow-down-outline"></ion-icon>
          </span>
          <span class="icon--mix">
            <ion-icon name="sunny-outline"></ion-icon>
          </span>
        </div>
        <div class="description-icon">
          <p>Puesta de sol</p>
          <p class="strong">${objInfoWeather.sunset}</p>
        </div>
      </div>
    </div>
  </div>
</div>`;

return cardMainContent;
};

const cardInfoHeader = (objInfoWeather) => {

  const cardInfo = 
  `
<div class="card-info--header">
                <span>
                  <!-- Day     -->
                  <span>${objInfoWeather.date}</span>
                  <span class="temperature-header">
                    Max ${objInfoWeather.tempMax}° - Min ${objInfoWeather.tempMin}°
                    <div class="icon-temperature">
                      <img src="./img/thermometer-outline.svg" alt="Termometro">
                    </div>
                </span>
                </span>

                <button class="deploy-description">
                  <span class="icon icon-maxium-description active">
                    <ion-icon name="caret-down-circle-outline"></ion-icon>
                  </span>
                  <span class="icon icon-miniun-description inactive">
                    <ion-icon name="caret-up-circle-outline"></ion-icon>
                  </span>
                </button>
              </div>
`

return cardInfo;
};

export {cardContent,cardInfoHeader}