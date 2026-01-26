import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from './App.jsx'
import Home from './routes/Home/Home.jsx';
import FoodPage from './routes/FoodPage/FoodPage.jsx';
import Contact from './routes/Contact/Contact.jsx';
import About from './routes/About/About.jsx';
import Donate from './routes/Donate/Donate.jsx';
import Login from './routes/Login/Login.jsx';
import Profile from './routes/Profile/Profile.jsx';
import store from './store/store.js';
import Food from './routes/Food/Food.jsx';
import PendingClaimsList from './routes/PendingClaim/PendingClaim.jsx';
import DonationList from './routes/DonationList/DonationList.jsx';

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/claim",
        element: <FoodPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/donate",
        element: <Donate />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/food/:id",
        element: <Food />,
      },
      {
        path: "/pendingclaim",
        element: <PendingClaimsList />,
      },
      {
        path: "/donationlist",
        element: <DonationList />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
