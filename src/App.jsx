import { Link } from "react-router";

const App = () => {
  return (
    <div>
      <h1>The Jeans Store!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="jeans">Jeans</Link>
          </li>
          <li>
            <Link to="cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default App;
