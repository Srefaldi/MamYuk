import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => {
  // Memotong deskripsi menjadi maksimal 30 kata
  const descriptionWords = restaurant.description.split(' ');
  const maxWords = 20;
  const truncatedDescription = descriptionWords.slice(0, maxWords).join(' ');

  return `
    <div class="restaurant-item">
      <div class="restaurant-item__header">
        <img class="restaurant-item__header__image lazyload" alt="${restaurant.name}"
        src="${CONFIG.BASE_IMAGE_URL_SM + restaurant.pictureId}">
      </div>
      <div class="restaurant-item__content">
        <h1><a class="card-title" href="/#/detail/${restaurant.id}">${restaurant.name}</a></h1>
        <h3>City : ${restaurant.city}</h3>
        <p class="restaurant-rating">⭐️ <span>${restaurant.rating}</span></p>
        <p>${truncatedDescription}...</p> <!-- Menampilkan deskripsi yang dipotong -->
      </div>
    </div>
  `;
};
export default createRestaurantItemTemplate;
