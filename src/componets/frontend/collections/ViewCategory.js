import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const ViewCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMountered = true;
    axios.get('/api/getCategory').then(res => {
        if(isMountered){
            if (res.data.status === 200) {
                setCategory(res.data.category);
                setLoading(false);
              }
        }
    });
    return ()=>{
        isMountered = false;
    }
  }, []);

  if (loading) {
    return <h4>Đang tải loại....</h4>;
  } 
  else
   {
    var showCategoryList = category.map((item, idx) => (
      <div className="col-md-2" key={idx}>
        <div className="card">
          <div className="">
          <Link to={`/collections/${item.slug}`} style={{ textDecoration: 'none' }}>
          <h5>{item.name}</h5>
          </Link>
          </div>
        </div>
      </div>
    ));
  

    return (
      <div>
        
      

        <div className="py-3">
          <div className="container">
            <div className="row">{showCategoryList}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default ViewCategory;