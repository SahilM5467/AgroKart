import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/" className="navLink">
        <img className="logo" src="./AgroKart-Icon.png" alt="my logo img" /> 
        <h1 className="appName"> AgroKart </h1>
      </NavLink>
      
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .navLink {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    padding : 10px;
    width : 100px;
    height : 100px;
  }

  .appName {
    color : #026C24;
    font-size : 40px;
  }
`;
export default Header;
