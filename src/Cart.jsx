import { useOutletContext, Link } from "react-router";

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
        <div className="cart-container">
          {Object.values(cart).map((item) => (
            <div className="item" key={item.id}>
              <button onClick={() => removeItem(item.id)}>Remove</button>
              <img src={item.image} />
              <div>{item.title}</div>
              <div>Price: £{item.price.toFixed(2)}</div>
              <div className="buttons-container">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <div>
                  <input 
                    type="text" 
                    value={item.quantity} 
                    readOnly 
                  />
                </div>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <div>Subtotal: £{calculateSubtotal(item.price, item.quantity)}</div>
            </div>
          ))}
        </div>
        <div>Total: £{totalAmount}</div>
      </>
    ) : (
      <div>
        <p>Your cart is empty!</p>
        <Link to="/shop">Go to shop</Link>
      </div>
    )
  );
};

export default Cart;
