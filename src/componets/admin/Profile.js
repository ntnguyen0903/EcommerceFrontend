import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewDashboard from './dashboard/ViewDashboard';
import CountUser from './dashboard/CountUser';
import CountOrder from './dashboard/CountOrder';
import numeral from 'numeral';

const Profile = () => {
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    axios.get('/api/statistics').then(res => {
      if (res.data.status === 200) {
        setStatistics(res.data);
      }
    });
  }, []);

  if (!statistics) {
    return <h4>Loading statistics...</h4>;
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Arial', fontSize: '50px', fontWeight: 'bold', color: '#FF0000' }}>Thống Kê </h1>
      <h2>Tổng doanh thu: {numeral(statistics.totalRevenue).format('0,0')} VNĐ</h2>

      <table className='table'>
          <th > <ViewDashboard/></th>
          <th> <CountUser/></th>
          <th><CountOrder/></th>
      </table>
      
      <table className="table">
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng đã bán</th>
            <th>Tổng tiền đã bán</th>
          </tr>
        </thead>
        <tbody>
          {statistics.productStatistics.map(item => (
            <tr key={item.product_id}>
              <td>{item.product.id}</td>
              <td>{item.product.name}</td>
              <td>{item.totalQty}</td>
              <td>{numeral(item.totalSales).format('0,0')} VNĐ</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
