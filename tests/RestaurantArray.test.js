import { itActsAsFavoriteMovieModel } from './contracts/favoriteMovieContract';

let RestoFavArray = [];

const FavoriteMovieArray = {
  getResto(id) {
    if (!id) {
      return;
    }

    return RestoFavArray.find((Resto) => Resto.id == id);
  },

  getAllResto() {
    return RestoFavArray;
  },

  putResto(Resto) {
    // eslint-disable-next-line no-prototype-builtins
    if (!Resto.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar RestoFavArray
    if (this.getResto(Resto.id)) {
      return;
    }

    RestoFavArray.push(Resto);
  },

  delateResto(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    RestoFavArray = RestoFavArray.filter((Resto) => Resto.id != id);
  },
};

describe('Favorite Movie Array Contract Test Implementation', () => {
  afterEach(() => {
    RestoFavArray = [];
  });

  itActsAsFavoriteMovieModel(FavoriteMovieArray);
});
