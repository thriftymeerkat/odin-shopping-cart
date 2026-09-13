import App from "./App";
import Homepage from "./Homepage";
import ErrorPage from "./ErrorPage";
import Shop from "./Shop";
import Cart from "./Cart";

const routes = [
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;