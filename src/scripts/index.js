import 'regenerator-runtime';
import '../styles/main.css';
// eslint-disable-next-line import/extensions
import './components/hero-bar';
import './components/footer-bar';
import '../styles/style.css';
import '../styles/responsive.css';
import App from './views/app';
import swRegister from './utils/regist-sw';
// const app = new App({
//   button: document.querySelector('#hamburgerButton'),
//   drawer: document.querySelector('#navigationDrawer'),
//   content: document.querySelector('#mainContent'),
// });
const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});