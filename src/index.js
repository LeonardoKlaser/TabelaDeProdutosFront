import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Tabela from './views/Tabela';
import PaginaErro from './views/PaginaErro';
import Home from './views/Home'
import FormEdit from './views/shared/FormEdit'

const router = createBrowserRouter([
  {
    path: "/adicionar",
    element: <App></App>,
  },
  {
    path: "/Tabela",
    element: <Tabela></Tabela>,
  },
  {
    path: "*",
    element: <PaginaErro></PaginaErro>
  },
  {
    path: "/Home",
    component:{Home},
    element: <Home></Home>,
  },
  {
    path: "/formEdit",
    element: <FormEdit></FormEdit>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
