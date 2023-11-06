import FavoriteMovieIdb from '../data/fav-resto';
import { createLikeButtonTemplate, createUnLikedButtonTemplate } from '../views/templates/like-button';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this.restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this.restaurant;

    if (await this.restaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async restaurantExist(id) {
    const movie = await FavoriteMovieIdb.getResto(id);
    return !!movie;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.putResto(this.restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnLikedButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteMovieIdb.delateResto(this.restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
