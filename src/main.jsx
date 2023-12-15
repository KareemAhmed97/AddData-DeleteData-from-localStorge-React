import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import Addproduct from './pages/Addproduct.jsx';
import Products from './pages/Products.jsx';
import Index from './pages/Index.jsx';
import ErrorPage from './pages/ErrorPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <App/>
    ),
    children:[
      {
        index: true,
        element: <Index />,
      },
      {
        path: "Addproduct",
        element: <Addproduct />,
      },
      {
        path: "products",
        element: <Products/>,
      }
    ]
  },
  
]);


ReactDOM.createRoot(document.getElementById('root')).render(



  <RouterProvider router={router} />
)
