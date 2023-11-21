import LikeButtonInitiator from '../../src/scripts/utils/like-button-presenter';
import FavoriteMovieIdb from '../../src/scripts/data/fav-resto';

const createLikeButtonPresenterWithListResto = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteResto: FavoriteMovieIdb,
    restaurant,
  });
};
// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithListResto };
