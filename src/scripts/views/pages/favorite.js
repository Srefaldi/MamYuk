import FavoriteMovieIdb from '../../data/fav-resto';
import createRestaurantItemTemplate from '../templates/template-pages';

const Like = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Restorant Favorite Anda</h2>
        <div id="movies" class="restaurants">
 
        </div>
      </div>
    `;
  },

  async afterRender() {
    const movies = await FavoriteMovieIdb.getAllResto();
    const moviesContainer = document.querySelector('#movies');
    const emptyFavoriteRestoText = 'Tidak Ada Resto Yang Disukai';

    if (movies.length === 0) {
      moviesContainer.innerHTML = `<h1>${emptyFavoriteRestoText}</h1>`;
    } else {
      movies.forEach((restaurant) => {
        moviesContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default Like;
