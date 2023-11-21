const assert = require('assert');

Feature('Liking and Unliking Restaurants');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('liking and unliking a restaurant', async ({ I }) => {
  const emptyFavoriteRestoText = 'Tidak Ada Resto Yang Disukai';
  // Pengecekan Resto Dihalaman Favorite
  I.amOnPage('/#/favorite');
  I.seeElement('#movies');
  I.see(emptyFavoriteRestoText, '#movies');

  // Like Resto
  I.amOnPage('/');
  I.seeElement('.restaurant-item');
  const firstRestoCard = locate('.card-title').first();
  const firstRestoCardTitle = await I.grabTextFrom(firstRestoCard);
  I.click(firstRestoCard);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  // Unlike Resto
  I.seeElement('.restaurant-item');
  const likedCardTitle = await I.grabTextFrom('.card-title');
  assert.strictEqual(firstRestoCardTitle, likedCardTitle);

  I.click('.card-title');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.seeElement('#movies');
  I.see(emptyFavoriteRestoText, '#movies');
});
