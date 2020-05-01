import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.scss';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import NavBar from './components/navbar/NavBar';
import Products from './components/products/Products';
import ProductDetails from './components/productdetails/ProductDetails';
import NoPage from './components/nopage/NoPage';
import Cart from './components/cart/Cart';
import IProduct from './interfaces/iproduct';
import { ICartItem } from './interfaces/icartitem';
import Checkout from './components/checkout/Checkout';
import { ProductService } from './services/ProductService';



interface IAppState {
  cartItems: ICartItem[];
  toggledReload: boolean;
}



class App extends React.Component<{}, IAppState> {
  constructor(props: any){
    super(props);

    this.state = {
      cartItems: this.retrieveList('cartItems'),
      toggledReload: false
    }

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleUpdateQuantity = this.handleUpdateQuantity.bind(this);
    this.handleClearCart = this.handleClearCart.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }
  private productService = new ProductService();



  //Methods to handle cart

  handleAddToCart(addedProduct: IProduct) {
    //console.log(addedProduct);
    let isInCart: boolean = false;
    this.state.cartItems.forEach((item)=>{
      if(item.product.id === addedProduct.id){
        isInCart = true;
      }
    });
    if(!isInCart){
      const cartItem = {product: addedProduct, quantity: 1, price: 200, totalPrice: 200}; 
      const updatedCartItems = [...this.state.cartItems, cartItem];
      this.storeList(updatedCartItems, 'cartItems');
      this.setState({
        cartItems: updatedCartItems
      });
    }
  }


  handleRemoveFromCart(removedCartItem: ICartItem) {
    const updatedCartItems = this.state.cartItems.filter(item => {
      return (item.product.id !== removedCartItem.product.id);
    });
    this.storeList(updatedCartItems, 'cartItems');
    this.setState({cartItems: updatedCartItems});
  }


  handleUpdateQuantity(updatedCartItem: ICartItem) {
    const updatedCartItems = [...this.state.cartItems];
    //find item and replace with the updated version
    updatedCartItems.forEach((item, idx)=>{
      if(item.product.id === updatedCartItem.product.id){
        updatedCartItems.splice(idx, 1, updatedCartItem);
      }
    });
    this.storeList(updatedCartItems, 'cartItems');
    this.setState({cartItems: updatedCartItems});
  }


  handleClearCart() {
    const clearedCart: ICartItem[] = [];
    this.storeList(clearedCart, 'cartItems');
    this.setState({cartItems: clearedCart});
  }





  //Session storage
  storeList(arr: ICartItem[], storageName: string): void{
    //browser has webStorage
    if(typeof(Storage) !== "undefined"){           
        sessionStorage.setItem(storageName, JSON.stringify(arr));           
    }
  }


  retrieveList(storageName: string): ICartItem[]{
    const arr: ICartItem[] = [];
    //browser has webStorage
    if(typeof(Storage) !== "undefined"){

      //defined in sessionStorage
      if(sessionStorage.getItem(storageName)){
        let tempList: any[];
        let temp: string | null = sessionStorage.getItem(storageName); 
        tempList = (temp)? JSON.parse(temp) : [];
        
        if(tempList.length > 0){
            arr.length = 0;
            tempList.forEach((item: any) => {
                arr.push(item);
            });
        }
      }    
    }
    return arr;    
  }




  //changes state to refetch products/ orders on current page 
  //when clicking link to current page e.g. in navbar
  handleReload() {
    let newStatus = (this.state.toggledReload)? false : true;
    this.setState({toggledReload: newStatus}); 
  }


  
  render(){
    return (
      <div className="App">
        <div className="App-container">

          <NavBar cartItems={this.state.cartItems} onReload={this.handleReload}/>
          
          <Switch>
            <Route exact path="/">  
              <Home service={this.productService} toggledReload={this.state.toggledReload} onReload={this.handleReload}/>    
            </Route>
            <Route exact path="/about"> 
              <About/>
            </Route>
            <Route exact path="/contact">  
              <Contact/>
            </Route>
            <Route exact path="/products">  
              <Products service={this.productService} toggledReload={this.state.toggledReload} onReload={this.handleReload}/>
            </Route>
            <Route exact path="/products/:id">  
              <ProductDetails onAddToCart={this.handleAddToCart}/>
            </Route>
            <Route exact path="/cart">  
              <Cart cartItems={this.state.cartItems} onRemove={this.handleRemoveFromCart} onUpdateQuantity={this.handleUpdateQuantity}></Cart>
            </Route>
            <Route exact path="/checkout">  
              <Checkout cartItems={this.state.cartItems} onClearCart={this.handleClearCart}/>
            </Route>
            
            <Route path="*"> 
              <NoPage/>
            </Route>
          </Switch>
          </div>
          <footer><p>&copy; 2020 Rosi Drott Kohmareh</p></footer>
      </div>
    );
  }  
}

export default App;
