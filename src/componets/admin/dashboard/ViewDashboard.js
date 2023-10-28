import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import swal from "sweetalert";

const ViewDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [productCount, setProductCount] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    axios.get('/api/view-product').then(res => {
      if (res.status === 200) {
        setProductCount(res.data.productCount);
        setTotalQty(res.data.totalQty);
      }
    });
  }, []);

  return (

    <div >
      <h4>Tổng số lượng sản phẩm</h4>
      <p >{totalQty}</p>
      <i><Link to="/admin/view-product" style={{ textDecoration: 'none' }}>(chi tiết)</Link></i>
    </div>
  
  );
};

export default ViewDashboard;