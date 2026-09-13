import App from "./App";
import ErrorPage from "./ErrorPage";
import Jeans from "./Jeans";
import Cart from "./Cart";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/jeans",
    element: <Jeans />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];

export default routes;
