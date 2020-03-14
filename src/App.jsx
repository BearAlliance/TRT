import React, { lazy, Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.scss';
import { Nav } from './nav/nav';
import { Loading } from './loading/loading';
import { Footer } from './footer/footer';

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function App() {
  const routes = [
    {
      path: '/home',
      component: lazy(() => import('./pages/home/home-page'))
    },
    {
      path: '/rental',
      component: lazy(() => import('./pages/rental/rental-page'))
    },
    {
      path: '/repair',
      component: lazy(() => import('./pages/repair/repair-page'))
    },
    {
      path: '/fit',
      component: lazy(() => import('./pages/fit/fit-page'))
    },
    {
      path: '/',
      component: function RedirectToHome() {
        return <Redirect to="/home" />;
      }
    }
  ];

  return (
    <Router>
      <Nav />
      <div>
        <Suspense fallback={<Loading />}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
