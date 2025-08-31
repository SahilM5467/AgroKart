import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/categories.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="intro-data">Check Now!</div>
        <div className="common-heading">Our Products</div>
        <div className="grid grid-three-column">
          {products.map((item) => (
            <div
              key={item.id}
              className="card"
              onClick={() => handleCategoryClick(item.name)}
              style={{ cursor: "pointer" }}
            >
              <figure>
                <img src={item.image} alt={item.name} />
              </figure>
              <div className="card-data">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 120rem;
  }
  .intro-data {
    font-size: 20px;
  }
  figure {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    img {
      max-width: 90%;
      height: 20rem;
      transition: all 0.2s linear;
    }
    &:hover img {
      transform: scale(1.2);
    }
  }
  .card {
    background-color: #fff;
    border-radius: 1rem;
    .card-data {
      padding: 5px;
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      color: #0d6d26;
    }
  }
`;

export default OurProducts;
