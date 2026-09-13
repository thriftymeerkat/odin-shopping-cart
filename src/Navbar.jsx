import { Link } from "react-router";
import './styles/Navbar.css'

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/"><h1 className="shop-name">Odin Shop</h1></Link>
          </li>
          <li>
              <Link to="/shop">Shop</Link>
              <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
