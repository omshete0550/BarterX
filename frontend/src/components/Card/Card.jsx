import React from "react";
import "./Card.css";

const Card = ({ product }) => {
  return (
    <div className="cont">
      <div className="product-card">
        <div className="product-card__image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-card__info">
          <h2 className="product-card__title">{product.title}</h2>
          <p className="product-card__description">{product.description}</p>
          <div className="product-card__price-row">
            <span className="product-card__price">{product.date}</span>
            <button className="product-card__btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
