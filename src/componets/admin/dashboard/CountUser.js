import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import swal from "sweetalert";
const CountUser = () => {
    const [loading, setLoading] = useState(true);
    const [usersCount, setProductCount] = useState(0);
   
  
    useEffect(() => {
      axios.get('/api/view-user').then(res => {
        if (res.status === 200) {
          setProductCount(res.data.usersCount);
        }
      });
    }, []);
  
    return (
      <div>
        <h4>Khách Hàng đã đăng ký</h4>
        <p>{usersCount}</p>
        <i><Link to="/admin/view-user" style={{ textDecoration: 'none' }}>(chi tiết)</Link></i>
      </div>
    );
}
 
export default CountUser;