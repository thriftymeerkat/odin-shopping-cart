import { useState, useEffect } from "react";
import './styles/shop.css';

const fetchItems = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => setItems(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);  

  return { items, error, loading };

};

const Shop = () => {
  const { items, error, loading } = fetchItems();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div className="items-container">
      {items.map((item) => (
        <div className="item" key={item.id}>
          <img 
            src={item.image}
          />
          <div>{item.title}</div>
          <div>£{item.price}</div>
          <div>{item.description}</div>
          <div className="buttons-container">
            <button>-</button>
            <div>0</div>
            <button>+</button>
          </div>
          <div><button>Add to cart</button></div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
