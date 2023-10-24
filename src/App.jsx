import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Home';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import ScheduleOfWeek from './components/TimeTable/ScheduleOfWeek';
import TimeTable from './components/TimeTable/TimeTable';
import ActivityDetail from './components/ActivityDetail';
import Login from './components/Auth/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './components/Loading';
import Register from './components/Auth/Register';
import ChangeSlot from './components/Teacher/ChangeSlot';
import ProtectedRoute from './components/ProtectedRoute';
import { getAccount } from './services/api';
import { getAccountAction } from './redux/account/accountSlice';

const Layout = () => {
  return (
    <div style={{ padding: '0 100px' }}>
      <Header />
      <div style={{ margin: '30px 0' }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "ScheduleOfWeek",
        element:
          <ScheduleOfWeek />,
      },
      {
        path: "TimeTable",
        element: <TimeTable />,
      },
      {
        path: "ActivityDetail/:activity/:id",
        element: <ActivityDetail />,
      },
      {
        path: "Teacher/ChangeSlot",
        element:
          <ProtectedRoute>
            <ChangeSlot />
          </ProtectedRoute>,
      }
    ],
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Register",
    element: <Register />
  },
]);

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    if (window.location.pathname !== '/Login' || window.location.pathname !== '/Register') {
      let res = await getAccount();
      if (res && res.dt) {
        dispatch(getAccountAction(res.dt.user));
      }
    }
  };

  return (
    <>
      {!isLoading || window.location.pathname === '/Login' || window.location.pathname === '/Register'
        ? <RouterProvider router={router} />
        : <Loading />}
    </>

  );
}

export default App;
