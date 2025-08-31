import React from "react";
import Description from "./components/Description";
import OurProducts from "./components/OurProducts";
import Services from "./components/Services";
import Trusted from "./components/Trusted";

const Home = () => {

  return (
    <>
      <Description />
      <OurProducts />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;