import React from "react";
// import NavBar from '../components/NavBar'
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Department from "../components/Department";
import Messageform from "../components/Messageform";

const Home = () => {
  return (
    <>
    
      <Hero
        title={
          "Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
        }
        imageUrl={"/hero.png"}
        
      />
      <Biography 

            imageurl={"/about.png"}
      />
      <Department />
      <Messageform />
    </>
  );
};

export default Home;
