import { Link } from "react-router";
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/"><h1 className="shop-name">Odin Jeans</h1></Link>
          </li>
          <li>
              <Link to="/jeans">Jeans</Link>
              <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
