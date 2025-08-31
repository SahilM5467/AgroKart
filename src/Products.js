import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const location = useLocation();

  // Read category from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");
    if (categoryFromURL) {
      setCategory(categoryFromURL);
    }
  }, [location.search]);

  // Fetch products
  useEffect(() => {
    fetch("/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products.");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter logic
  useEffect(() => {
    let result = products;

    if (category !== "All") {
      result = result.filter((product) => product.category === category);
    }

    if (search.trim() !== "") {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [category, search, products]);

  return (
    <PageWrapper>
      <Title>Our Products</Title>

      <ControlsWrapper>
        <ButtonGroup>
          {["All", "Seeds", "Fertilizers", "Pesticides"].map((cat) => (
            <FilterButton
              key={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </FilterButton>
          ))}
        </ButtonGroup>

        <SearchInput
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </ControlsWrapper>

      {loading ? (
        <Spinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : filtered.length === 0 ? (
        <EmptyMessage>No products found.</EmptyMessage>
      ) : (
        <ProductGrid>
          {filtered.map((product) => (
            <Card key={product.id}>
              <Link to={`/product/${product.id}`}>
                <DivImage>
                  <ProductImage src={product.image} alt={product.name} />
                </DivImage>
              </Link>
              <ProductName>{product.name}</ProductName>
              <ProductCategory> {product.category} </ProductCategory>
              <ProductPrice>₹ {product.price} /-</ProductPrice>
            </Card>
          ))}
        </ProductGrid>
      )}
    </PageWrapper>
  );
};

// Styled Components
const PageWrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  color: #0d6d26;
  margin-bottom: 2rem;
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  width: 100px;
  height: 40px;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: none;
  background-color: ${({ active }) => (active ? "#2f855a" : "#e2e8f0")};
  color: ${({ active }) => (active ? "white" : "#2d3748")};
  cursor: pointer;
  font-size: 15px;
  font-weight: ${({ active }) => (active ? "bold" : "none")};

  &:hover {
    background-color: ${({ active }) => (active ? "#276749" : "#cbd5e0")};
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
  width: 100%;
  height: 40px;

  @media (min-width: 768px) {
    width: 250px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  border: 1px solid #b6b0b0ff;
  border-radius: 12px;
  padding: 1rem;
  transition: box-shadow 0.3s;
  background-color: white;

  &:hover {
    box-shadow: 0px 0px 10px #0D6D26;
  }
`;

const DivImage = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
  background-color: #f9f9f9;
  transition: all 0.2s linear;

  &:hover {
      transform: scale(1.1);
  }
`;

const ProductName = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #000000ff;
  margin-top: 0.5rem;
`;

const ProductCategory = styled.h2`
  font-size: 2rem;
  color: #000000ff;
  margin-top: 0.5rem;
`;

const ProductPrice = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #276749;
  margin-top : 1.5rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-weight: bold;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #718096;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 4rem auto;
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top-color: #2f855a;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default Products;
