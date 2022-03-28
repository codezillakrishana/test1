import { Route, Routes, Navigate } from 'react-router-dom';
import User from './views/user/index';
import Dashboard from './views/app/dashboard';
import ElectionType from './views/app/election-type';
import Presidential from './views/app/presidential';
import AppLayout from './layout/AppLayout';
import Result from './views/app/result';
import { useLocation } from 'react-router';
import Interceptor from './api/interceptor';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function App() {

  const location = useLocation();
  // history={location}
  return (
    <>
      <ToastContainer />
      <Interceptor />

      <Routes>
        <Route
          path="/app"
          element={<AppLayout />}
        >
          <Route
            path="result"
            element={<Dashboard />}
          />
          <Route
            path="result/:type/:_id/:budget/:total_voter"
            element={<Result />}
          />
          <Route
            path="level"
            element={<ElectionType  />}
          />
          <Route
            path="data"
            element={<Presidential/>}
          />
        </Route>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route
          path="/user/login"
          element={<User />}
        />
      </Routes>
    </>
  );
}

export default App;
