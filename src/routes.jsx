import App from "./App";
import Homepage from "./Homepage";
import ErrorPage from "./ErrorPage";
import Jeans from "./Jeans";
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
        path: "/jeans",
        element: <Jeans />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
];

export default routes;