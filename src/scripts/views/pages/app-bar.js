class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
        .app-bar {
            background-color: #0B2447;
            color: white;
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
            padding: 10px 0;
            width: 100%;
            position: fixed;
            top: 0;
            z-index: 500; /* Atur nilai yang lebih rendah daripada elemen "Skip to Content" */
        }
        
        .brand-logo {
            font-size: 24px;
            font-weight: bold;
            text-align: left;
            margin-bottom: 20px;
            margin-top: 20px;
            padding-left: 50px;
        }
        .nav-menu {
            list-style: none;
            padding: 0;
            display: flex;
            justify-content: flex-end;
            margin-right: 20px;
        }
        .nav-menu li {
            margin-right: 20px;

        }
        .nav-menu a {
            margin-top: 20px;
            display: flex;
            text-decoration: none;
            color: white;
            min-width: 44px; 
            min-height: 44px;
        }
        .nav-menu-item a{
            min-width: 44px; 
            min-height: 44px;
        }
        .mobile-nav {
            background-color: #0B2447;
            color: white;
            position: fixed;
            top: 0;
            margin-top: 87px;
            left: -250px;
            height: 100%;
            min-width: 44px;
            overflow-x: hidden;
            transition: 0.3s;
        }
        .mobile-nav a {
            display: block;
            min-width: 44px;
            min-height: 44px;
        }
        .mobile-nav.active a{
            display: block;
            margin-left: 50px;
            width: 44px;
            min-height: 44px;
        }
        .mobile-nav.active {
            left: 0;
            z-index: 2000;
            width: 200px; 
            min-height: 44px; 
        }
        
        .mobile-nav-toggle {
            display: none;
            background-color: transparent;
            border: none;
            color: white;
            
            margin-top: 15px;
            font-size: 24px;
            cursor: pointer;
            position: fixed;
            top: 10px;
            left: 10px;
            width: 44px;
            min-height: 44px;
        }
        
        .mobile-nav-toggle button {
            background-color: #0B2447;
            width: 44px; 
            min-height: 44px; 
        }
        
        .hamburger-icon {
            display: none;
            font-size: 24px;
            cursor: pointer;
            position: fixed;
            top: 10px;
            left: auto;
            right: 10px;
        }
        .hamburger-line {
            width: 24px;
            height: 2px;
            background-color: white;
            margin: 4px 0;
        }
        .nav-menu-mobile {
            list-style: none;
            padding: 0;
            text-align: center;
        }
        .nav-menu-mobile li {
            margin-bottom: 20px;
        }
        .nav-menu-mobile a {
            text-decoration: none;
            color: white;
            font-size: 18px;
            min-width: 44px;
            min-height: 44px;
        }
        .favorite-link {
            width: 44px;
            height: 44px;
            /* Anda juga dapat menambahkan gaya lain sesuai kebutuhan */
        }        

        @media screen and (max-width: 768px) {
            .app-bar {
                position: fixed;
                z-index: 2000;
            }
            .brand-logo {
                text-align: center;
                padding-left: 0;
            }
            .nav-menu {
                display: none;
            }
            .mobile-nav-toggle {
                display: block;
            }
        }
        </style>

        <nav class="app-bar">
        <div class="brand-logo">MamYuk</div>
        <div class="nav-menu">
            <li class="nav-menu-item"><a href="/">Home</a></li>
            <li class="nav-menu-item"><a href="#" class="favorite-link">Favorite</a></li>
            <li class="nav-menu-item"><a href="https://github.com/Srefaldi">About</a></li>
        </div>
        <button class="mobile-nav-toggle" id="mobileNavToggle">☰</button>
    </nav>

    <div class="mobile-nav" id="mobileNav">
        <ul class="nav-menu-mobile">
            <li><a href="/">Home</a></li>
            <li><a href="#">Favorite</a></li>
            <li><a href="https://github.com/Srefaldi">About</a></li>
        </ul>
    </div>
`;

    this.mobileNavToggle = this.shadowDOM.querySelector('#mobileNavToggle');
    if (this.mobileNavToggle) {
      this.mobileNavToggle.tabIndex = 0;
    }
  }

  setupEventListeners() {
    this.mobileNavToggle = this.shadowDOM.querySelector('#mobileNavToggle');
    if (this.mobileNavToggle) {
      this.mobileNavToggle.addEventListener('click', () => {
        this.mobileNavActive = !this.mobileNavActive;
        this.updateMobileNavVisibility();
      });

      this.mobileNavToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.mobileNavActive = !this.mobileNavActive;
          this.updateMobileNavVisibility();
        }
      });
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.mobileNavActive = false;
        this.updateMobileNavVisibility();
      }
    });
  }

  updateMobileNavVisibility() {
    const mobileNav = this.shadowDOM.querySelector('.mobile-nav');
    const brandLogo = this.shadowDOM.querySelector('.brand-logo');

    if (this.mobileNavActive) {
      mobileNav.classList.add('active');
      brandLogo.classList.add('active');
    } else {
      mobileNav.classList.remove('active');
      brandLogo.classList.remove('active');
      document.body.style.filter = 'none';
    }
  }
}

customElements.define('nav-bar', AppBar);
