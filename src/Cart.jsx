import { useState, useEffect, useRef } from "react";
import { useOutletContext, Link } from "react-router";
import './styles/Cart.css';

const Cart = ( ) => {
  const TIMEOUT = 5000;

  const { cart, setCart } = useOutletContext();
  const [announcement, setAnnouncement] = useState();
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const totalAmount = Object.values(cart).reduce(
    (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
    0
  ).toFixed(2);

  function resetAnnouncement() {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setAnnouncement("");
    }, TIMEOUT);
  }

  function getQuantity(id) {
    return cart[id]?.quantity ?? 0;
  }

  function removeItem(id, title) {
    // eslint-disable-next-line no-unused-vars
    const { [id]: _, ...updatedCart } = cart;
    setCart(updatedCart);
    setAnnouncement(`${title} removed from cart.`);
    resetAnnouncement();
  }

  function decreaseQuantity(id, title) {
    const quantity = getQuantity(id);
    const newQuantity = quantity - 1;

    if (newQuantity <= 0) {
      removeItem(id);
      setAnnouncement(`${title} removed from cart.`);
    } else {
      setCart(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          quantity: newQuantity
        }
      }));
      setAnnouncement(`${title}, quantity ${newQuantity}.`);
    }
    resetAnnouncement();
  }

  function increaseQuantity(id, title) {
    const quantity = getQuantity(id);
    const newQuantity = quantity + 1;

    setCart(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: newQuantity
      }
    }));
    setAnnouncement(`${title}, quantity ${newQuantity}.`);
    resetAnnouncement();
  }

  function calculateSubtotal(price, quantity) {
    return (price * quantity).toFixed(2);
  }

  return (
    <>
      <div className="shop-header-hidden">
        <h1>Cart</h1>
      </div>
      {Object.keys(cart).length > 0 ? (
        <div className="cart-total-container">
          <div className="cart-header">
            <h2>Your cart</h2>
          </div>
          <ul className="cart-container">
            {Object.values(cart).map((item) => (
              <li className="cart-item" key={item.id}>
                <div className="cart-image-remove-container-full">
                  <div className="cart-image-remove-container">
                    <div className="image-container">
                      <img 
                        src={item.image} 
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="remove-btn-container remove-btn-mobile">
                    <button className="remove-btn" onClick={() => removeItem(item.id, item.title)} aria-label={`Remove ${item.title} from cart`}>Remove</button>
                  </div>
                </div>
                <div className="cart-desc-container">
                  <div className="cart-item-title"><h3>{item.title}</h3></div>
                  <div className="cart-item-price"><p>Price: £{item.price.toFixed(2)}</p></div>
                  <div className="cart-quantity-btn-container">
                    <button className="decrease-btn" onClick={() => decreaseQuantity(item.id, item.title)} aria-label={`Decrease quantity, ${item.title}`}>-</button>
                    <div className="item-quantity">
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        aria-label={`Quantity, ${item.title}`}
                      />
                    </div>
                    <button className="increase-btn" onClick={() => increaseQuantity(item.id, item.title)} aria-label={`Increase quantity, ${item.title}`} >+</button>
                  </div>
                  <div className="cart-item-subtotal">
                    <p>Subtotal: £{calculateSubtotal(item.price, item.quantity)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-container"><p>Total: £{totalAmount}</p></div>
          <div aria-live="polite" aria-atomic="true" className="item-alert">
            {announcement}
          </div>
        </div>
      ) : (
        <div className="empty-cart-container">
          <p>Your cart is empty!</p>
          <Link to="/shop">Click here to return to the shop.</Link>
        </div>
      )}
    </>
  );
};

export default Cart;
