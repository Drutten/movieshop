import React from "react";
import './products.scss';
import '../../shared/styles/buttonclasses.scss';
import { Link } from "react-router-dom";
import tape from '../../shared/images/frulle.gif';
import IProduct from "../../interfaces/iproduct";
import { IProductService } from "../../services/ProductService";
import Card from "../card/Card";
import Message from "../message/Message";


interface IProductProps {
    service: IProductService;
    onReload(): void;
    toggledReload: boolean;
}


interface IProductState {
    products: IProduct[];
    loading: boolean;
    hasError: boolean;
    errorText: string;
    notFound: boolean;
    search: string;
    category: string;
}



export default class Products extends React.Component<IProductProps, IProductState> {
    constructor(props: IProductProps) {
        super(props);

        this.state = {
            products: [],
            loading: false,
            hasError: false,
            errorText: '',
            notFound: false,
            search: '',
            category: ''
        };
        
    }

    

    componentDidMount() {
        this.fetchProducts('https://api.themoviedb.org/3/movie/top_rated?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US&page=1'); 
    }


    componentDidUpdate(prevProps: IProductProps) {
        //on link or navbar click current page
        if(this.props.toggledReload !== prevProps.toggledReload){
            this.setState({
                hasError: false,
                errorText: '',
                notFound: false
            });
            this.fetchProducts('https://api.themoviedb.org/3/movie/top_rated?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US&page=1');    
        }
    }


    handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            search: e.target.value 
        });
    }


    handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let searchText = this.state.search;
        this.setState({
            hasError: false,
            errorText: '',
            notFound: false,
            search: ''
        });
        this.fetchProducts(`https://api.themoviedb.org/3/search/movie?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US&query=${searchText}%20&page=1&include_adult=false`);    
    }


    handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>){
        this.setState({
            category: e.target.value
        });
    }

    handleCategorySubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        let categoryId = Number(this.state.category);
        this.setState({
            hasError: false,
            errorText: '',
            notFound: false,
            search: ''
        });
        this.fetchProducts(`https://api.themoviedb.org/3/movie/top_rated?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US&page=4`, categoryId);
    }



    


    async fetchProducts(url: string, categoryId: number = 0){
        this.setState({
            loading: true
        });
        const resultTuple: [IProduct[], string] = await this.props.service.getProducts(url);
        const fetchedProducts: IProduct[] = resultTuple[0];
        let errorMessage: string = resultTuple[1];
        if(fetchedProducts.length){
            if(categoryId > 0){
                //If second parameter category id was given
                const filteredProducts: IProduct[] = [];
                fetchedProducts.forEach((item: IProduct)=>{
                    item.genre_ids.forEach((genre: number)=>{
                        if(genre === categoryId){
                            filteredProducts.push(item);
                        }
                    });   
                })
                this.setState({
                    products: filteredProducts,
                    loading: false
                });
            }
            else{
                //No category filter
                this.setState({
                    products: fetchedProducts,
                    loading: false
                });  
            }               
        }
        else if(errorMessage){
            this.setState({
                hasError: true,
                errorText: errorMessage,
                loading: false
            });
        }
        else{
            this.setState({
                notFound: true,
                loading: false
            });
        }
    }




    addErrorMessage(): JSX.Element{
        let message =  <React.Fragment>
            <h4>Oops! Something went wrong</h4>
            <p>{this.state.errorText}</p>
        </React.Fragment>;
        return message;
    }


    getImageUrl(item: IProduct): string{
        if(item.poster_path){
            return `https://image.tmdb.org/t/p/w185${item.poster_path}`;
        }
        return 'https://i.postimg.cc/9MbvYYpr/kamera2.png';
    }


    
    


    render() {

        const forms = <div className="form-container">
            <form className="search-form" onSubmit={(e)=>this.handleSearchSubmit(e)}>
                <input type="text" placeholder="Movie title" name="search" value={this.state.search} onChange={(e)=>this.handleSearchChange(e)} required></input>
                <button type="submit" className="movie-shop-button">Search</button>
            </form>
            <form className="category-form" onSubmit={(e)=>this.handleCategorySubmit(e)}>
                <span>Category:&nbsp;</span> 
                <select value={this.state.category} onChange={(e)=>this.handleCategoryChange(e)}>
                    <option value=""></option>
                    <option value="28">Action</option>
                    <option value="53">Thriller</option>
                    <option value="35">Comedy</option>
                    <option value="878">Sci-fi</option>
                </select>
                <button type="submit" className="movie-shop-button">Filter</button>
            </form>
        </div>; 
        
        
        
        if(this.state.hasError){
            return(
                <div className="products">
                    {forms}
                    <Message>{this.addErrorMessage()}</Message> 
                    <Link to="/" className="link"><span className="shop-btn movie-shop-button" onClick={this.props.onReload}>Back to Products</span></Link>
                </div>
            );
        }

        if(this.state.notFound){
            return(
                <div className="products">
                    {forms}
                    <Message>Product not found</Message> 
                    <Link to="/" className="link"><span className="shop-btn movie-shop-button" onClick={this.props.onReload}>Back to Products</span></Link>
                </div>
            );
        }

        if(this.state.loading) {
            return (
                <div className="wait-wrapper"><div><img src={tape} alt="loading"></img></div></div>
            );
        } 

        return (
        <div>
            {forms}
            <div className="product-wrapper">
                    {this.state.products.map(item => {

                        return (<Link to={`/products/${item.id}`} className="product-link" key={item.id}>
                            <Card image={this.getImageUrl(item)} name={item.title} price={200}/>
                        </Link>
                        );
   
                    })}
            </div>
        </div>
        );
    }
}
