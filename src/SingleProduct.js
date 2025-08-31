import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "./context/CartContext";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  useEffect(() => {
    fetch("/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load product data");
        return res.json();
      })
      .then((data) => {
        const found = data.find((item) => item.id.toString() === id);
        if (!found) throw new Error("Product not found");
        setProduct(found);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <Container>
      <Card>
        <Image src={product.image} alt={product.name} />
        <Details>
          <Title>{product.name}</Title>
          <Category>{product.category}</Category>
          <Price> ₹ {product.price} /-</Price>

          <Description>
            <ul>
              {product.description.split(". ").map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </Description>

          <Info>
            <p><strong> Company :</strong> {product.company}</p>
            <p><strong> Unit :</strong> {product.unit}</p>
          </Info>
          <AddToCartBtn onClick={handleAddToCart}>
            Add To Cart
          </AddToCartBtn>
          <BackLink to="/products"> ← Back to Products </BackLink>
        </Details>
      </Card>
    </Container>
  );
};

// ✅ Same styled-components from your existing SingleProduct.js
const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;

  @media(min-width: 768px) {
    flex-direction: row;
  }
`;
const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  background: #f9f9f9;

  @media(min-width: 768px) {
    width: 50%;
  }
`;
const Details = styled.div`
  padding: 1.5rem;
  flex: 1;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
`;
const Category = styled.p`
  color: #4b5563;
  margin: 0.5rem 0;
`;
const Price = styled.p`
  color: #16a34a;
  margin-top : 20px;
  font-size: 2.5rem;
  font-weight: 600;
`;
const Description = styled.p`
  margin: 2rem 0;
  line-height: 1.6; 

  ul {
    padding-left: 20px; 
    margin: 0;
  }
  li {
    list-style-type: disc;
    margin-bottom: 4px; 
`;
const Info = styled.div`
  font-size: 0.95rem;
  color: #374151;
  p {
    margin: 0.25rem 0;
  }
`;
const AddToCartBtn = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.25rem;
  background-color: #0D6D26;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #4CA00A;
  }
`;
const BackLink = styled(Link)`
  display: inline-block;
  margin: 1.5rem;
  font-size: 1.5rem;
  color: #2563eb;
  text-decoration: underline;
`;

export default SingleProduct;
