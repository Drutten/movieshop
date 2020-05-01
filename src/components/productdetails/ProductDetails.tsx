import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import './productdetails.scss';
import '../../shared/styles/buttonclasses.scss';
import tape from '../../shared/images/frulle.gif';
import IProduct from '../../interfaces/iproduct';
import { IProductService, ProductService } from '../../services/ProductService';
import { Link } from 'react-router-dom';
import Message from '../message/Message';




interface IProductDetailsProps {
    onAddToCart(product: IProduct): void;
}


export default function ProductDetails(props: IProductDetailsProps) {

    const categories: number[] = [];

    const defaultProduct = {
        title: '',
        id: 0,
        overview: '',
        poster_path: '',
        release_date: '',
        genre_ids: categories
    }


    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [product, setProduct] = useState(defaultProduct);
    let { id } = useParams();
    


    useEffect( () => {
        const service: IProductService = new ProductService();
        async function fetchProduct(url: string){
            const resultTuple = await service.getProduct(url);
            const fetchedProduct: IProduct | null = resultTuple[0];
            const errorMessage: string = resultTuple[1];
            if(fetchedProduct){
                setProduct(fetchedProduct);
                setLoading(false); 
            }
            else{
                setHasError(true);
                setErrorText(errorMessage);
                setLoading(false);
            }    
        }

        fetchProduct(`https://api.themoviedb.org/3/movie/${id}?api_key=c1f020d606cc9bf578a920d153a7c8e2&language=en-US`);
               
    }, [id]);




    function handleAdd(e: React.MouseEvent<HTMLElement>) {
        props.onAddToCart(product);
    }


    function getImageUrl(item: IProduct): string{
        if(item.poster_path){
            return `https://image.tmdb.org/t/p/w185${item.poster_path}`;
        }
        return 'https://i.postimg.cc/9MbvYYpr/kamera2.png';
    }
    

    
    if(hasError){
        return(
            <div className="detail">
                <Message>{errorText}</Message>
                <Link to="/" className="link"><span className="shop-btn movie-shop-button">Back to Home</span></Link> 
            </div>
        );
           
    }
    if(loading){
        return(
            <div className="wait-wrapper"><div><img src={tape} alt="loading"></img></div></div>
        )
    }
    return(
        <div className="detail">
        
            <div className="detail-wrapper">

                <div className="text-wrapper">

                    <h2 className="detail-name">{product.title}</h2>
                    <p><b>{(product.release_date)? product.release_date : ''}</b></p>
                    <p className="detail-description">{(product.overview)? product.overview : ''}</p>
                    <p>Price: <b>{200}</b> SEK</p>
                    
                    <button onClick={handleAdd} className="shop-btn movie-shop-button">Add to cart</button>
                    <Link to="/" className="link"><span className="shop-btn movie-shop-button">Back to products</span></Link>
                        
                </div>

                
                <div className="detail-image">
                    <img src={getImageUrl(product)} alt={product.title}/>
                </div>

            </div>
        </div>
       
    );
    
}






