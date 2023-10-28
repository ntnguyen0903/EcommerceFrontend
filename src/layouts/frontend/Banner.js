import React from "react";

const Banner = () => {
  return (
    <div>   
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://thietkehaithanh.com/wp-content/uploads/2019/01/thietkehaithanh-banner-laptop.png" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/jbl-charge-5-06-2023.png" className="d-block w-100" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="https://pubcdn.ivymoda.com/files/news/2023/03/06/63de1b697d785a9f15c3bef27024e165.jpg" className="d-block w-100" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
    
  );
};

export default Banner;
