import { Link } from "react-router";
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <h1 className="shop-name">Odin Jeans</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/jeans">Jeans</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
