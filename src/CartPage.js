import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, totalItems, subtotal } = useCart();

  const handleRemove = (productId, productName) => {
    removeFromCart(productId);
    toast.info(`${productName} removed from cart`);
  };

  const handleClearCart = () =>
  {
    clearCart();
    toast.info(`Cart Cleared Successfully`);
  };

  if (cart.length === 0) {
    return (
      <EmptyCart>
        <h2>Your cart is empty 🛒</h2>
        <Link to="/products" className="goToProducts"> Go to Products </Link>
      </EmptyCart>
    );
  }

  return (
    <Container>
      <CartItems>
        {cart.map((item) => (
          <CartItem key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="details">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <p> ₹ {item.price} /-</p>
              <div className="qty">
                <button onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
              </div>
              <h3 className="subTotal"> Subtotal : ₹ {item.price * item.qty} /-</h3>
              <button className="remove" onClick={() => handleRemove(item.id, item.name)}> Remove </button>
            </div>
          </CartItem>
        ))}
      </CartItems>

      <Summary>
        <h2>Cart Summary</h2>
        <h3>Total Items : {totalItems} </h3>
        <h3>Subtotal : ₹ {subtotal} /- </h3>
        <button className="clear" onClick={() => handleClearCart()}> Clear Cart </button>
      </Summary>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
`;
const CartItems = styled.div`
  flex: 2;
`;
const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
    background: #f9f9f9;
    border-radius: 8px;
  }

  .details {
    flex: 1;

    h3 {
      font-weight : bold;
    }

    .qty {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.5rem 0;

      button {
        width : 30px;
        height : 30px;
        margin : 10px 10px;
        font-weight : bold;
        border: 2px solid #0D6D26;
        background: #f3f4f6;
        cursor: pointer;
      }

      span {
        font-size : 15px;
      }
    }
    .remove {
      margin-top : 5px;
      padding : 3px 10px;
      background: #ff0000ff;
      color: white;
      border : none;
      border-radius : 10px;
      cursor: pointer;

      &:hover {
        background-color: #c10000ff;
      }
    }
  }
`;
const Summary = styled.div`
  flex: 1;
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 12px rgba(0,0,0,0.05);

  h2 {
    text-align : center;
    margin-bottom : 50px;
    color : #378000ff;
    font-weight : bold;
  }

  h3 {
    font-size : 25px;
    font-weight : bold;
  }

  .checkout {
    width: 100%;
    padding: 0.75rem;
    margin-top: 2rem;
    background: #2563eb;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #0c42b6ff;
    }
  }
  .clear {
    width: 100%;
    padding: 0.75rem;
    margin-top: 2rem;
    background: #ff0000ff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;

      &:hover {
        background-color: #c10000ff;
      }
  }
`;
const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  a {
    color: #2563eb;
    text-decoration: underline;
  }

  .goToProducts {
    font-size : 20px;
  }
`;

export default CartPage;
