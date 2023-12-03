import { createBrowserRouter } from 'react-router-dom';

import NotFound from '@/pages/NotFound';
import DashboardLayout from '@/layouts/DashboardLayout';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import DashboardHome from '@/pages/Dashboard/DashboardHome';
import LoginPage from '@/pages/Signin';
import SignUpPage from '@/pages/Signup';
import Dashboard from '@/pages/UserDashboard';
import PrivateRoute from './PrivateRoute';
import PrivateAdminRoute from './PrivateAdminRoute';
import CreateTest from '@/pages/Dashboard/test/CreateTest';
import UserList from '@/pages/Dashboard/user/UserList';
import TestList from '@/pages/Dashboard/test/TestList';
import UpdateTest from '@/pages/Dashboard/test/UpdateTest';
import CreateBanner from '@/pages/Dashboard/banner/CreateBanner';
import BannerList from '@/pages/Dashboard/banner/DashboardBannerList';
import Tests from '@/pages/Tests';
import Details from '@/pages/Details';
import BookingList from '@/pages/Dashboard/booking/BookingList';
import SingleBookingList from '@/pages/Dashboard/booking/SingleBookingList';
import Completed from '@/pages/Completed';
import ContactUs from '@/pages/ContactUs';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/dashboard/:id',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: '/tests',
        element: <Tests />,
      },
      {
        path: '/dashboard/',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },

      {
        path: '/detail/:id',
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: '/completion/:id',
        element: (
          <PrivateRoute>
            <Completed />
          </PrivateRoute>
        ),
      },
      {
        path: '/contact/',
        element: (
          <PrivateRoute>
            <ContactUs />
          </PrivateRoute>
        ),
      },
      {
        path: '/detail/:id/:date',
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        index: true,
        element: (
          <PrivateAdminRoute>
            <DashboardHome />
          </PrivateAdminRoute>
        ),
      },
      {
        path: 'analytics',
        index: true,
        element: (
          <PrivateAdminRoute>
            <DashboardHome />
          </PrivateAdminRoute>
        ),
      },
      {
        path: 'user',
        children: [
          {
            path: 'list',
            index: true,
            element: (
              <PrivateAdminRoute>
                <UserList />
              </PrivateAdminRoute>
            ),
          },
        ],
      },

      {
        path: 'test',
        children: [
          {
            path: 'new',
            index: true,
            element: (
              <PrivateAdminRoute>
                <CreateTest />
              </PrivateAdminRoute>
            ),
          },
          {
            path: 'list',
            index: true,
            element: (
              <PrivateAdminRoute>
                <TestList />
              </PrivateAdminRoute>
            ),
          },

          {
            path: 'edit/:id',
            index: true,
            element: (
              <PrivateAdminRoute>
                <UpdateTest />
              </PrivateAdminRoute>
            ),
          },
        ],
      },
      {
        path: 'banner',
        children: [
          {
            path: 'new',
            index: true,
            element: (
              <PrivateAdminRoute>
                <CreateBanner />
              </PrivateAdminRoute>
            ),
          },
          {
            path: 'list',
            index: true,
            element: (
              <PrivateAdminRoute>
                <BannerList />
              </PrivateAdminRoute>
            ),
          },

          {
            path: 'edit/:id',
            index: true,
            element: (
              <PrivateAdminRoute>
                <UpdateTest />
              </PrivateAdminRoute>
            ),
          },
        ],
      },
      {
        path: 'booking',
        children: [
          {
            path: 'list',
            index: true,
            element: (
              <PrivateAdminRoute>
                <BookingList />
              </PrivateAdminRoute>
            ),
          },
          {
            path: ':id',
            index: true,
            element: (
              <PrivateAdminRoute>
                <SingleBookingList />
              </PrivateAdminRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
