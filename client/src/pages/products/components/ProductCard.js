import React from 'react';
import { Link } from 'react-router-dom';
import "../style/ProductCard.css"
export const ProductCard = (props) =>{

  return (
      <div className="Product-card">
        <div className="card-top">
          <img className="card-img"src={props.img} alt="productimage "></img>
        </div>
        <div className="card-information">
       <h5 className="card-title">{props.name}</h5>
       <p className="card-description">{props.description} </p>
       <button className="card-button" 
           >
            <Link to={"/product-info/"+props.id}>listen</Link>

           </button>
        </div>
      
    </div>
      
    )
  }