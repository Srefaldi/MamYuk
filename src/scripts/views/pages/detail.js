import UrlParser from '../../routes/url-pages';
import { getRestaurantDetail } from '../../data/resto-source';
import createRestaurantDetailTemplate from '../templates/template-detail';

const Detail = {
  async render() {
    return `
      <div class="content">
        <div class="restaurant-detail" id="restaurant-detail">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetailContainer = document.querySelector('#restaurant-detail');

    try {
      const restaurant = await getRestaurantDetail(url.id);

      if (restaurant.restaurant) {
        restaurantDetailContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);
      }
    } catch (error) {
      console.error(error);
      restaurantDetailContainer.innerHTML = 'Error fetching restaurant details';
    }
  },
};

export default Detail;
