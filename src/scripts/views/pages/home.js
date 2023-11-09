import { getRestaurants } from '../../data/resto-source';
import createRestaurantItemTemplate from '../templates/template-pages';

const Home = {
  async render() {
    return `
    <div class="content">
    <h2 class="content__heading">Temukan Restoran Favorite Anda</h2>
    <div class="restaurants" id="restaurants">
    </div>
    <div id="loadingIndicator" class="loading-indicator">Loading...</div>
    <div id="errorContainer" class="error-container"></div>
  </div>
  
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');
    const loadingIndicator = document.querySelector('#loadingIndicator');
    const errorContainer = document.querySelector('#errorContainer');

    loadingIndicator.style.display = 'block';

    try {
      const restaurants = await getRestaurants();

      if (restaurants.restaurants) {
        loadingIndicator.style.display = 'none';
        restaurants.restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      }
    } catch (error) {
      loadingIndicator.style.display = 'none';
      errorContainer.innerHTML = 'Error fetching data';
      console.error(error);
    }
  },
};

export default Home;
