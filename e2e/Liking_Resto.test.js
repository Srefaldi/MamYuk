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
// Menambahkan Customer Review
Scenario('Customer review', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement('.restaurant-item');
  I.click(locate('.card-title').first());

  I.waitForElement('.restaurant__info');

  const textReview = 'Form Review Test E2E';
  I.fillField({ id: 'name' }, 'Sopia Refaldi Subs 3');
  I.fillField({ id: 'review' }, textReview);

  I.click('#submit');
  I.wait(3); // Tunggu beberapa detik agar ulasan muncul sepenuhnya
  // after submit review
  const lastReview = locate('.restaurant__reviews .review-item').last();
  const lastReviewText = await I.grabTextFrom(lastReview);

  // Sesuaikan expectedReviewText sesuai dengan format teks yang diharapkan
  const expectedReviewText = 'Sopia Refaldi Subs 3\n                Form Review Test E2E\n                21 November 2023';

  assert.strictEqual(lastReviewText.trim(), expectedReviewText.trim());
});
