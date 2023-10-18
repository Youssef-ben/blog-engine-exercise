import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AdminPage } from './controller/page';
import { PageContainer } from './controller/page/pageContainer/PageContainer';

const router = createBrowserRouter([
  {
    element: <PageContainer />,
    children: [
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/',
        element: <AdminPage />,
      },
    ],
  },
]);

export const AppNavigation = () => {
  return <RouterProvider router={router} />;
};
