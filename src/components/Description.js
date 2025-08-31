import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";

const Description = ({ myData }) => {

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="description-data">

            <p className="intro-data"> Welcome to </p>
            <h1> AgroKart </h1>
            <p>     
                AgroKart is your one-stop destination for all essential agricultural supplies.  
                From certified seeds and effective fertilizers to trusted pesticides - we bring everything a farmer needs under one roof.  
                Our platform is designed to simplify farming by offering high-quality, affordable, and reliable products.  
                Whether you're a small-scale grower or a large farm owner, AgroKart supports your journey to higher productivity and healthier crops.  
                Experience the ease of modern farming with AgroKart - where quality meets convenience.
            </p>

            <NavLink to={`/products`}>
              <Button> Shop Now </Button>
            </NavLink>
          </div>

          {/* our homepage image  */}
          <div className="description-image">
            <figure>
              <img
                src="Images/AgroKart-Products.jpg"
                alt="description-photo"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 8rem 0;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .description-data {
    p {
      font-size : 20px;
      text-align : justify;
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
      font-weight : bold;
      color : #0D6D26;
    }
  }

  .description-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
    
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(4, 104, 34, 0.4);
      position: absolute;
      left: 50%;
      top: -4rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 450px;
    height: 450px;
    border : solid;
    border-color : #0D6D26 ;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(4, 104, 34, 0.4);
    }
  }
`;

export default Description;