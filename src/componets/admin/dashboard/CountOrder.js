import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import swal from "sweetalert";

const CountOrder = () => {
  const [loading, setLoading] = useState(true);
  const [ordersCount, setOrdersCount] = useState(0);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/count-Order').then(res => {
      if (res.status === 200) {
        setOrdersCount(res.data.ordersCount);
      }
    });

    axios.get('/api/view-orders').then(res => {
      if (res.status === 200) {
        setAllOrders(res.data.allOrders);
      }
    });
  }, []);

  return (
    <div>
      <h2>Đơn Hàng Hoàn Thành</h2>
      <p>{ordersCount}/{allOrders}</p>   
      <i><Link to="/admin/view-order" style={{ textDecoration: 'none' }}>(chi tiết)</Link></i>
    </div>
  );
}
export default CountOrder;
//countOrder
