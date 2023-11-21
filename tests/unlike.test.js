import FavRestoIdb from '../src/scripts/data/fav-resto';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

// eslint-disable-next-line no-undef
describe('Unliking Resto', () => {
  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavRestoIdb.putResto({ id: 1 });
  });

  // eslint-disable-next-line no-undef
  afterEach(async () => {
    await FavRestoIdb.delateResto(1);
  });

  // eslint-disable-next-line no-undef
  it('should display unlike widget when the resto has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithListResto({ id: 1 });

    // eslint-disable-next-line no-undef
    expect(
      document.querySelector('[aria-label="unlike this resto"]'),
    ).toBeTruthy();
  });

  // eslint-disable-next-line no-undef
  it('should not display unlike widget when the resto has been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithListResto({ id: 1 });

    // eslint-disable-next-line no-undef
    expect(
      document.querySelector('[aria-label="like this resto"]'),
    ).toBeFalsy();
  });

  // eslint-disable-next-line no-undef
  it('should be able to remove liked resto from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithListResto({ id: 1 });

    document
      .querySelector('[aria-label="unlike this resto"]')
      .dispatchEvent(new Event('click'));
    const allResto = await FavRestoIdb.getAllResto();

    // eslint-disable-next-line no-undef
    expect(allResto).toEqual([]);
  });

  // eslint-disable-next-line no-undef
  it('should not throw error if the unliked resto is not in the list', async () => {
    await TestFactories.createLikeButtonPresenterWithListResto({ id: 1 });

    await FavRestoIdb.delateResto(1);
    document
      .querySelector('[aria-label="unlike this resto"]')
      .dispatchEvent(new Event('click'));
    const allResto = await FavRestoIdb.getAllResto();

    // eslint-disable-next-line no-undef
    expect(allResto).toEqual([]);
  });
});
