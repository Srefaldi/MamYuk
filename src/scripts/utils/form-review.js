import RestaurantSource from '../data/resto-source';

const PostReview = async (url, name, review, rating) => {
  const dataInput = {
    id: url.id,
    name,
    review,
    rating,
  };

  try {
    // eslint-disable-next-line import/no-named-as-default-member
    const response = await RestaurantSource.postReview(dataInput);

    if (response.status === 'success') {
      const reviewContainer = document.querySelector('.detail-review');
      const date = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const newReview = `
        <div class="detail-review-item">
          <div class="review-header">
            <p class="review-name">${name}</p>
            <p class="review-date">${date}</p>
          </div>
          <div class="review-body">
            ${review}
          </div>
        </div>
      `;

      reviewContainer.innerHTML += newReview;

      // Reset form
      const reviewForm = document.getElementById('reviewForm');
      reviewForm.reset();
    } else {
      // Menampilkan pesan kesalahan jika ulasan tidak berhasil dikirim
      alert('Failed to submit review. Please try again.');
    }
  } catch (error) {
    // Tangani kesalahan jika permintaan gagal
    console.error('Error submitting review:', error);
    alert('Failed to submit review. Please try again.');
  }
};

export default PostReview;
