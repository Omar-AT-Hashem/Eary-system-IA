import React from 'react';
import{ Header} from '../../shared/Header';
import {Footer} from '../../shared/Footer';
import './style/ProductList.css';
import { ProductCard } from './components/ProductCard';
import{Data} from '../../core/data/content.js';
import { EmptyProduct } from './components/EmptyProduct';
export const ProductList = () =>{
  const items=Data;
  const displayMovies = ()=>{
    const watchNow = (id)=>{
      console.log("you clicked on button",IDBCursorWithValue);
    }
  return items.map((item)=>{
    return(
      <ProductCard
                 key={item.id} 
                 id={item.id}
                 name={item.name} 
                 description={item.description}
                 img={item.image}
                 watch= {watchNow}
                 />
    )
  }
  )}
 return (
 <div className="product-list"> {items.length>0? displayMovies():<EmptyProduct/>}
  </div>
  )
}