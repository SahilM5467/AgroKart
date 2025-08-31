import React from "react";
import { NavLink } from "react-router-dom";

const Product = (curElem) => {
  const { name, image, category } = curElem;
  return (
    <NavLink to={`/products`}>
      <div className="card">
        <figure>
          <img src={image} alt={name} />
        </figure>

        <div className="card-data"> {category} </div>
      </div>
    </NavLink>
  );
};

export default Product;