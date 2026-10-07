import { Link, NavLink } from "react-router";

import './styles/Navbar.css';

const Navbar = ( { cart } ) => {
  const totalQuantity = Object.values(cart).reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  return (
    <div className="navbar-container">
      <nav>
        <Link to="/"><div className="shop-name">Shopping Cart</div></Link>
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/shop">Shop</NavLink></li>
          <li><NavLink to="/cart" aria-label={`Cart, ${totalQuantity} items`}>Cart ({totalQuantity})</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
