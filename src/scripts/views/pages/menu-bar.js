class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const response = await fetch('data/DATA.json');
    const data = await response.json();

    const style = `
            <style>
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    justify-items: center;
                    text-align: center;
                }

                .restaurant-card {
                    background-color: #0B2447;
                    box-shadow: 5px 5px 5px rgba(0.5, 0.5, 0.5, 0.5);
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.1s;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .restaurant-card:hover {
                    transform: scale(1.02);
                }

                .restaurant-image {
                    max-width: 100%;
                    height: 300px; 
                    object-fit: cover;
                }

                .restaurant-info {
                    color: white;
                    padding: 20px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .restaurant-name {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                .restaurant-city {
                    font-size: 1rem;
                    color: #888;
                    margin-bottom: 10px;
                }

                .restaurant-rating {
                    font-size: 1rem;
                    color: #f8c10a;
                    margin-bottom: 10px;
                }

                .restaurant-description {
                    font-size: 1rem;
                    color: white;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                @media screen and (max-width: 600px) {
                    .container {
                        grid-template-columns: 1fr;
                    }

                    .restaurant-card {
                        height: auto;
                    }
                }
                .title {
                    text-align: center; 
                    margin-bottom: 20px; 
                }
                a, button, input, input[type='text'], textarea {
                    min-width: 44px;
                    min-height: 44px;
                }
            </style>
            <h1 class="title">Temukan Restorant Favorite Anda</h1>
        `;

    const container = document.createElement('div');
    container.setAttribute('class', 'container');

    data.restaurants.forEach((restaurantData) => {
      const restaurantCard = document.createElement('div');
      restaurantCard.setAttribute('class', 'restaurant-card');
      restaurantCard.setAttribute('tabindex', '0');

      const restaurantImage = document.createElement('img');
      restaurantImage.setAttribute('class', 'restaurant-image');
      restaurantImage.setAttribute('src', restaurantData.pictureId);
      restaurantImage.setAttribute('alt', restaurantData.name);

      const restaurantInfo = document.createElement('div');
      restaurantInfo.setAttribute('class', 'restaurant-info');

      const restaurantName = document.createElement('div');
      restaurantName.setAttribute('class', 'restaurant-name');
      restaurantName.textContent = restaurantData.name;

      const restaurantCity = document.createElement('div');
      restaurantCity.setAttribute('class', 'restaurant-city');
      restaurantCity.textContent = restaurantData.city;

      const restaurantRating = document.createElement('div');
      restaurantRating.setAttribute('class', 'restaurant-rating');
      restaurantRating.textContent = `Rating: ${restaurantData.rating}`;

      const restaurantDescription = document.createElement('div');
      restaurantDescription.setAttribute('class', 'restaurant-description');
      restaurantDescription.textContent = restaurantData.description;

      restaurantInfo.appendChild(restaurantName);
      restaurantInfo.appendChild(restaurantCity);
      restaurantInfo.appendChild(restaurantRating);
      restaurantInfo.appendChild(restaurantDescription);

      restaurantCard.appendChild(restaurantImage);
      restaurantCard.appendChild(restaurantInfo);

      container.appendChild(restaurantCard);
    });

    this.shadowRoot.innerHTML = style;
    this.shadowRoot.appendChild(container);
  }
}

customElements.define('menu-bar', RestaurantList);
