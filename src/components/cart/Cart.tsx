import React from 'react';
import './cart.scss';
import '../../shared/styles/buttonclasses.scss';
import { ICartItem } from '../../interfaces/icartitem';
import CartItem from '../cartitem/CartItem';
import { Link } from 'react-router-dom';
import Message from '../message/Message';


interface ICartProps {
    cartItems: ICartItem[];
    onRemove(cartItem: ICartItem): void;
    onUpdateQuantity(cartItem: ICartItem): void; 
}


class Cart extends React.Component<ICartProps, {}> {
  
  calculateTotal(): number {
    let total: number = 0;
    this.props.cartItems.forEach((item)=> {
      total += (item.price * item.quantity);
    });
    return total;
  }

  
  render(){

    if(!this.props.cartItems.length){
      return (
        <div className="cart">
          <h2>Cart</h2>
          <Message>Your cart is empty</Message>
          <Link to="/" className="link"><span className="shop-btn movie-shop-button">Back to Products</span></Link>
        </div>
      );
    }

    return (
      <div className="cart">
          <h2>Cart</h2>
          <div className="cart-wrapper">
            <div className="cart-item-wrapper">
              {this.props.cartItems.map((item) => {
                  return(
                    <CartItem key={item.product.id} cartItem={item} onRemove={this.props.onRemove} onUpdateQuantity={this.props.onUpdateQuantity}/>
                  );    
              })}
            </div>
            <div className="total">
              <p><b>Total: {this.calculateTotal()} SEK</b></p>
              <Link to="/checkout" className="link"><span className="shop-btn movie-shop-button">Go to checkout</span></Link>
              <br/> <br/> 
              <Link to="/" className="link"><span className="shop-btn movie-shop-button">Back to products</span></Link>
            </div>
          </div>
      </div>
    );
  }
}

  
export default Cart;