// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import numeral from 'numeral';
// const ViewOrder = () => {
  

//     const [loading, setLoading] = useState(true);
//     const [orders, setOrders] = useState([]);

//     const [searchTerm, setSearchTerm] = useState('');
   
//     const handleSearch = (e) => {
//         e.preventDefault(); // Ngăn chặn hành vi mặc định của form submit
//         setLoading(true); // Đặt lại trạng thái loading về true để hiển thị thông báo đang tải
    
//         axios.get(`/api/searchOrder?term=${searchTerm}`).then(res => {
//                 if (res.data.results) {
//                     setOrders(res.data.results);
//                 }
//                 setLoading(false); // Đặt trạng thái loading về false khi nhận được kết quả từ API
//             })
//             .catch(error => {
//                 setLoading(false); // Đặt trạng thái loading về false khi có lỗi xảy ra
//                 console.log(error);
//             });
//     };

//     useEffect(() => {

//         let isMounted = true;
//         document.title = "Orders";

//         axios.get(`/api/view-orders`).then(res=>{
//             if(isMounted)
//             {
//                 if(res.data.status === 200)
//                 {
//                     setOrders(res.data.orders);
//                     setLoading(false);
//                 }
//             }
//         });
//         return () => {
//             isMounted = false
//         };
//     }, []);

   
//     var display_orders = "";
//     if(loading)
//     {
//         return <h4>Loading Orders...</h4>
//     }
//     else
//     {
//         display_orders = orders.map( (item) => {
            
//             return (
//                 <tr key={item.id}>
//                     <td>{item.id}</td>
                
//                     <td>{item.tracking_no}</td>
//                     <td>{item.firstname}{item.lastname}</td>
//                     <td>{numeral(item.totalPrice).format('0,0')}đ</td>
//                     <td>{item.phone}</td>
//                     <td>{item.email}</td>
//                     <td>{item.status}</td>
//                     {/* <td>{item.created_at}</td> */}
//                     {/* <td>{item.}</td> */}
//                     <td colSpan="4">
//                     {item.orderitems.map((orderItem, index) => {
                    
//                       return (
//                         <div key={index}>
//                           <p>Tên Sản Phẩm: {orderItem.product.name}</p>
//                           <p>Số lượng: {orderItem.qty}</p>
//                           <p>Giá: {numeral(orderItem.product.selling_price).format('0,0')}đ</p>
//                           <p>Tổng Tiền: {numeral(orderItem.product.selling_price * orderItem.qty).format('0,0')}đ</p>
//                         </div>
//                       );
//                     })}
//                     </td>   
//                     <td>
//                         <Link to={`chitiet-order/${item.id}`} className="btn btn-success btn-sm">Chi tiết</Link>     
//                     </td>                 
//                     <td>
//                         <Link to={`edit-order/${item.id}`} className="btn btn-success btn-sm">Cập Nhật</Link>     
//                     </td>
//                 </tr>
//             )
//         });
//     }

//     return (
//         <div className="container px-4 mt-3">
//         <div className="card">
//             <div className="card-header">
//                 <h4>Danh Sách Đơn Hàng  </h4>

//                 <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
//                         <input
//                             className="form-control mr-sm-2"
//                             type="search"
//                             placeholder="Tìm kiếm"
//                             aria-label="Search"
//                             value={searchTerm}
//                             onChange={e => setSearchTerm(e.target.value)}
//                         />
//                     </form>
             
//             </div>
//             <div className="card-body">
//                 <div className="table-responsive">
//                     <table className="table table-bordered table-striped">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Mã theo dỗi đơn hàng</th>
//                                 <th>Tên Khách hàng</th>
//                                 <th>Tổng tiền</th>
//                                 <th>Số điện thoại</th>
//                                 <th>Email</th>
//                                 <th>Trạng thái</th>
//                                 <th>Chi tiết</th>
                              
//                                 {/* <td>Ngày Đặt</td> */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {display_orders}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//         </div>
//     )

// }
 
// export default ViewOrder;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import numeral from 'numeral';

// const ViewOrder = () => {
//   const [loading, setLoading] = useState(true);
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     axios.get(`/api/searchOrder?term=${searchTerm}`)
//       .then(res => {
//         if (res.data.results) {
//           setOrders(res.data.results);
//         } else {
//           setOrders([]);
//         }
//         setLoading(false);
//       })
//       .catch(error => {
//         setLoading(false);
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     let isMounted = true;
//     document.title = 'Orders';

//     axios.get('/api/view-orders')
//       .then(res => {
//         if (isMounted && res.data.status === 200) {
//           setOrders(res.data.orders);
//           setLoading(false);
//         }
//       })
//       .catch(error => {
//         setLoading(false);
//         console.log(error);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   if (loading) {
//     return <h4>Loading Orders...</h4>;
//   }

//   if (!orders) {
//     return <h4>No Orders Found.</h4>;
//   }

//   return (
//     <div className="container px-4 mt-3">
//       <div className="card">
//         <div className="card-header">
//           <h4>Danh Sách Đơn Hàng</h4>
//           <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
//             <input
//               className="form-control mr-sm-2"
//               type="search"
//               placeholder="Tìm kiếm"
//               aria-label="Search"
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//             />
//           </form>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Mã theo dõi đơn hàng</th>
//                   <th>Tên Khách hàng</th>
//                   <th>Tổng tiền</th>
//                   <th>Số điện thoại</th>
//                   <th>Email</th>
//                   <th>Trạng thái</th>
//                   <th>Chi tiết</th>
//                   <th>Cập nhật</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((item) => (
//                   <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.tracking_no}</td>
//                     <td>{item.firstname} {item.lastname}</td>
//                     <td>{numeral(item.totalPrice).format('0,0')}đ</td>
//                     <td>{item.phone}</td>
//                     <td>{item.email}</td>
//                     <td>{item.status}</td>
//                     <td colSpan="4">
//                       {item.orderitems && item.orderitems.map((orderItem, index) => (
//                         <div key={index}>
//                           <p>Tên Sản Phẩm: {orderItem.product.name}</p>
//                           <p>Số lượng: {orderItem.qty}</p>
//                           <p>Giá: {numeral(orderItem.product.selling_price).format('0,0')}đ</p>
//                           <p>Tổng Tiền: {numeral(orderItem.product.selling_price * orderItem.qty).format('0,0')}đ</p>
//                         </div>
//                       ))}
//                     </td>
//                     <td>
//                       <Link to={`chitiet-order/${item.id}`} className="btn btn-success btn-sm">Chi tiết</Link>
//                     </td>
//                     <td>
//                       <Link to={`edit-order/${item.id}`} className="btn btn-success btn-sm">Cập Nhật</Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewOrder;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import ReactPaginate from 'react-paginate';

const ViewOrder = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const ordersPerPage = 5; // Số lượng đơn hàng hiển thị trên mỗi trang

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.get(`/api/searchOrder?term=${searchTerm}`)
      .then(res => {
        if (res.data.results) {
          setOrders(res.data.results);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    let isMounted = true;
    document.title = 'Orders';

    axios.get('/api/view-orders')
      .then(res => {
        if (isMounted && res.data.status === 200) {
          setOrders(res.data.orders);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const offset = currentPage * ordersPerPage;
  const currentOrders = orders.slice(offset, offset + ordersPerPage);
  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  if (loading) {
    return <h4>Loading Orders...</h4>;
  }

  if (!orders) {
    return <h4>No Orders Found.</h4>;
  }

  return (
    <div className="container px-4 mt-3">
      <div className="card">
        <div className="card-header">
          <h4>Danh Sách Đơn Hàng</h4>
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Tìm kiếm"
              aria-label="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Mã theo dõi đơn hàng</th>
                  <th>Tên Khách hàng</th>
                  <th>Tổng tiền</th>
                  <th>Số điện thoại</th>
                  <th>Email</th>
                  <th>Trạng thái</th>
                  <th>Chi tiết</th>
                  <th>Cập nhật</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.firstname} {item.lastname}</td>
                    <td>{numeral(item.totalPrice).format('0,0')}đ</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.status}</td>
                    <td colSpan="4">
                      {item.orderitems && item.orderitems.map((orderItem, index) => (
                        <div key={index}>
                          <p>Tên Sản Phẩm: {orderItem.product.name}</p>
                          <p>Số lượng: {orderItem.qty}</p>
                          <p>Giá: {numeral(orderItem.product.selling_price).format('0,0')}đ</p>
                          <p>Tổng Tiền: {numeral(orderItem.product.selling_price * orderItem.qty).format('0,0')}đ</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      <Link to={`chitiet-order/${item.id}`} className="btn btn-success btn-sm">Chi tiết</Link>
                    </td>
                    <td>
                      <Link to={`edit-order/${item.id}`} className="btn btn-success btn-sm">Cập Nhật</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
    </div>
  );
};

export default ViewOrder;
