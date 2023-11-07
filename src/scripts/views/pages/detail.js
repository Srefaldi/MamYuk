import UrlParser from '../../routes/url-pages';
import createRestaurantDetailTemplate from '../templates/template-detail';
import LikeButtonInitiator from '../../utils/plus-like-button';
import { postReview, getRestaurantDetail } from '../../data/resto-source';

const Detail = {
  async render() {
    return `
      <div class="content">
        <div class="restaurant-detail" id="restaurant-detail">
        </div>
        <div id="likeButtonContainer"></div>
        <div id="reviewFormContainer" class="restaurant-detail">
          <h2 class="restaurant__name">Add Your Review</h2>
          <form class="restaurant__info" id="reviewForm">
            <label for="name">Your Name</label>
            <input type="text" id="name" name="name" required>
            <label for="review">Your Review</label>
            <textarea id="review" name="review" required></textarea>
            <button type="submit">Submit Review</button>
          </form>
        </div>
        <div id="loadingIndicator" class="loading-indicator">
        <div class="spinner"></div>
        <h1>Loading...</h1>
      </div>
      <div id="errorContainer" class="error-container"></div>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantDetailContainer = document.querySelector('#restaurant-detail');
    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    const reviewForm = document.querySelector('#reviewForm');
    const loadingIndicator = document.querySelector('#loadingIndicator');
    const errorContainer = document.querySelector('#errorContainer');

    loadingIndicator.style.display = 'block';

    try {
      const restaurant = await getRestaurantDetail(url.id);

      if (restaurant.restaurant) {
        loadingIndicator.style.display = 'none';

        LikeButtonInitiator.init({
          likeButtonContainer,
          restaurant: {
            id: restaurant.restaurant.id,
            name: restaurant.restaurant.name,
            description: restaurant.restaurant.description,
            pictureId: restaurant.restaurant.pictureId,
            address: restaurant.restaurant.address,
            city: restaurant.restaurant.city,
            rating: restaurant.restaurant.rating,
          },
        });

        restaurantDetailContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

        reviewForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const nameInput = document.querySelector('#name');
          const reviewInput = document.querySelector('#review');

          const name = nameInput.value;
          const review = reviewInput.value;

          try {
            const response = await postReview({
              id: url.id,
              name,
              review,
            });

            if (response.error === false) {
              const reviewElement = document.createElement('div');
              const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
              reviewElement.className = 'review-item';
              reviewElement.innerHTML = `
                <p><strong>${name}</strong></p>
                <p>${review}</p>
                <p>${new Date().toLocaleDateString('id-ID', dateOptions)}</p>
              `;

              const reviewsContainer = document.querySelector('.restaurant__reviews');
              reviewsContainer.appendChild(reviewElement);

              nameInput.value = '';
              reviewInput.value = '';

              console.log('Review submitted successfully');
            } else {
              console.error('Error submitting review:', response.message);
            }
          } catch (error) {
            console.error('Error submitting review:', error);
          }
        });
      }
    } catch (error) {
      loadingIndicator.style.display = 'none';
      errorContainer.innerHTML = 'Error fetching restaurant details';
      console.error(error);
    }
  },
};

export default Detail;
