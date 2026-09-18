import { useState, useEffect } from "react";
import { Link } from "react-router";
import './styles/Navbar.css';

const Navbar = ( { cart } ) => {
  const [totalQuantity, setTotal] = useState(0);

  useEffect(() => {
    const total = Object.values(cart).reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);
    setTotal(total);
  }, [cart]); 

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/"><h1 className="shop-name">Odin Shop</h1></Link>
          </li>
          <li>
              <Link to="/shop">Shop</Link>
              <Link to="/cart">Cart ({totalQuantity})</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
