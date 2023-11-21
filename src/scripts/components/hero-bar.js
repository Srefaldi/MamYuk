class HeroElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const imageUrl = 'images/heros/hero-image_4.jpg';
    const imageUrlSmall = 'images/heros/hero-image_4-small.jpg';
    const imageUrlLarge = 'images/heros/hero-image_4-large.jpg';
    const imageUrlXl = 'images/heros/hero-image_4-xl.jpg';

    this.shadowRoot.innerHTML = `
        <style>
          .hero {
            display: inline-block;
            position: relative;
            width: 100%;
            overflow: hidden;
            text-align: center;
            z-index: 400;
            background-image: url(${imageUrl});
            background-size: cover;
            background-position: center;
            height: 100%; 
            box-sizing: border-box;
            display: flex; /* Gunakan flexbox */
            justify-content: center; /* Pusatkan secara horizontal */
            align-items: center; /* Pusatkan secara vertikal */
          }
  
          .hero-text {
            font-size: 30px;
            color: white;
            margin-bottom: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            /* Posisi relatif ke parent (hero) */
            position: relative;
            /* Penyesuaian untuk posisi tepat di tengah */
            z-index: 1; /* Atur z-index jika diperlukan */
            white-space: nowrap; /* Tetapkan agar tetap satu baris saat tampilan desktop */
          }
  
          .hero-content {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
  
          @media screen and (max-width: 600px) {
            .hero {
              background-image: url(${imageUrlSmall});
              background-size: cover; /* Menutupi seluruh area dengan gambar */
              background-repeat: no-repeat; /* Hapus pengulangan gambar jika ada */
              background-position: center center; /* Pusatkan gambar secara horizontal dan vertikal */
            }
            .hero-text {
              font-size: 20px;
              white-space: normal;
              text-align: center;
              margin-top: 0; /* Mengatur margin-top menjadi 0 */
              margin-bottom: 0; /* Mengatur margin-bottom menjadi 0 */
            }
          }
  
          @media screen and (min-width: 601px) and (max-width: 1200px) {
            .hero {
              background-image: url(${imageUrlLarge});
              background-size: cover; /* Menutupi seluruh area dengan gambar */
              background-repeat: no-repeat; /* Hapus pengulangan gambar jika ada */
              background-position: center center; /* Pusatkan gambar secara horizontal dan vertikal */
            }
          }
  
          @media screen and (min-width: 1201px) {
            .hero {
              background-image: url(${imageUrlXl});
            }
          }
        </style>
        <div class="hero">
          <div class="hero-content">
            <div class="hero-text">Selamat Datang Di MamYuk</div>
          </div>
        </div>
      `;
  }
}

customElements.define('hero-bar', HeroElement);
