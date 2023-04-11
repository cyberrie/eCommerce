// the whole state will be managed from here
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  // add to cart logic
  const onAdd = (product, quantity) => {
    //check if the item we're trying to add already in the cart
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    //add to total quantity
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    //if the item is already in the cart, increase the quantity
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        // if the product is already in the cart
        if (cartProduct._id === product._id)
          return {
            // keep it as is/ spread
            ...cartProduct,
            // increase the quantity of the product
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  // increase qty
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // decrease qty
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
