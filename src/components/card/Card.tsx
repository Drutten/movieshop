import React from "react";
import './card.scss';

interface ICardProps {
    image: string;
    name: string;
    price: number;
}

export default function Card(props: ICardProps){


    function getEditedTitle(title: string): string{
        if(title.length > 60){
            title = title.substr(0, 58) + '...';
        }
        return title;
    }



    return( 
        <div className="card" >
            <div className="card-image">
                 
            <img src={props.image} alt={props.name}></img>
                
            </div>
            <div title={props.name} className="card-title">
                {getEditedTitle(props.name)}
            </div>
            <div className="card-price"><b>{props.price}</b> kr</div>
        </div>   
    );
}