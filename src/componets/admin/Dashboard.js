import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewDashboard from './dashboard/ViewDashboard';
import CountUser from './dashboard/CountUser';
import CountOrder from './dashboard/CountOrder';
import numeral from 'numeral';
import ReactPaginate from 'react-paginate';

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5; // Số lượng sản phẩm hiển thị trên mỗi trang


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
  const offset = currentPage * productsPerPage;
  const currentProducts = statistics.productStatistics.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(statistics.productStatistics.length / productsPerPage);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };
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
          {currentProducts.map(item => (
            <tr key={item.product_id}>
              <td>{item.product.id}</td>
              <td>{item.product.name}</td>
              <td>{item.totalQty}</td>
              <td>{numeral(item.totalSales).format('0,0')} VNĐ</td>
             
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center">
      <ReactPaginate
                previousLabel={'Trước'}
                nextLabel={'Tiếp'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                />
      </div>
    </div>
  );
};

export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ViewDashboard from './dashboard/ViewDashboard';
// import CountUser from './dashboard/CountUser';
// import CountOrder from './dashboard/CountOrder';
// import numeral from 'numeral';
// import ReactPaginate from 'react-paginate';
// const Dashboard = () => {
//   const [statistics, setStatistics] = useState(null);

//   const [currentPage, setCurrentPage] = useState(0);
//   const productsPerPage = 1; // Số lượng sản phẩm hiển thị trên mỗi trang


//   useEffect(() => {
//     axios.get('/api/statistics').then(res => {
//       if (res.data.status === 200) {
//         setStatistics(res.data);
//       }
//     });
//   }, []);

//   if (!statistics) {
//     return <h4>Loading statistics...</h4>;
//   }
//   const offset = currentPage * productsPerPage;
//   const currentProducts = statistics.productStatistics.slice(offset, offset + productsPerPage);
//   const pageCount = Math.ceil(statistics.productStatistics.length / productsPerPage);

//   const handlePageChange = ({ selected: selectedPage }) => {
//     setCurrentPage(selectedPage);
//   };
//   return (
//     <div>
//       <h1 style={{ fontFamily: 'Arial', fontSize: '50px', fontWeight: 'bold', color: '#FF0000' }}>Thống Kê </h1>
//       <h2>Tổng doanh thu: {numeral(statistics.totalRevenue).format('0,0')} VNĐ</h2>

//       <table className='table'>
//           <th > <ViewDashboard/></th>
//           <th> <CountUser/></th>
//           <th><CountOrder/></th>
//       </table>  
      
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Mã sản phẩm</th>
//             <th>Tên sản phẩm</th>
//             <th>Số lượng đã bán</th>
//             <th>Tổng tiền đã bán</th>
//           </tr>
//         </thead>
//         <tbody>
//           {statistics.productStatistics.map(item => (
//             <tr key={item.product_id}>
//               <td>{item.product.id}</td>
//               <td>{item.product.name}</td>
//               <td>{item.totalQty}</td>
//               <td>{numeral(item.totalSales).format('0,0')} VNĐ</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="d-flex justify-content-center">
//         <ReactPaginate
//           previousLabel={'Previous'}
//           nextLabel={'Next'}
//           breakLabel={'...'}
//           breakClassName={'break-me'}
//           pageCount={pageCount}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageChange}
//           containerClassName={'pagination'}
//           subContainerClassName={'pages pagination'}
//           activeClassName={'active'}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
