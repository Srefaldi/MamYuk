import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__image" alt="${restaurant.name}"
      src="${CONFIG.BASE_IMAGE_URL_SM + restaurant.pictureId}">
    </div>
    <div class="restaurant-item__content">
      
      <h1><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h1>
      <h3>City : ${restaurant.city}</h3>
      
      <p class="restaurant-rating">⭐️<span>${restaurant.rating}</span></p>
      <p>${restaurant.description}</p>
    </div>
  </div>
`;

export default createRestaurantItemTemplate;
