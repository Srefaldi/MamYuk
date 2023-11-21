import FavRestoIdb from '../src/scripts/data/fav-resto';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

// eslint-disable-next-line no-undef
describe('Liking Resto', () => {
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    addLikeButtonContainer();
  });

  // eslint-disable-next-line no-undef
  it('should show the like button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithListResto({ id: 1 });

    // eslint-disable-next-line no-undef
    expect(
      document.querySelector('[aria-label="like this resto"]'),
    ).toBeTruthy();
  });

  // eslint-disable-next-line no-undef
  it('should not show the unlike button when the resto has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithListResto({ id: 1 });

    // eslint-disable-next-line no-undef
    expect(
      document.querySelector('[aria-label="unlike this resto"]'),
    ).toBeFalsy();
  });

  // eslint-disable-next-line no-undef
  it('should be able to like the resto', async () => {
    await TestFactories.createLikeButtonPresenterWithListResto({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await FavRestoIdb.getResto(1);
    // eslint-disable-next-line no-undef
    expect(resto).toEqual({ id: 1 });

    await FavRestoIdb.delateResto(1);
  });

  // eslint-disable-next-line no-undef
  it('should not add a resto again when its already liked', async () => {
    await TestFactories.createLikeButtonPresenterWithListResto({ id: 1 });

    await FavRestoIdb.putResto({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const allResto = await FavRestoIdb.getAllResto();
    // eslint-disable-next-line no-undef
    expect(allResto).toEqual([{ id: 1 }]);

    await FavRestoIdb.delateResto(1);
  });

  // menggunakan metode xit, bukan it
  // eslint-disable-next-line no-undef
  it('should not add a resto when it has no id', async () => {
    await TestFactories.createLikeButtonPresenterWithListResto({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const allResto = await FavRestoIdb.getAllResto();
    // eslint-disable-next-line no-undef
    expect(allResto).toEqual([]);
  });
});
