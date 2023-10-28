import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewProduct from "./collections/ViewProduct";
import ViewCategory from "./collections/ViewCategory";
import Test from "./Test";
import Banner from "../../layouts/frontend/Banner";
import ProductBestseller from "./ProductBestseller";
import ProductNew from "./ProductNew";
const Home = () => {


  return (
    <div className="container">
      <div className="row">
        <Banner />
        <div div className="col-md ">
          <ViewCategory />
        </div>
      </div>
      
      <div className="col-md">
        <ProductBestseller />
      </div>
      <div className="col-md">
         <ProductNew />
        </div>
      <div className="col-md">
         <Test />
      </div>

    </div>

  );
}
export default Home;