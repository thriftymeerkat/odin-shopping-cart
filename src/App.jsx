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
      <main>
          <Outlet context={{ cart, setCart }}/>
      </main>
    </>
  );
};

export default App;