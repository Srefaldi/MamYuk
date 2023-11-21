import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteMovieIdb = {
  async getResto(id) {
    if (!id) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllResto() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putResto(Resto) {
    // eslint-disable-next-line no-prototype-builtins
    if (!Resto.hasOwnProperty('id')) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return (await dbPromise).put(OBJECT_STORE_NAME, Resto);
  },
  async delateResto(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
  async searchResto(query) {
    const db = await dbPromise;
    const normalizedQuery = query.toLowerCase();
    const allMovies = await db.getAll(OBJECT_STORE_NAME);

    return allMovies.filter((movie) => {
      const normalizedTitle = movie.title.toLowerCase();
      return normalizedTitle.includes(normalizedQuery);
    });
  },
};

export default FavoriteMovieIdb;
