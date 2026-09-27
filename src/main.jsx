import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { CreateBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./Home.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

const router = CreateBrowserRouter([
    {path: "/", element: <App/>, children: [
        {index: true, element: <Home/>},
        {path: "*", element: <NotFoundPage/>}
    ]}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
