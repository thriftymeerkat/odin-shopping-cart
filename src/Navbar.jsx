
import { Link } from "react-router";
import './styles/Navbar.css';

const Navbar = ( { cart } ) => {
  const totalQuantity = Object.values(cart).reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  return (
    <div className="navbar-container">
      <nav>
        <ul>
          <li>
            <Link to="/"><h1 className="shop-name">Online Shop</h1></Link>
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
