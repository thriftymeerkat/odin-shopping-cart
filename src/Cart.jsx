import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router";

const Cart = ( ) => {
  const { cart, setCart } = useOutletContext();
  const [totalAmount, setTotal] = useState(0);

  useEffect(() => {
    const total = Object.values(cart).reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);
    setTotal(total);
  }, [cart]); 

  function decreaseQuantity(id) {
    setCart(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: prev[id].quantity - 1
      }
    }));
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

  return (
    Object.keys(cart).length > 0 ? (
      <>
        <div className="cart-container">
          {Object.values(cart).map((item) => (
            <div className="item" key={item.id}>
              <img src={item.image} />
              <div>{item.title}</div>
              <div>Price: ${item.price}</div>
              <div className="buttons-container">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <div>
                  <input type="number" value={item.quantity} readOnly />
                </div>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
              <div>Subtotal: £{item.price * item.quantity}</div>
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
