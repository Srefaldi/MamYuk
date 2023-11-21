import { itActsAsFavoriteMovieModel } from './contracts/favoriteMovieContract';
import FavoriteMovieIdb from '../src/scripts/data/fav-resto';

describe('Favorite Movie Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteMovieIdb.getAllResto()).forEach(async (Resto) => {
      await FavoriteMovieIdb.delateResto(Resto.id);
    });
  });

  itActsAsFavoriteMovieModel(FavoriteMovieIdb);
});
