import { useEffect, useState } from "react";
import { pubSubService } from "./../../../packages/pubsub";

export const Cart = () => {
  const [cartItems, setCartItems] = useState<string[]>([]);

  useEffect(() => {
    pubSubService.subscribe("cart:add", ({ productId }) => {
      setCartItems((items) => [...items, productId]);
    });
  }, []);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item}>Product ID: {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
