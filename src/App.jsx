import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.scss';
import { Nav } from './nav/nav';
import { HomePage } from './pages/home/home-page';
import { RepairPage } from './pages/repair/repair-page';
import { RentalPage } from './pages/rental/rental-page';
import { FitPage } from './pages/fit/fit-page';

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
      component: HomePage
    },
    {
      path: '/rental',
      component: RentalPage
    },
    {
      path: '/repair',
      component: RepairPage
    },
    {
      path: '/fit',
      component: FitPage
    }
  ];

  return (
    <Router>
      <Nav />
      <div>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
