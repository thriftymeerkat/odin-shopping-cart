import { useState, useEffect, useRef } from "react";
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
  const TIMEOUT = 5000;

  const { items, error, loading } = useFetchItems();
  const [quantities, setQuantities] = useState({});
  const { cart, setCart } = useOutletContext();
  const [announcement, setAnnouncement] = useState();
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  if (loading) return <section><div className="shop-header"><h1>Shop</h1></div><div className="loading-container"><div className="loader"></div></div></section>;
  if (error) return <section><div className="shop-header"><h1>Shop</h1></div><div className="error-container"><p>A network error was encountered!</p></div></section>;

  function resetAnnouncement() {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAnnouncement("");
    }, TIMEOUT);
  }

  function decreaseQuantity(id, title) {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1)
    }));
    const quantity = Math.max((quantities[id] || 1) - 1, 1);
    setAnnouncement(`${title}, quantity ${quantity}.`);
    resetAnnouncement();
  }

  function increaseQuantity(id, title) {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }));
    const quantity = (quantities[id] || 1) + 1;
    setAnnouncement(`${title}, quantity ${quantity}.`)
    resetAnnouncement();
  }

  function addItem(id, quantity, title, image, price) {
    const total = quantity + (cart[id]?.quantity || 0);
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
    setAnnouncement(`Added ${quantity} ${title} to cart, ${total} in cart.`)
    resetAnnouncement();
  }

  return (
    <>
      <div className="shop-header">
        <h1>Shop</h1>
      </div>
        <ul className="items-container-ul" role="list">
          {items.map((item) => (
            <li key={item.id}>
              <div className="item">
                <div className="item-image-container">
                  <img 
                    src={item.image}
                    alt=""
                  />
                </div>
                <div className="item-desc-container">
                  <div className="item-title"><h2>{item.title}</h2></div>
                  <div className="item-price"><p>£{item.price.toFixed(2)}</p></div>
                  <div className="item-desc"><p>{item.description.length > 250 ? item.description.slice(0,250) + "..." : item.description }</p></div>
                  <div className="quantity-btn-container">
                    <button className="decrease-btn" onClick={() => decreaseQuantity(item.id, item.title)} aria-label={`Decrease quantity, ${item.title}`}>-</button>
                    <div className="item-quantity">
                      <input 
                        type="text"
                        value={quantities[item.id] || 1}
                        readOnly
                        aria-label={`Quantity, ${item.title}`}
                      />
                    </div>
                    <button className="increase-btn" onClick={() => increaseQuantity(item.id, item.title)} aria-label={`Increase quantity, ${item.title}`}>+</button>
                  </div>
                  <div className="add-to-cart-btn-container">
                    <button onClick={() => addItem(item.id, quantities[item.id] || 1, item.title, item.image, item.price)} aria-label={`Add to cart, ${item.title}`}>Add to cart</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
    <div aria-live="polite" aria-atomic="true" className="item-alert">
      {announcement}
    </div>
    </>
  );
};

export default Shop;
