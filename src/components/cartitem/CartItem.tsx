import React from 'react';
import { ICartItem } from '../../interfaces/icartitem';
import '../../shared/styles/buttonclasses.scss';
import './cartitem.scss';
import IProduct from '../../interfaces/iproduct';

export interface CartItemProps {
    cartItem: ICartItem;
    onRemove(cartItem: ICartItem): void;
    onUpdateQuantity(cartItem: ICartItem): void;    
}
 
 
class CartItem extends React.Component<CartItemProps, {}> {


    handleRemove(e: React.MouseEvent<HTMLElement>){
        this.props.onRemove(this.props.cartItem);
    }

    
    handleUpdateQuantity(e: React.MouseEvent<HTMLElement>, num: number){
        let newQuantity: number = this.props.cartItem.quantity + num;
        if(newQuantity <= 0){
            newQuantity = 1;   
        }
        const newTotal: number = this.props.cartItem.price * newQuantity;
        const updatedCartItem: ICartItem = {
            product: this.props.cartItem.product,
            quantity: newQuantity,
            price: this.props.cartItem.price,
            totalPrice: newTotal
        }
        this.props.onUpdateQuantity(updatedCartItem);
    }


    getImageUrl(item: IProduct): string{
        if(item.poster_path){
            return `https://image.tmdb.org/t/p/w185${item.poster_path}`;
        }
        return 'https://i.postimg.cc/9MbvYYpr/kamera2.png';
    }
    



    render() { 
        return ( 
            <div className="cart-item">
                <div className="item-box">
                    <div className="cart-img-container">
                        <img src={this.getImageUrl(this.props.cartItem.product)} alt="product"></img>
                    </div> 

                    <div className="cart-item-title"><b>{this.props.cartItem.product.title}</b></div>
                </div>

                <div className="item-box">
                    <div className="cart-item-price">{this.props.cartItem.price} SEK</div>
                    <div className="quantity-container">
                        <div className="counter"><span onClick={(e) => this.handleUpdateQuantity(e, -1)}>-</span></div>
                        <div className="cart-item-quantity">{this.props.cartItem.quantity}</div>
                        <div className="counter"><span onClick={(e) => this.handleUpdateQuantity(e, 1)}>+</span></div>
                    </div>
                </div>
                
                <div className="item-box">
                    <div className="cart-item-total"><p>Total: <b>{this.props.cartItem.totalPrice}</b> SEK</p></div>
                    <div className="cart-remove">
                        <button onClick={this.handleRemove.bind(this)} className="shop-btn movie-shop-button">Remove</button>
                    </div>
                </div>
                
                
            </div>
    
        );
    }
}
 
export default CartItem;