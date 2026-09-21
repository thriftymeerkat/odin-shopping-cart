import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import './styles/shop.css';

const useFetchItems = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
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
  const { items, error, loading } = useFetchItems();
  const [quantities, setQuantities] = useState({});
  const { setCart } = useOutletContext();

  if (loading) return <section><div className="loading-container"><div class="loader"></div></div></section>;
  if (error) return <section><div className="error-container"><p>A network error was encountered!</p></div></section>;

  function decreaseQuantity(id) {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1)
    }));
  }

  function increaseQuantity(id) {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
  }

  function addItem(id, quantity, title, image, price) {
    setCart(prev => ({
      ...prev,
      [id]: {
        id: id, 
        quantity: quantity + (prev[id]?.quantity || 0),
        title: title,
        image: image,
        price: price,
      }
    }))
  }

  return (
    <div className="items-container">
      {items.map((item) => (
        <div className="item" key={item.id}>
          <div className="item-image-container">
            <img 
              src={item.image}
            />
          </div>
          <div className="item-desc-container">
            <div className="item-tite"><p>{item.title}</p></div>
            <div className="item-price"><p>£{item.price.toFixed(2)}</p></div>
            <div className="item-desc"><p>{item.description.length > 250 ? item.description.slice(0,250) + "..." : item.description }</p></div>
            <div className="quantity-btn-container">
              <button className="decrease-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
              <div className="item-quantity">
                <input 
                  type="text"
                  value={quantities[item.id] || 1}
                  readOnly
                />
              </div>
              <button className="increase-btn" onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <div className="add-to-cart-btn-container">
              <button onClick={() => addItem(item.id, quantities[item.id] || 1, item.title, item.image, item.price)}>Add to cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shop;
