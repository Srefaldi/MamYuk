import { getRestaurants } from '../../data/resto-source';
import createRestaurantItemTemplate from '../templates/template-pages';

const Home = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">List of Restaurants</h2>
        <div class="restaurants" id="restaurants">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurantsContainer = document.querySelector('#restaurants');

    try {
      const restaurants = await getRestaurants();

      if (restaurants.restaurants) {
        restaurants.restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      }
    } catch (error) {
      console.error(error);
      restaurantsContainer.innerHTML = 'Error fetching data';
    }
  },
};

export default Home;
