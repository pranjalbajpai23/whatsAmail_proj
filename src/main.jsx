import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './Pages/Landing.jsx'
import Login from './Pages/Login.jsx'
import Connecting from './Pages/Connecting.jsx'
import { AuthProvider } from './Context/AuthProvider.jsx'
import Emails from './Components/Emails.jsx'
import { Provider } from 'react-redux'
import siteStore from './Store/index.js'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/connect',
        element: <Connecting />
      },
      {
        path:'mail/connect',
        element: <Connecting />
      },
      {
        path: '/mail/*',
        element: <Emails />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={siteStore}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider>
  </React.StrictMode>,
)
