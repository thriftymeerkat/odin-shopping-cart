import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

const App = () => {
  const [cart, setCart] = useState({});

  return (
    <>
      <header>
        <Navbar cart={cart}/>
      </header>
      <section>
        <Outlet context={{ cart, setCart }}/>
      </section>
    </>
  );
};

export default App;