class FavoriteRestoSearchPresenter {
  constructor({ favoriteResto }) {
    this._listenToSearchRequestByUser();
    this._favoriteResto = favoriteResto;
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchResto(event.target.value);
    });
  }

  async _searchResto(latestQuery) {
    this._latestQuery = latestQuery.trim();
    const foundMovies = await this._favoriteResto.searchResto(this._latestQuery);
    this._showFoundMovies(foundMovies);
  }

  // eslint-disable-next-line class-methods-use-this
  _showFoundMovies(movies) {
    if (!movies || movies.length === 0) {
      // Menangani kasus jika movies kosong atau null
      document.querySelector('.movies').innerHTML = '<li>No movies found</li>';
    } else {
      const html = movies.reduce(
        (carry, movie) => carry.concat(`
          <li class="movie">
            <span class="movie__title">${movie.title || '-'}</span>
          </li>
        `),
        '',
      );

      document.querySelector('.movies').innerHTML = html;

      document
        .getElementById('movie-search-container')
        .dispatchEvent(new Event('movies:searched:updated'));
    }
  }

  get latestQuery() {
    return this._latestQuery;
  }
}
export default FavoriteRestoSearchPresenter;
