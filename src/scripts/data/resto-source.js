import API_ENDPOINT from '../globals/api-endpoint';

// Fungsi untuk mendapatkan daftar restoran
export const getRestaurants = () => fetch(API_ENDPOINT.LIST)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  });

// Fungsi untuk mendapatkan detail restoran berdasarkan ID
export const getRestaurantDetail = (id) => fetch(API_ENDPOINT.DETAIL(id))
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  });

// Fungsi untuk menambahkan review pada restoran
export const postReview = (data) => fetch(API_ENDPOINT.POST_REVIEW, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  });
