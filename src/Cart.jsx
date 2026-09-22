import { useOutletContext, Link } from "react-router";
import './styles/Cart.css';

const Cart = ( ) => {
  const { cart, setCart } = useOutletContext();

  const totalAmount = Object.values(cart).reduce(
    (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
    0
  ).toFixed(2);

  function getQuantity(id) {
    return cart[id]?.quantity ?? 0;
  }

  function removeItem(id) {
    // eslint-disable-next-line no-unused-vars
    const { [id]: _, ...updatedCart } = cart;
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const quantity = getQuantity(id);
    
    if (quantity - 1 <= 0 ) {
      removeItem(id)
    } else {
      setCart(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          quantity: prev[id].quantity - 1
        }
      }));
    }
  }

  function increaseQuantity(id) {
    setCart(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: prev[id].quantity + 1
      }
    }));
  }

  function calculateSubtotal(price, quantity) {
    return (price * quantity).toFixed(2);
  }

  return (
    Object.keys(cart).length > 0 ? (
      <>
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
                      <img src={item.image} />
                    </div>
                  </div>
                  <div className="remove-btn-container remove-btn-mobile">
                    
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
                <div className="cart-desc-container">
                  <div className="cart-item-title"><p>{item.title}</p></div>
                  <div className="cart-item-price"><p>Price: £{item.price.toFixed(2)}</p></div>
                  <div className="cart-quantity-btn-container">
                    <button className="decrease-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <div className="cart-item-quantity">
                      <input 
                        type="text" 
                        value={item.quantity} 
                        readOnly 
                      />
                    </div>
                    <button className="increase-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <div className="cart-item-subtotal"><p>Subtotal: £{calculateSubtotal(item.price, item.quantity)}</p></div>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-container"><p>Total: £{totalAmount}</p></div>
        </div>
      </>
    ) : (
      <div className="empty-cart-container">
        <p>Your cart is empty!</p>
        <Link to="/shop">Click here to return to the shop.</Link>
      </div>
    )
  );
};

export default Cart;
