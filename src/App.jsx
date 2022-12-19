import React, { lazy, Suspense } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import { Nav } from './nav/nav';
import { Loading } from './loading/loading';
import { Footer } from './footer/footer';

const Rental = lazy(() => import('./pages/rental/rental-page'));
const Repair = lazy(() => import('./pages/repair/repair-page'));
const Fit = lazy(() => import('./pages/fit/fit-page'));
const NotFound = lazy(() => import('./pages/not-found/not-found'));
const Home = lazy(() => import('./pages/home/home-page'));

function App() {
  return (
    <Router>
      <Nav />
      <div className="page-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/rental" element={<Rental />} />
            <Route path="/repair" element={<Repair />} />
            <Route path="/fit" element={<Fit />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route
              path="*"
              render={() => <Navigate replace to="/not-found" />}
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
