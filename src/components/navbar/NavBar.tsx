// Warning: findDOMNode is deprecated in StrictMode when using react-bootstrap Navbar
// warning when clicking hamburger button
import React from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import camera from '../../shared/images/kamera.png';
import { ICartItem } from '../../interfaces/icartitem';


interface INavBarProps {
  cartItems: ICartItem[];
  onReload(): void;
}



class NavBar extends React.Component<INavBarProps, {}> {
  

  calculateNumItems(): number {
    let numItems: number = 0;
    this.props.cartItems.forEach((item)=>{
      numItems += item.quantity;
    });
    return numItems;
  }


  
    
  render(){

    return (
      
      <Navbar expand="lg" className="mynav">
        <Link to="/" className="nav-link logo" onClick={this.props.onReload}><img src={camera} alt="logotype"></img></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link" onClick={this.props.onReload}>Home</Link>
            <Link to="/products" className="nav-link" onClick={this.props.onReload}>Products</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </Nav>
          
            <div className="basket">
              <span className="basket-number">{this.calculateNumItems()}</span><Link to="/cart" className="basket-icon"><span>&#128722;</span></Link>
            </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

  
export default NavBar;