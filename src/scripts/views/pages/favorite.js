import FavoriteMovieIdb from '../../data/fav-resto';
import createRestaurantItemTemplate from '../templates/template-pages';

const Like = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Restorant Favorite Anda</h2>
        <div id="movies"  class="restaurants">
 
        </div>
      </div>
    `;
  },

  async afterRender() {
    const movies = await FavoriteMovieIdb.getAllResto();
    const moviesContainer = document.querySelector('#movies');

    movies.forEach((restaurant) => {
      moviesContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Like;
