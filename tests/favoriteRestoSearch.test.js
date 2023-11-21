import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/linked-resto/favorite-resto-search-presenter';

// eslint-disable-next-line no-undef
describe('Searching resto', () => {
  let presenter;
  let favoriteResto;

  const searchResto = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestoSearchContainer = () => {
    document.body.innerHTML = `
      <div id="movie-search-container">
        <input id="query" type="text">
        <div class="movie-result-container">
          <ul class="movies">
          </ul>
        </div>
      </div>
    `;
  };

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    setRestoSearchContainer();
    favoriteResto = {
      // eslint-disable-next-line no-undef
      searchResto: jest.fn(),
    };
    presenter = new FavoriteRestoSearchPresenter({
      favoriteResto,
    });
  });

  // eslint-disable-next-line no-undef
  describe('When query is not empty', () => {
    // eslint-disable-next-line no-undef
    it('should be able to capture the query typed by the user', () => {
      favoriteResto.searchResto.mockImplementation(() => []);
      searchResto('film a');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery).toEqual('film a');
    });

    // eslint-disable-next-line no-undef
    it('should ask the model to search for liked movies', () => {
      favoriteResto.searchResto.mockImplementation(() => []);
      searchResto('film a');
      // eslint-disable-next-line no-undef
      expect(favoriteResto.searchResto).toHaveBeenCalledWith('film a');
    });

    // eslint-disable-next-line no-undef
    it('should show the found movies', () => {
      presenter._showFoundMovies([{ id: 1 }]);
      // eslint-disable-next-line no-undef
      expect(document.querySelectorAll('.movie').length).toEqual(1);
      presenter._showFoundMovies([
        { id: 1, title: 'Satu' },
        { id: 2, title: 'Dua' },
      ]);
      // eslint-disable-next-line no-undef
      expect(document.querySelectorAll('.movie').length).toEqual(2);
    });

    // eslint-disable-next-line no-undef
    it('should show the title of the found movies', () => {
      presenter._showFoundMovies([{ id: 1, title: 'Satu' }]);
      // eslint-disable-next-line no-undef
      expect(document.querySelectorAll('.movie__title')
        .item(0).textContent)
        .toEqual('Satu');
      presenter._showFoundMovies([
        { id: 1, title: 'Satu' },
        { id: 2, title: 'Dua' },
      ]);
      const movieTitles = document.querySelectorAll('.movie__title');
      // eslint-disable-next-line no-undef
      expect(movieTitles.item(0).textContent).toEqual('Satu');
      // eslint-disable-next-line no-undef
      expect(movieTitles.item(1).textContent).toEqual('Dua');
    });

    // eslint-disable-next-line no-undef
    it('should show - for found movie without title', () => {
      presenter._showFoundMovies([{ id: 1 }]);
      // eslint-disable-next-line no-undef
      expect(document.querySelectorAll('.movie__title')
        .item(0).textContent)
        .toEqual('-');
    });

    // eslint-disable-next-line no-undef
    it('should show the movies found by Favorite Movies', (done) => {
      document
        .getElementById('movie-search-container')
        .addEventListener('movies:searched:updated', () => {
          // eslint-disable-next-line no-undef
          expect(document.querySelectorAll('.movie').length).toEqual(3);
          done();
        });
      favoriteResto.searchResto.mockImplementation((query) => {
        if (query === 'film a') {
          return [
            { id: 111, title: 'film abc' },
            { id: 222, title: 'ada juga film abcde' },
            { id: 333, title: 'ini juga boleh film a' },
          ];
        }
        return [];
      });
      searchResto('film a');
    });

    // eslint-disable-next-line no-undef
    it('should show the name of the movies found by Favorite Movies', (done) => {
      document
        .getElementById('movie-search-container')
        .addEventListener('movies:searched:updated', () => {
          const movieTitles = document.querySelectorAll('.movie__title');
          // eslint-disable-next-line no-undef
          expect(movieTitles.item(0).textContent).toEqual('film abc');
          // eslint-disable-next-line no-undef
          expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
          // eslint-disable-next-line no-undef
          expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');
          done();
        });
      favoriteResto.searchResto.mockImplementation((query) => {
        if (query === 'film a') {
          return [
            { id: 111, title: 'film abc' },
            { id: 222, title: 'ada juga film abcde' },
            { id: 333, title: 'ini juga boleh film a' },
          ];
        }
        return [];
      });
      searchResto('film a');
    });
  });

  // eslint-disable-next-line no-undef
  describe('When query is empty', () => {
    // eslint-disable-next-line no-undef
    it('should capture the query as empty', () => {
      searchResto(' ');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery.length).toEqual(0);
    });

    // eslint-disable-next-line no-undef
    it('should capture the query as empty', () => {
      searchResto(' ');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery.length).toEqual(0);
      searchResto('    ');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery.length).toEqual(0);
      searchResto('');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery.length).toEqual(0);
      searchResto('\t');
      // eslint-disable-next-line no-undef
      expect(presenter.latestQuery.length).toEqual(0);
    });
  });
});
