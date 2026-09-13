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
  const [quantities, setQuantities] = useState({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  function removeItem(id) {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }));
  }

  function addItem(id) {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  }

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
            <button onClick={() => removeItem(item.id)}>-</button>
            <div>{quantities[item.id] || 0}</div>
            <button onClick={() => addItem(item.id)}>+</button>
          </div>
          <div><button>Add to cart</button></div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
