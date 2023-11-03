// eslint-disable-next-line import/no-unresolved, import/extensions
import Home from '../views/pages/home';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Favorite from '../views/pages/favorite';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Detail from '../views/pages/detail';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/favorite': Favorite,
  '/detail/:id': Detail,
};

export default routes;
