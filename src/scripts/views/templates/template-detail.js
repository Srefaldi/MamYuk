import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => {
  const {
    name,
    pictureId,
    address,
    city,
    description,
    menus,
    customerReviews,
  } = restaurant;

  const foodMenu = menus.foods
    .map((food) => `<li>${food.name}</li>`)
    .join('');
  const drinkMenu = menus.drinks
    .map((drink) => `<li>${drink.name}</li>`)
    .join('');
  const reviews = customerReviews
    .map(
      (review) => `
      <div class="review-item">
        <p><strong>${review.name}</strong></p>
        <p>${review.review}</p>
        <p>${review.date}</p>
      </div>
    `,
    )
    .join('');

  return `
    <div class="restaurant-detail">
      <h2 class="restaurant__name">${name}</h2>
      <img class="restaurant__image" src="${CONFIG.BASE_IMAGE_URL_SM + pictureId}" alt="${name}" />
      <div class="restaurant__info">
        <h3>Information</h3>
        <h4>Rating</h4>
        <p>⭐️<span class="movie-item__header__rating__score">${restaurant.rating}</span></p>
        <h4>City</h4>
        <p>${city}</p>
        <h4>Address</h4>
        <p>${address}</p>
      </div>
      <div class="restaurant__description">
        <h3>Description</h3>
        <p>${description}</p>
      </div>
      <div class="restaurant__menu">
        <h3>Menu</h3>
        <h4>Food</h4>
        <ul>${foodMenu}</ul>
        <h4>Drinks</h4>
        <ul>${drinkMenu}</ul>
      </div>
      <div class="restaurant__reviews">
        <h3>Customer Reviews</h3>
        ${reviews}
      </div>
      
    </div>
  `;
};

export default createRestaurantDetailTemplate;
