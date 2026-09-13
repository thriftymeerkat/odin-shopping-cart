import { Outlet } from "react-router";
import Navbar from "./Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;