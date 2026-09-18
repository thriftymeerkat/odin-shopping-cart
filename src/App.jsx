import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

const App = () => {
  const [cart, setCart] = useState({});

  return (
    <>
      <Navbar cart={cart}/>
      <Outlet context={{ cart, setCart }}/>
    </>
  );
};

export default App;