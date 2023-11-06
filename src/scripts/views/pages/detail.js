import UrlParser from '../../routes/url-pages';
import { getRestaurantDetail } from '../../data/resto-source';
import createRestaurantDetailTemplate from '../templates/template-detail';
import LikeButtonInitiator from '../../utils/plus-like-button';

const Detail = {
  async render() {
    return `
      <div class="content">
        <div class="restaurant-detail" id="restaurant-detail">
        </div>
        <div id="likeButtonContainer"></div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetailContainer = document.querySelector('#restaurant-detail');

    try {
      const restaurant = await getRestaurantDetail(url.id);

      if (restaurant.restaurant) {
        // Menampilkan detail restoran
        restaurantDetailContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

        // Inisialisasi tombol "Suka" dengan data restoran
        LikeButtonInitiator.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          restaurant: {
            id: restaurant.restaurant.id,
            name: restaurant.restaurant.name,
            description: restaurant.restaurant.description,
            pictureId: restaurant.restaurant.pictureId,
            address: restaurant.restaurant.address,
            city: restaurant.restaurant.city,
            rating: restaurant.restaurant.rating,
            // tambahkan properti lain yang Anda butuhkan dari objek restoran
          },
        });
      }
    } catch (error) {
      console.error(error);
      restaurantDetailContainer.innerHTML = 'Error fetching restaurant details';
    }
  },
};

export default Detail;
