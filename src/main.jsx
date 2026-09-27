import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

const AccountPage = lazy(() => import('../pages/Account.jsx'));

const router = createBrowserRouter([
    {path: "/", element: <App/>, children: [
        {index: true, element: <Home/>},
        {path: "account", element: <AccountPage/>},
        {path: "*", element: <NotFoundPage/>}
    ]}
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)
