// import axios from "axios";
// import React, { useEffect, useState, } from "react";
// import ReactDOM  from "react-dom";
// import { useHistory } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import numeral from 'numeral';
// import swal from 'sweetalert';
// const Checkout = () => {

//     const [totalPrice, setTotalPrice] = useState(0);
//     const history = useHistory();
//     if (!localStorage.getItem('auth_token')) {
//         history.push('/');
//         swal("Cảnh báo", "Đăng nhập để đến Trang giỏ hàng", "error");
//     }
//     const [loading, setLoading] = useState(true);
//     const [cart, setCart] = useState([]);

//     const [error, setError] = useState([]);
//     //khỏi tạo biến tt
//     var totalCartPrice = 0;

//     const [checkoutInput, setCheckoutInput] = useState({
//         firstname: '',
//         lastname: '',
//         phone: '',
//         email: '',
//         address: '',
//         city: '',
//         state: '',
//         zipcode: '',
//     });

//     useEffect(() => {

//         let isMounted = true;


//         axios.get(`/api/cart`).then(res => {
//             if (isMounted) {
//                 if (res.data.status === 200) {
//                     setCart(res.data.cart);
//                     setLoading((false));
//                 }
//                 else if (res.data.status === 401) {
//                     history.push('/');
//                     swal("Warrning", res.data.message, "error");
//                 }
//             }
//         });
//         return () => {
//             isMounted = false
//         };
//     }, [history]);

//     const handleInput = (e) => {
//         e.persist();
//         setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });

//     }
//     // const orderinfo_data = {
//     //     firstname: checkoutInput.firstname,
//     //     lastname: checkoutInput.lastname,
//     //     phone: checkoutInput.phone,
//     //     email: checkoutInput.email,
//     //     address: checkoutInput.address,
//     //     city: checkoutInput.city,
//     //     state: checkoutInput.state,
//     //     zipcode: checkoutInput.zipcode,
//     //     //
//     //     payment_mode: 'Paid by PayPad',
//     //     payment_id: '',
//     // }
//     //   // Paypal Code
//     //   const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
//     //   const createOrder = (data, actions) =>{
//     //       return actions.order.create({
//     //         purchase_units: [
//     //           {
//     //             amount: {
//     //               value: '0.1',
//     //             },
//     //           },
//     //         ],
//     //       });
//     //   };
//     //   const onApprove = (data, actions) => {
//     //       return actions.order.capture().then(function(details){
//     //         console.log(details);
//     //         orderinfo_data.payment_id = details.id;


//     //         axios.post(`/api/place-order`, orderinfo_data).then(res => {
//     //             if (res.data.status === 200) {
//     //                 swal("Đặt hàng thành công", res.data.message, "success");
//     //                 setError([]);
//     //                 history.push('/thank-you');
//     //             } else if (res.data.status === 422) {
//     //                 swal("Tất cả các lĩnh vực là bắt buộc", "", "error");
//     //                 setError(res.data.errors);
//     //             }
//     //         });
//     //       });
     
           
//     //   };
//     //   // End-Paypal Code
//     const submitOrder = (e, payment_mode) => {
//         e.preventDefault();

//         const data = {
//             firstname: checkoutInput.firstname,
//             lastname: checkoutInput.lastname,
//             phone: checkoutInput.phone,
//             email: checkoutInput.email,
//             address: checkoutInput.address,
//             city: checkoutInput.city,
//             state: checkoutInput.state,
//             zipcode: checkoutInput.zipcode,
//             //
//             payment_mode: payment_mode,
         
//             payment_id: '',
//         }
//         //

//         debugger;
//         switch (payment_mode) {
//             case 'cod':
//                 axios.post(`/api/place-order`, data).then(res => {
//                     if (res.data.status === 200) {
//                         swal("Đặt hàng thành công", res.data.message, "success");
//                         setError([]);
//                         history.push('/thank-you');
//                     }
//                      else if (res.data.status === 422) {
//                         swal("Tất cả các lĩnh vực là bắt buộc","", "error");
//                         setError(res.data.errors);
//                     }
//                     else if (res.data.status === 423) {
//                         swal("Xin lỗi bạn",res.data.message, "error");
//                         history.push('/checkout');
                        
//                     }
//                 });
//                 break;
//             case 'razorpay':
//                 axios.post(`/api/validate-order`,data).then(res=>{
//                     if (res.data.status === 200) {
//                         setError([]);

//                     } else if (res.data.status === 422) {
//                         swal("All fields are mandatory", "", "error");
//                         setError(res.data.errors);
//                     }

//                 });
//                 break;
//             case 'payonline':
//                 axios.post(`/api/validate-order`, data).then(res => {
//                     if (res.data.status === 200) {
//                         setError([]);
//                         var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
//                         myModal.show();
                   

//                     } else if (res.data.status === 422) {
//                         swal("Tất cả các lĩnh vực là bắt buộc", "", "error");
//                         setError(res.data.errors);
//                     }

//                 });
//                 break;
//             default:
//                 break;
//         }

//     }
//     if (loading) {
//         return <h4>Đang tải thanh toán....</h4>
//     }
//     var checkout_HTML = '';
//     if (cart.length > 0) {
//         checkout_HTML = <div>
//             <div className="row">

//                 <div className="col-md-7">
//                     <div className="card">
//                         <div className="card-header">
//                             <h4>Thông tin </h4>
//                         </div>
//                         <div className="card-body">

//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <div className="form-group mb-3">
//                                         <label>Tên</label>
//                                         <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
//                                         <small className="text-danger">{error.firstname}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="form-group mb-3">
//                                         <label>Họ</label>
//                                         <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
//                                         <small className="text-danger">{error.lastname}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="form-group mb-3">
//                                         <label>Số  điện thoại</label>
//                                         <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
//                                         <small className="text-danger">{error.phone}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="form-group mb-3">
//                                         <label>Địa chỉ email</label>
//                                         <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
//                                         <small className="text-danger">{error.email}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="form-group mb-3">
//                                         <label>Địa chỉ</label>
//                                         <textarea row="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
//                                         <small className="text-danger">{error.address}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="form-group mb-3">
//                                         <label>Thành Phố</label>
//                                         <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
//                                         <small className="text-danger">{error.city}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="form-group mb-3">
//                                         <label>Tỉnh</label>
//                                         <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
//                                         <small className="text-danger">{error.state}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="form-group mb-3">
//                                         <label>Mã bưu điện</label>
//                                         <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
//                                         <small className="text-danger">{error.zipcode}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="form-group text-end">
//                                         <button type="button" onClick={(e) => submitOrder(e, 'cod')} className="btn btn-primary mx-1">Đặt Hàng</button>
//                                         {/* <button type="button" onClick={(e) => submitOrder(e, 'payonline')} className="btn btn-primary mx-1">Thanh toán trực tuyến</button> */}
                                     
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-5">
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th width="50%">Sản phẩm</th>
//                                 <th>Gía</th>
//                                 <th>Số Lượng</th>
//                                 <th>Tổng cộng</th>
//                             </tr>
//                         </thead>
//                         <tbody>

//                             {cart.map((item, idx) => {
//                                     totalCartPrice += item.product.selling_price * item.product_qty;
//                                     return (
//                                         <tr key={idx}>
//                                             <td>{item.product.name}</td>
//                                             <td>{numeral(item.product.selling_price).format('0,0')}Đ</td>
//                                             <td>{item.product_qty}</td>
//                                             <td>{numeral(item.product.selling_price * item.product_qty).format(0,0)}Đ</td>
//                                         </tr>
//                                     );
//                                 })}
                
//                                 <tr>
//                                     <td colSpan="2" className="text-end fw-bold">Tổng Cộng:</td>
//                                     <td colSpan="2" className="text-end fw-bold">{numeral(totalCartPrice).format('0,0')}Đ</td>
//                                 </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     }
//     else {
//         checkout_HTML = <div>
//             <div className="card card-body py-5 text-center shadow-sm" >
//                 <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán</h4>
//             </div>
//         </div>
//     }
//     return (
//         <div>
          
//             <div className="modal fade" id="payOnlineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div class="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">Chế độ thanh toán trực tuyến</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <hr/>
//                             <PayPalButton
//                             createOrder={(data, actions) => createOrder(data, actions)}
//                             onApprove={(data, actions) => onApprove(data, actions)}
//                             />
//                         </div>
                        
//                     </div>
//                 </div>
//             </div>
//             <div className="py-3 bg-warning">
//                 <div className="container">
//                     <h6>Home/Checkout</h6>
//                 </div>
//             </div>

//             <div className="py-4">
//                 <div className="container">
//                     {checkout_HTML}
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default Checkout;
//test api online
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
// import numeral from 'numeral';
// import swal from 'sweetalert';

// const Checkout = () => {
//     const [totalPrice, setTotalPrice] = useState(0);
//     const history = useHistory();

//     if (!localStorage.getItem('auth_token')) {
//         history.push('/');
//         swal("Cảnh báo", "Đăng nhập để đến Trang giỏ hàng", "error");
//     }

//     const [loading, setLoading] = useState(true);
//     const [cart, setCart] = useState([]);
//     const [error, setError] = useState([]);

//     const [provinces, setProvinces] = useState([]);
//     const [districts, setDistricts] = useState([]);
//     const [wards, setWards] = useState([]);
//     const [selectedProvince, setSelectedProvince] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [selectedWard, setSelectedWard] = useState('');

//     const [checkoutInput, setCheckoutInput] = useState({
//         firstname: '',
//         lastname: '',
//         phone: '',
//         email: '',
//         address: '',
//         city: '',
//         state: '',
//         zipcode: '',
//     });

//     useEffect(() => {
//         let isMounted = true;

//         axios.get(`/api/cart`).then(res => {
//             if (isMounted) {
//                 if (res.data.status === 200) {
//                     setCart(res.data.cart);
//                     setLoading((false));
//                 } else if (res.data.status === 401) {
//                     history.push('/');
//                     swal("Warrning", res.data.message, "error");
//                 }
//             }
//         });

//         return () => {
//             isMounted = false;
//         };
//     }, [history]);

//     useEffect(() => {
//         let totalCartPrice = 0;

//         cart.forEach((item) => {
//             totalCartPrice += item.product.selling_price * item.product_qty;
//         });

//         setTotalPrice(totalCartPrice);
//     }, [cart]);

//     useEffect(() => {
//         axios.get("https://provinces.open-api.vn/api/p/")
//             .then(response => {
//                 setProvinces(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching provinces:", error);
//             });
//     }, []);

//     const handleChangeProvince = (e) => {
//         const provinceId = e.target.value;
//         setSelectedProvince(provinceId);

//         axios.get(`https://provinces.open-api.vn/api/p/${provinceId}/d`)
//             .then(response => {
//                 setDistricts(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching districts:", error);
//             });
//     };

//     const handleChangeDistrict = (e) => {
//         const districtId = e.target.value;
//         setSelectedDistrict(districtId);

//         axios.get(`https://provinces.open-api.vn/api/district/${districtId}/ward`)
//             .then(response => {
//                 setWards(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching wards:", error);
//             });
//     };

//     const handleChangeWard = (e) => {
//         const wardId = e.target.value;
//         setSelectedWard(wardId);
//     };

//     const handleInput = (e) => {
//         e.persist();
//         setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
//     };

//     const submitOrder = (e, payment_mode) => {
//         e.preventDefault();

//         const data = {
//             firstname: checkoutInput.firstname,
//             lastname: checkoutInput.lastname,
//             phone: checkoutInput.phone,
//             email: checkoutInput.email,
//             address: checkoutInput.address,
//             city: selectedProvince,
//             state: selectedDistrict,
//             zipcode: selectedWard,
//             payment_mode: payment_mode,
//             totalPrice: totalPrice,
//             payment_id: '',
//         };

//         switch (payment_mode) {
//             case 'cod':
//                 axios.post(`/api/place-order`, data).then(res => {
//                     if (res.data.status === 200) {
//                         swal("Đặt hàng thành công", res.data.message, "success");
//                         setError([]);
//                         history.push('/thank-you');
//                     } else if (res.data.status === 422) {
//                         swal("Tất cả các lĩnh vực là bắt buộc", "", "error");
//                         setError(res.data.errors);
//                     } else if (res.data.status === 423) {
//                         swal("Xin lỗi bạn", res.data.message, "error");
//                         history.push('/checkout');
//                     }
//                 });
//                 break;
//             default:
//                 break;
//         }
//     };

//     if (loading) {
//         return <h4>Đang tải thanh toán....</h4>;
//     }

//     let checkout_HTML = '';

//     if (cart.length > 0) {
//         checkout_HTML = (
//             <div>
//                 <div className="row">
//                     <div className="col-md-7">
//                         <div className="card">
//                             <div className="card-header">
//                                 <h4>Thông tin</h4>
//                             </div>
//                             <div className="card-body">
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div className="form-group mb-3">
//                                             <label>Tên</label>
//                                             <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
//                                             <small className="text-danger">{error.firstname}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group mb-3">
//                                             <label>Họ</label>
//                                             <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
//                                             <small className="text-danger">{error.lastname}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group mb-3">
//                                             <label>Số điện thoại</label>
//                                             <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
//                                             <small className="text-danger">{error.phone}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group mb-3">
//                                             <label>Địa chỉ email</label>
//                                             <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
//                                             <small className="text-danger">{error.email}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-12">
//                                         <div className="form-group mb-3">
//                                             <label>Địa chỉ</label>
//                                             <textarea row="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
//                                             <small className="text-danger">{error.address}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="form-group mb-3">
//                                             <label>Thành Phố/ Tỉnh</label>
//                                             <select name="city" onChange={handleChangeProvince} value={selectedProvince} className="form-control">
//                                                 <option value="">Chọn Tỉnh/Thành phố</option>
//                                                 {provinces.map((province) => (
//                                                     <option key={province.code} value={province.code}>
//                                                         {province.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <small className="text-danger">{error.city}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="form-group mb-3">
//                                             <label>Quận/Huyện</label>
//                                             <select name="state" onChange={handleChangeDistrict} value={selectedDistrict} className="form-control">
//                                                 <option value="">Chọn Quận/Huyện</option>
//                                                 {districts.map((district) => (
//                                                     <option key={district.code} value={district.code}>
//                                                         {district.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <small className="text-danger">{error.state}</small>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-4">
//                                         <div className="form-group mb-3">
//                                             <label>Thị Xã/Thị Trấn</label>
//                                             <select name="zipcode" onChange={handleChangeWard} value={selectedWard} className="form-control">
//                                                 <option value="">Chọn Phường/Xã</option>
//                                                 {wards.map((ward) => (
//                                                     <option key={ward.code} value={ward.code}>
//                                                         {ward.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <small className="text-danger">{error.zipcode}</small>
//                                         </div>
//                                     </div>

//                                     <div className="col-md-12">
//                                         <div className="form-group text-end">
//                                             <button type="button" onClick={(e) => submitOrder(e, 'cod')} className="btn btn-primary mx-1">Đặt Hàng</button>
//                                             {/* <button type="button" onClick={(e) => submitOrder(e, 'payonline')} className="btn btn-primary mx-1">Thanh toán trực tuyến</button> */}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-md-5">
//                         <table className="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th width="50%">Sản phẩm</th>
//                                     <th>Giá</th>
//                                     <th>Số Lượng</th>
//                                     <th>Tổng cộng</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {cart.map((item, idx) => (
//                                     <tr key={idx}>
//                                         <td>{item.product.name}</td>
//                                         <td>{numeral(item.product.selling_price).format('0,0')}Đ</td>
//                                         <td>{item.product_qty}</td>
//                                         <td>{numeral(item.product.selling_price * item.product_qty).format(0, 0)}Đ</td>
//                                     </tr>
//                                 ))}
//                                 <tr>
//                                     <td colSpan="2" className="text-end fw-bold">Tổng Cộng:</td>
//                                     <td colSpan="2" className="text-end fw-bold">{numeral(totalPrice).format('0,0')}Đ</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     } else {
//         checkout_HTML = (
//             <div>
//                 <div className="card card-body py-5 text-center shadow-sm">
//                     <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán</h4>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="py-4">
//                 <div className="container">
//                     {checkout_HTML}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;
//Thijnh21/07
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
// import numeral from 'numeral';
// import swal from 'sweetalert';

// const Checkout = () => {
//   const [totalPrice, setTotalPrice] = useState(0);
//   const history = useHistory();
//   var   totalCartPrice=0
//   if (!localStorage.getItem('auth_token')) {
//     history.push('/');
//     swal("Cảnh báo", "Đăng nhập để đến Trang giỏ hàng", "error");
//   }

//   const [loading, setLoading] = useState(true);
//   const [cart, setCart] = useState([]);
//   const [error, setError] = useState([]);

//   const [checkoutInput, setCheckoutInput] = useState({
//     firstname: '',
//     lastname: '',
//     phone: '',
//     email: '',
//     address: '',
//     city: '',
//     state: '',
//     zipcode: '',
//   });

//   useEffect(() => {
//     let isMounted = true;

//     axios.get(`/api/cart`).then(res => {
//       if (isMounted) {
//         if (res.data.status === 200) {
//           setCart(res.data.cart);
//           setLoading((false));
//         } else if (res.data.status === 401) {
//           history.push('/');
//           swal("Warrning", res.data.message, "error");
//         }
//       }
//     });

//     return () => {
//       isMounted = false;
//     };
//   }, [history]);

//   useEffect(() => {
//     let totalCartPrice = 0;

//     cart.forEach((item) => {
//       totalCartPrice += item.product.selling_price * item.product_qty;
//     });

//     setTotalPrice(totalCartPrice);
//   }, [cart]);

//   const handleInput = (e) => {
//     e.persist();
//     setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
//   };

//   const handleAddBill = () => {
//     axios.post(`/api/place-order`, orderinfo_data).then(res => {
//         if (res.data.status === 200) {
//           swal("Order Placed Successfully", res.data.message, "success");
//           setError([]);
//           history.push('/thank-you');
//         } 
//         else if (res.data.status === 422) {
//           swal("All fields are mandetory", "", "error");
//           setError(res.data.errors);
//         }
//     });
//   };

//   const handlePayPalSuccess = (details) => {
//     const name = details.payer.name.given_name;
//     handleAddBill();

//     axios.post(`/api/place-order`, orderinfo_data).then(res => {
//       if (res.data.status === 200) {
//         swal("Order Placed Successfully", res.data.message, "success");
//         setError([]);
//         history.push('/thank-you');
//       } 
//       else if (res.data.status === 422) {
//         swal("All fields are mandetory", "", "error");
//         setError(res.data.errors);
//       }
//     });
//   };

//   const orderinfo_data = {
//     firstname: checkoutInput.firstname,
//     lastname: checkoutInput.lastname,
//     phone: checkoutInput.phone,
//     email: checkoutInput.email,
//     address: checkoutInput.address,
//     city: checkoutInput.city,
//     state: checkoutInput.state,
//     zipcode: checkoutInput.zipcode,
//     totalPrice: totalPrice,
//     payment_mode: 'Paid by PayPal',
//     payment_id: '',
//   };
//   const submitOrder = (e, payment_mode) => {
//     e.preventDefault();

//     var data = {
//         firstname: checkoutInput.firstname,
//         lastname: checkoutInput.lastname,
//         phone: checkoutInput.phone,
//         email: checkoutInput.email,
//         address: checkoutInput.address,
//         city: checkoutInput.city,
//         state: checkoutInput.state,
//         zipcode: checkoutInput.zipcode,
//         totalPrice: totalPrice,
//         payment_mode: payment_mode,
//         payment_id: '',
//     }

//     switch (payment_mode) {
//         case 'cod':
//             axios.post(`/api/place-order`, data).then(res=>{
//                 if(res.data.status === 200)
//                 {
//                     swal("Order Placed Successfully",res.data.message,"success");
//                     setError([]);
//                     history.push('/thank-you');
//                 }
//                 else if(res.data.status === 422)
//                 {
//                     swal("All fields are mandetory","","error");
//                     setError(res.data.errors);
//                 }
//             });
//             break;

            
//         case 'payonline':
//             axios.post(`/api/validate-order`, data).then(res=>{
//                 if(res.data.status === 200)
//                 {
//                     setError([]);
//                     var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
//                     myModal.show();
//                 }
//                 else if(res.data.status === 422)
//                 {
//                     swal("All fields are mandetory","","error");
//                     setError(res.data.errors);
//                 }
//             });
//             break;
    
//         default:
//             break;
//     }
   
// }
//   if (loading) {
//     return <h4>Đang tải thanh toán....</h4>;
//   }

//   let checkout_HTML = '';

//   if (cart.length > 0) {
//     checkout_HTML = (
//       <div>
//         <div className="row">
//           <div className="col-md-7">
//           <div>
//       <div className="row">
//         < div className="col-md-7">
         
//           <div className="card">
//             <div className="card-header">
//               <h4>Thông tin</h4>
//             </div>
//             <div className="card-body">
//               <div className="row">
               
//                 <div className="col-md-6">
//                   <div className="form-group mb-3">
//                     <label>Tên</label>
//                     <input
//                       type="text"
//                       name="firstname"
//                       onChange={handleInput}
//                       value={checkoutInput.firstname}
//                       className="form-control"
//                     />
//                     <small className="text-danger">{error.firstname}</small>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-group mb-3">
//                     <label>Họ</label>
//                     <input
//                       type="text"
//                       name="lastname"
//                       onChange={handleInput}
//                       value={checkoutInput.lastname}
//                       className="form-control"
//                     />
//                     <small className="text-danger">{error.lastname}</small>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-group mb-3">
//                     <label>Số điện thoại</label>
//                     <input
//                       type="text"
//                       name="phone"
//                       onChange={handleInput}
//                       value={checkoutInput.phone}
//                       className="form-control"
//                     />
//                     <small className="text-danger">{error.phone}</small>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="form-group mb-3">
//                     <label>Địa chỉ email</label>
//                     <input
//                       type="text"
//                       name="email"
//                       onChange={handleInput}
//                       value={checkoutInput.email}
//                       className="form-control"
//                     />
//                     <small className="text-danger">{error.email}</small>
//                   </div>
//                 </div>
//                 <div className="col-md-12">
//                   <div className="form-group mb-3">
//                     <label>Địa chỉ</label>
//                     <textarea
//                       rows="3"
//                       name="address"
//                       onChange={handleInput}
//                       value={checkoutInput.address}
//                       className="form-control"
//                     ></textarea>
//                     <small className="text-danger">{error.address}</small>
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="form-group mb-3">
//                     <label>Thành Phố/ Tỉnh</label>
//                     <input
//                       type="text"
//                       name="city"
//                       onChange={handleInput}
//                       value={checkoutInput.city}
//                       className="form-control"
//                     />
//                     <small className="text-danger">{error.city}</small>
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="form-group mb-3">
//                     <label>Quận/Huyện</label>
//                     <input
//                       type="text"
//                       name="state"
//                       onChange={handleInput}
//                       value={checkoutInput.state}
//                       className="form-control"
//                     />
//                     <small className="text-danger">{error.state}</small>
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="form-group mb-3">
//                     <label>Xã/Phường</label>
//                     <input
//                       type="text"
//                       name="zipcode"
//                       onChange={handleInput}
//                       value={checkoutInput.zipcode}
//                       className="form-control"
//                     />
//                     <small className="text-danger">{error.zipcode}</small>
//                   </div>
//                 </div>

//                 <div className="col-md-12">
//                   <div className="form-group text-end">
//                     <button
//                       type="button"
//                       onClick={(e) => submitOrder(e, 'cod')}
//                       className="btn btn-primary mx-1"
//                     >
//                       Đặt Hàng
//                     </button>
//                     <button
//                       type="button"
//                       onClick={(e) => submitOrder(e, 'payonline')}
//                       className="btn btn-primary mx-1"
//                     >
//                       Thanh toán trực tuyến
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//    </div>
        
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-5">
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th width="50%">Product</th>
//                             <th>Price</th>
//                             <th>Qty</th>
//                             <th>Total</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {cart.map( (item, idx) => {
//                             totalCartPrice += item.product.selling_price * item.product_qty;
//                             return (
//                                 <tr key={idx}>
//                                     <td>{item.product.name}</td>
//                                     <td>{item.product.selling_price}</td>
//                                     <td>{item.product_qty}</td>
//                                     <td>{item.product.selling_price * item.product_qty}</td>
//                                 </tr>
//                             )
//                         })}
//                         <tr>
//                             <td colSpan="2" className="text-end fw-bold">Grand Total</td>
//                             <td colSpan="2" className="text-end fw-bold">{totalCartPrice}</td>
//                         </tr>
//                     </tbody>
//                 </table>
          
//           </div>
//         </div>

       
//         {/* <PayPalScriptProvider options={{ clientId: "AfOxTmyXislStwhiYJL6ibm3Qsmgd5Oq7OwBsaysZKfalQU2TKFP3rH3O4LQmfuf5ACPdak8JcMdnegL" }}>
//           <PayPalButtons
//             createOrder={(data, actions) => {
//               return actions.order.create({
//                 purchase_units: [
//                   {
//                     amount: {
//                       value: "0.1",
//                     },
//                   },
//                 ],
//               });
//             }}
//             onApprove={(data, actions) => {
//               return actions.order.capture().then((details)=>{
//                 const name = details.payer.name.given_name;
//                 history.push('/thank-you')
//                         // alert(`Transaction completed by ${name}`);
//                         // // handleAddBill()
//                         // submitOrder(data,'cod')
//                 // handlePayPalSuccess()
//               });
//             }}
//           />
//         </PayPalScriptProvider> */}
//         <PayPalScriptProvider options={{ clientId: "AfOxTmyXislStwhiYJL6ibm3Qsmgd5Oq7OwBsaysZKfalQU2TKFP3rH3O4LQmfuf5ACPdak8JcMdnegL" }}>
//                       <PayPalButtons
//                         createOrder={(data, actions) => {
//                           return actions.order.create({
//                             purchase_units: [
//                               {
//                                 amount: {
//                                   value: "0.1",
//                                 },
//                               },
//                             ],
//                           });
//                         }}
//                         onApprove={(data, actions) => {
//                           return actions.order.capture().then((details) => {
//                             const name = details.payer.name.given_name;
//                             alert(`Transaction completed by ${name}`);
//                             handleAddBill();
//                             // navigate("/paysuccess");
//                             // submitOrder(data,"cod")
//                           });
//                         }}
//                       />
//             </PayPalScriptProvider>
//       </div>
//     );
//   } else {
//     checkout_HTML = (
//       <div>
//         <div className="card card-body py-5 text-center shadow-sm">
//           <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán</h4>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="py-4">
//         <div className="container">
//           {checkout_HTML}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
//Test
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


function Checkout()
{
    const [totalPrice, setTotalPrice] = useState(0);
    const history = useHistory();
    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal('Cảnh báo', 'Vui lòng đăng nhập để tiếp tục thanh toán', 'error');
    }
    
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
    });
    const [error, setError] = useState([]);

    useEffect(() => {

        let isMounted = true;

        axios.get(`/api/cart`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if(res.data.status === 401)
                {
                    history.push('/');
                    swal("Warning",res.data.message,"error");
                }
            }
        }); 
 
        return () => {
            isMounted = false
        };
    }, [history]);


    useEffect(() => {
        let totalCartPrice = 0;

        cart.forEach((item) => {
            totalCartPrice += item.product.selling_price * item.product_qty;
        });

        setTotalPrice(totalCartPrice);
        console.log(totalPrice)
    }, [cart]);

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value });
    }

   
    // Paypal Code
    const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
    const createOrder = (data, actions) =>{
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalCartPrice*0.000043,
                // value: "0.1",
              },
            },
          ],
        });
    };
    

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function(details) {
            console.log(details);
            // Khai báo và cung cấp giá trị cho orderinfo_data
            const orderinfo_data = {
                firstname: checkoutInput.firstname, // Lấy từ state của component
                lastname: checkoutInput.lastname, // Lấy từ state của component
                phone: checkoutInput.phone, // Lấy từ state của component
                email: checkoutInput.email, // Lấy từ state của component
                address: checkoutInput.address, // Lấy từ state của component
                city: checkoutInput.city, // Lấy từ state của component
                state: checkoutInput.state, // Lấy từ state của component
                zipcode: checkoutInput.zipcode, // Lấy từ state của component
                totalPrice: totalPrice,
                payment_mode: 'Paid by PayPal',
                payment_id: details.id
            };
    
            // Thực hiện cuộc gọi API để đặt hàng
            axios.post(`/api/place-order`, orderinfo_data).then(res => {
                if (res.data.status === 200) {
                    swal("Đặt hàng thành công", res.data.message, "success");
                    setError([]);
                    history.push('/thank-you');
                } else if (res.data.status === 422) {
                    swal("Vui lòng nhập đầy đủ thông tin", "", "error");
                    setError(res.data.errors);
                } else {
                    // Xử lý lỗi hoặc tình huống khác ở đây nếu cần thiết
                }
            }).catch(error => {
                // Xử lý lỗi trong trường hợp cuộc gọi API không thành công
                console.error("Lỗi khi gọi API đặt hàng:", error);
                // Hiển thị thông báo lỗi cho người dùng nếu cần thiết
            });
        });
    };
   
    // End-Paypal Code

    const submitOrder = (e, payment_mode) => {
        e.preventDefault();

        var data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            totalPrice: totalPrice,
            payment_mode: payment_mode,
            payment_id: '',
        }

        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/place-order`, data).then(res=>{
                    if(res.data.status === 200)
                    {
                        swal("Đặt hàng thành công",res.data.message,"success");
                        setError([]);
                        history.push('/thank-you');
                    }
                    else if(res.data.status === 422)
                    {
                        swal("Vui lòng nhập đầy đủ thông tin","","error");
                        setError(res.data.errors);
                    }
                    else if (res.data.status === 423)
                     {
                         swal("Xin lỗi bạn", res.data.message, "error");
                         history.push('/checkout');
                     }
                });
                break;
            case 'payonline':
                axios.post(`/api/validate-order`, data).then(res=>{
                    if(res.data.status === 200)
                    {
                        setError([]);
                        var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
                        myModal.show();
                    }
                    else if(res.data.status === 422)
                    {
                        swal("Vui lòng nhập đầy đủ thông tin","","error");
                        setError(res.data.errors);
                    }

                });
                break;
        
            default:
                break;
        }
       
    }

    if(loading)
    {
        return <h4>Đang tải...</h4>
    }

    var checkout_HTML = '';
    if(cart.length > 0)
    {
        checkout_HTML = <div>
            <div className="row">

            <div className="col-md-7">
                <div className="card">
                    <div className="card-header">
                        <h4>Thông tin đơn hàng</h4>
                    </div>
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Họ</label>
                                    <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                    <small className="text-danger">{error.firstname}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Tên</label>
                                    <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                                    <small className="text-danger">{error.lastname}</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <label>Số  điện thoại</label>
                                        <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                        <small className="text-danger">{error.phone}</small>
                                    </div>
                                </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                    <small className="text-danger">{error.email}</small>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mb-3">
                                    <label> Địa chỉ đầy đủ</label>
                                    <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                    <small className="text-danger">{error.address}</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>Thành Phố / Tỉnh</label>
                                    <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                    <small className="text-danger">{error.city}</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>Quận/Huyện</label>
                                    <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                                    <small className="text-danger">{error.state}</small>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>Xã/Phường</label>
                                    <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                                    <small className="text-danger">{error.zipcode}</small>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group text-end">
                                    <button type="button" className="btn btn-primary mx-1" onClick={ (e) => submitOrder(e, 'cod') }>Đặt hàng (COD)</button>
                                
                                    <button type="button" className="btn btn-warning mx-1" onClick={ (e) => submitOrder(e, 'payonline') }>Thanh toán online</button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="col-md-5">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th width="50%">Sản phẩm</th>
                            <th>Gía</th>
                            <th>Số lượng</th>
                            <th>Tổng đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map( (item, idx) => {
                            totalCartPrice += item.product.selling_price * item.product_qty;
                            return (
                                <tr key={idx}>
                                    <td>{item.product.name}</td>
                                    <td>{item.product.selling_price}</td>
                                    <td>{item.product_qty}</td>
                                    <td>{item.product.selling_price * item.product_qty}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td colSpan="2" className="text-end fw-bold">Tổng cộng</td>
                            <td colSpan="2" className="text-end fw-bold">{totalCartPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            </div>
        </div>
    }
    else
    {
        checkout_HTML = <div>
            <div className="card card-body py-5 text-center shadow-sm">
                <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán.</h4>
            </div>
        </div>
    }

    return (
        <div>

            <div class="modal fade" id="payOnlineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Online Payment Mode</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <hr/>
                        <PayPalButton
                            createOrder={(data, actions) => createOrder(data, actions)}
                            onApprove={(data, actions) => onApprove(data, actions)}
                        />
                    </div>
                    </div>
                </div>
            </div>

            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Home / Checkout</h6>
                </div>
            </div>

            <div className="py-4">
                <div className="container">
                   {checkout_HTML}
                </div>
            </div>

        </div>
    )
}

export default Checkout;


//19/07  Bài thật

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import numeral from 'numeral';
// import swal from 'sweetalert';


// const Checkout = () => {
//     const [totalPrice, setTotalPrice] = useState(0);
//     const history = useHistory();

//     if (!localStorage.getItem('auth_token')) {
//         history.push('/');
//         swal("Cảnh báo", "Đăng nhập để đến Trang giỏ hàng", "error");
//     }

//     const [loading, setLoading] = useState(true);
//     const [cart, setCart] = useState([]);
//     const [error, setError] = useState([]);

//     const [checkoutInput, setCheckoutInput] = useState({
//         firstname: '',
//         lastname: '',
//         phone: '',
//         email: '',
//         address: '',
//         city: '',
//         state: '',
//         zipcode: '',
//     });

//     useEffect(() => {
//         let isMounted = true;

//         axios.get(`/api/cart`).then(res => {
//             if (isMounted) {
//                 if (res.data.status === 200) {
//                     setCart(res.data.cart);
//                     setLoading((false));
//                 } else if (res.data.status === 401) {
//                     history.push('/');
//                     swal("Warrning", res.data.message, "error");
//                 }
//             }
//         });

//         return () => {
//             isMounted = false;
//         };
//     }, [history]);

//     useEffect(() => {
//         let totalCartPrice = 0;

//         cart.forEach((item) => {
//             totalCartPrice += item.product.selling_price * item.product_qty;
//         });

//         setTotalPrice(totalCartPrice);
//         console.log(totalPrice)
//     }, [cart]);

//     const handleInput = (e) => {
//         e.persist();
//         setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
//     };
//  // Paypal Code
//  var orderinfo_data = {
//     firstname: checkoutInput.firstname,
//     lastname: checkoutInput.lastname,
//     phone: checkoutInput.phone,
//     email: checkoutInput.email,
//     address: checkoutInput.address,
//     city: checkoutInput.city,
//     state: checkoutInput.state,
//     zipcode: checkoutInput.zipcode,
//     totalPrice: totalPrice,
//     payment_mode: 'Paid by PayPal',
//     payment_id: '',
// }

//  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
//  const createOrder = (data, actions) =>{
//      return actions.order.create({
//        purchase_units: [
//          {
//            amount: {
//             value: totalPrice,
//             //  value: "0.1"
//            },
//          },
//        ],
//      });
//  };
//  const onApprove = (data, actions) => {
//      // return actions.order.capture();
//      return actions.order.capture().then(function(details) {
//          console.log(details);
//          orderinfo_data.payment_id = details.id;

//          axios.post(`/api/place-order`, orderinfo_data).then(res=>{
//              if(res.data.status === 200)
//              {
//                  swal("Order Placed Successfully",res.data.message,"success");
//                  setError([]);
//                  history.push('/thank-you');
//              }
//              else if(res.data.status === 422)
//              {
//                  swal("All fields are mandetory","","error");
//                  setError(res.data.errors);
//              }
//          });
//      });
//  };
              
//  // End-Paypal Code

//     const submitOrder = (e, payment_mode) => {
//         e.preventDefault();

//         const data = {
//             firstname: checkoutInput.firstname,
//             lastname: checkoutInput.lastname,
//             phone: checkoutInput.phone,
//             email: checkoutInput.email,
//             address: checkoutInput.address,
//             city: checkoutInput.city,
//             state: checkoutInput.state,
//             zipcode: checkoutInput.zipcode,
//             payment_mode: payment_mode,
//             totalPrice: totalPrice,
//             payment_id: '',
//         };

//         switch (payment_mode) {
//             case 'cod':
//                 axios.post(`/api/place-order`, data).then(res => {
//                     if (res.data.status === 200) {
//                         swal("Đặt hàng thành công", res.data.message, "success");
//                         setError([]);
//                         history.push('/thank-you');
//                     } else if (res.data.status === 422) {
//                         swal("Tất cả các lĩnh vực là bắt buộc", "", "error");
//                         setError(res.data.errors);
//                     } else if (res.data.status === 423) {
//                         swal("Xin lỗi bạn", res.data.message, "error");
//                         history.push('/checkout');
//                     }
//                 });
//                 break;
//                 case 'payonline':
//                     axios.post(`/api/validate-order`, data).then(res=>{
//                         if(res.data.status === 200)
//                         {
//                             setError([]);
//                             var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
//                             myModal.show();
//                         }
//                         else if(res.data.status === 422)
//                         {
//                             swal("Bắt Buộc","","error");
//                             setError(res.data.errors);
//                         }
//                     });
//                     break;
//             default:
//                 break;
//         }
//     };

//     if (loading) {
//         return <h4>Đang tải thanh toán....</h4>;
//     }

//     let checkout_HTML = '';

//     if (cart.length > 0) {
//         checkout_HTML = (
//             <div>
//                 <div className="row">
//                     <div className="col-md-7">
//                         <div className="card">
//                             <div className="card-header">
//                                 <h4>Thông tin</h4>
//                             </div>
//                             <div className="card-body">
//                             <div className="row">
//                                 <div className="col-md-6">
//                                     <div className="form-group mb-3">
//                                         <label>Tên</label>
//                                         <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
//                                         <small className="text-danger">{error.firstname}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="form-group mb-3">
//                                         <label>Họ</label>
//                                         <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
//                                         <small className="text-danger">{error.lastname}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="form-group mb-3">
//                                         <label>Số  điện thoại</label>
//                                         <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
//                                         <small className="text-danger">{error.phone}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="form-group mb-3">
//                                         <label>Địa chỉ email</label>
//                                         <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
//                                         <small className="text-danger">{error.email}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="form-group mb-3">
//                                         <label>Địa chỉ</label>
//                                         <textarea row="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
//                                         <small className="text-danger">{error.address}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="form-group mb-3">
//                                         <label>Thành Phố/ Tỉnh</label>
//                                         <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
//                                         <small className="text-danger">{error.city}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="form-group mb-3">
//                                         <label>Quận/Huyện</label>
//                                         <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
//                                         <small className="text-danger">{error.state}</small>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4">
//                                     <div className="form-group mb-3">
//                                         <label> Xã/Phường</label>
//                                         <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
//                                         <small className="text-danger">{error.zipcode}</small>
//                                     </div>
//                                 </div>

                          
//                                 <div className="col-md-12">
//                                     <div className="form-group text-end">
//                                         <button type="button" onClick={(e) => submitOrder(e, 'cod')} className="btn btn-primary mx-1">Đặt Hàng</button>
//                                         <button type="button" onClick={(e) => submitOrder(e, 'payonline')} className="btn btn-primary mx-1">Thanh toán trực tuyến</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                     <div className="col-md-5">
//                         <table className="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th width="50%">Sản phẩm</th>
//                                     <th>Gía</th>
//                                     <th>Số Lượng</th>
//                                     <th>Tổng cộng</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {cart.map((item, idx) => (
//                                     <tr key={idx}>
//                                         <td>{item.product.name}</td>
//                                         <td>{numeral(item.product.selling_price).format('0,0')}Đ</td>
//                                         <td>{item.product_qty}</td>
//                                         <td>{numeral(item.product.selling_price * item.product_qty).format(0, 0)}Đ</td>
//                                     </tr>
//                                 ))}
//                                 <tr>
//                                     <td colSpan="2" className="text-end fw-bold">Tổng Cộng:</td>
//                                     {/* <td colSpan="2" className="text-end fw-bold">{numeral(totalPrice).format('0,0')}Đ</td> */}
//                                     <td colSpan="2" className="text-end fw-bold">{totalPrice}</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         );
//     } else {
//         checkout_HTML = (
//             <div>
//                 <div className="card card-body py-5 text-center shadow-sm">
//                     <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán</h4>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div class="modal fade" id="payOnlineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                             <div class="modal-dialog">
//                                 <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h5 class="modal-title" id="exampleModalLabel">Online Payment Mode</h5>
//                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <div class="modal-body">
//                                     <hr/>
//                                     <PayPalButton
//                                         createOrder={(data, actions) => createOrder(data, actions)}
//                                         onApprove={(data, actions) => onApprove(data, actions)}
//                                     />
//                                 </div>
//                                 </div>
//                             </div>
//             </div>

//             <div className="py-4">
//                 <div className="container">
//                     {checkout_HTML}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;
//tạm
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import numeral from 'numeral';
// import swal from 'sweetalert';

// const Checkout = () => {
//     const [totalPrice, setTotalPrice] = useState(0);
//     const history = useHistory();
//     var totalCartPrice = 0;
//     if (!localStorage.getItem('auth_token')) {
//         history.push('/');
//         swal("Cảnh báo", "Đăng nhập để đến Trang giỏ hàng", "error");
//     }

//     const [loading, setLoading] = useState(true);
//     const [cart, setCart] = useState([]);
//     const [error, setError] = useState([]);

//     const [checkoutInput, setCheckoutInput] = useState({
//         firstname: '',
//         lastname: '',
//         phone: '',
//         email: '',
//         address: '',
//         city: '',
//         state: '',
//         zipcode: '',
//     });

//     useEffect(() => {
//         let isMounted = true;

//         axios.get(`/api/cart`).then(res => {
//             if (isMounted) {
//                 if (res.data.status === 200) {
//                     setCart(res.data.cart);
//                     setLoading(false);
//                 } else if (res.data.status === 401) {
//                     history.push('/');
//                     swal("Warrning", res.data.message, "error");
//                 }
//             }
//         });

//         return () => {
//             isMounted = false;
//         };
//     }, [history]);

//     useEffect(() => {
//         let totalCartPrice = 0;

//         cart.forEach((item) => {
//             totalCartPrice += item.product.selling_price * item.product_qty;
//         });

//         setTotalPrice(totalCartPrice);
//     }, [cart]);

//     const handleInput = (e) => {
//         e.persist();
//         setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
//     };

//     const [orderinfo_data, setOrderInfoData] = useState({
//         firstname: '',
//         lastname: '',
//         phone: '',
//         email: '',
//         address: '',
//         city: '',
//         state: '',
//         zipcode: '',
//         totalPrice: 0,
//         payment_mode: 'Paid by PayPal',
//         payment_id: '',
//     });
// // Paypal Code
// const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
// const createOrder = (data, actions) =>{
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: "0.1",
//           },
//         },
//       ],
//     });
// };
// const onApprove = (data, actions) => {
//     // return actions.order.capture();
//     return actions.order.capture().then(function(details) {
//         console.log(details);
//         orderinfo_data.payment_id = details.id;

//         axios.post(`/api/place-order`, orderinfo_data).then(res=>{
//             if(res.data.status === 200)
//             {
//                 swal("Order Placed Successfully",res.data.message,"success");
//                 setError([]);
//                 history.push('/thank-you');
//             }
//             else if(res.data.status === 422)
//             {
//                 swal("Tất cả thông tin phải điền","","error");
//                 setError(res.data.errors);
//             }
//         });
//     });
// };
// // End-Paypal Code
//     const submitOrder = (e, payment_mode) => {
//         e.preventDefault();

//         const data = {
//             firstname: checkoutInput.firstname,
//             lastname: checkoutInput.lastname,
//             phone: checkoutInput.phone,
//             email: checkoutInput.email,
//             address: checkoutInput.address,
//             city: checkoutInput.city,
//             state: checkoutInput.state,
//             zipcode: checkoutInput.zipcode,
//             payment_mode: payment_mode,
//             totalPrice: totalPrice,
//             payment_id: '',
//         };

//         switch (payment_mode) {
//             case 'cod':
//                 axios.post(`/api/place-order`, data).then(res => {
//                     if (res.data.status === 200) {
//                         swal("Đặt hàng thành công", res.data.message, "success");
//                         setError([]);
//                         history.push('/thank-you');
//                     } else if (res.data.status === 422) {
//                         swal("Tất cả các lĩnh vực là bắt buộc", "", "error");
//                         setError(res.data.errors);
//                     } else if (res.data.status === 423) {
//                         swal("Xin lỗi bạn", res.data.message, "error");
//                         history.push('/checkout');
//                     }
//                 });
//                 break;
//             case 'payonline':
//                 axios.post(`/api/validate-order`, data).then(res => {
//                     if (res.data.status === 200) {
//                         setError([]);
//                         var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
//                         myModal.show();
//                     } else if (res.data.status === 422) {
//                         swal("Tất cả các lĩnh vực là bắt buộc", "", "error");
//                         setError(res.data.errors);
//                     }
//                 });
//                 break;
//             default:
//                 break;
//         }
//     };

//     if (loading) {
//         return <h4>Đang tải thanh toán....</h4>;
//     }

//     let checkout_HTML = '';

//     if (cart.length > 0) {
//         checkout_HTML = (
//             <div>
//             <div className="row">
//                 <div className="col-md-7">
//                     <div className="card">
//                         <div className="card-header">
//                             <h4>Thông tin</h4>
//                         </div>
//                         <div className="card-body">
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="form-group mb-3">
//                                     <label>Tên</label>
//                                     <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
//                                     <small className="text-danger">{error.firstname}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group mb-3">
//                                     <label>Họ</label>
//                                     <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
//                                     <small className="text-danger">{error.lastname}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group mb-3">
//                                     <label>Số  điện thoại</label>
//                                     <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
//                                     <small className="text-danger">{error.phone}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group mb-3">
//                                     <label>Địa chỉ email</label>
//                                     <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
//                                     <small className="text-danger">{error.email}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-12">
//                                 <div className="form-group mb-3">
//                                     <label>Địa chỉ</label>
//                                     <textarea row="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
//                                     <small className="text-danger">{error.address}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group mb-3">
//                                     <label>Thành Phố/ Tỉnh</label>
//                                     <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
//                                     <small className="text-danger">{error.city}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group mb-3">
//                                     <label>Quận/Huyện</label>
//                                     <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
//                                     <small className="text-danger">{error.state}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group mb-3">
//                                     <label> Xã/Phường</label>
//                                     <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
//                                     <small className="text-danger">{error.zipcode}</small>
//                                 </div>
//                             </div>

                      
//                             <div className="col-md-12">
//                                 <div className="form-group text-end">
//                                     <button type="button" onClick={(e) => submitOrder(e, 'cod')} className="btn btn-primary mx-1">Đặt Hàng</button>
//                                     <button type="button" onClick={(e) => submitOrder(e, 'payonline')} className="btn btn-primary mx-1">Thanh toán trực tuyến</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//                 <div className="col-md-5">
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th width="50%">Sản phẩm</th>
//                                 <th>Gía</th>
//                                 <th>Số Lượng</th>
//                                 <th>Tổng cộng</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cart.map((item, idx) => (
//                                 <tr key={idx}>
//                                     <td>{item.product.name}</td>
//                                     <td>{numeral(item.product.selling_price).format('0,0')}Đ</td>
//                                     <td>{item.product_qty}</td>
//                                     <td>{numeral(item.product.selling_price * item.product_qty).format(0, 0)}Đ</td>
//                                 </tr>
//                             ))}
//                             <tr>
//                                 <td colSpan="2" className="text-end fw-bold">Tổng Cộng:</td>
//                                 {/* <td colSpan="2" className="text-end fw-bold">{numeral(totalPrice).format('0,0')}Đ</td> */}
//                                 <td colSpan="2" className="text-end fw-bold">{totalPrice}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// } else {
//     checkout_HTML = (
//         <div>
//             <div className="card card-body py-5 text-center shadow-sm">
//                 <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán</h4>
//             </div>
//         </div>
//     );
// }


//     return (
//         <div>
//             <div className="modal fade" id="payOnlineModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">Online Payment Mode</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body">
//                             <hr />
//                             <PayPalButton
//                                 createOrder={(data, actions) => createOrder(data, actions)}
//                                 onApprove={(data, actions) => onApprove(data, actions)}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="py-4">
//                 <div className="container">
//                     {checkout_HTML}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;
//CHECK  Tường lửa  4h44
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import numeral from 'numeral';
// import swal from 'sweetalert';

// const Checkout = () => {
//   const [totalPrice, setTotalPrice] = useState(0);
//   const history = useHistory();
//   var totalCartPrice = 0;
//   if (!localStorage.getItem('auth_token')) {
//     history.push('/');
//     swal("Cảnh báo", "Đăng nhập để đến Trang giỏ hàng", "error");
//   }

//   const [loading, setLoading] = useState(true);
//   const [cart, setCart] = useState([]);
//   const [error, setError] = useState([]);

//   const [checkoutInput, setCheckoutInput] = useState({
//     firstname: '',
//     lastname: '',
//     phone: '',
//     email: '',
//     address: '',
//     city: '',
//     state: '',
//     zipcode: '',
//   });

//   useEffect(() => {
//     let isMounted = true;

//     axios.get(`/api/cart`).then(res => {
//       if (isMounted) {
//         if (res.data.status === 200) {
//           setCart(res.data.cart);
//           setLoading(false);
//         } else if (res.data.status === 401) {
//           history.push('/');
//           swal("Warrning", res.data.message, "error");
//         }
//       }
//     });

//     return () => {
//       isMounted = false;
//     };
//   }, [history]);

//   useEffect(() => {
//     let totalCartPrice = 0;

//     cart.forEach((item) => {
//       totalCartPrice += item.product.selling_price * item.product_qty;
//     });

//     setTotalPrice(totalCartPrice);
//   }, [cart]);

//   const handleInput = (e) => {
//     e.persist();
//     setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
//   };

//   const [orderinfo_data, setOrderInfoData] = useState({

//     firstname: '',
//     lastname: '',
//     phone: '',
//     email: '',
//     address: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     totalPrice: 0,
//     payment_mode: 'Paid by PayPal',
//     payment_id: '',
//   });

//   // Paypal Code
//   const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
//   const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: totalCartPrice,
//           },
//         },
//       ],
//     });
//   };
//   const onApprove = (data, actions) => {
//     return actions.order.capture().then(function(details) {
//       console.log(details);

//       // Cập nhật orderinfo_data với các giá trị mới từ form và payment_id từ PayPal
//       setOrderInfoData({
//         ...orderinfo_data,
//         payment_id: details.id,
//       });

//       // Gửi dữ liệu đơn hàng đã có payment_id lên server để lưu vào cơ sở dữ liệu
//       axios.post(`/api/place-order`, orderinfo_data).then(res => {
//         if (res.data.status === 200) {
//           swal("Order Placed Successfully", res.data.message, "success");
//           setError([]);
//           history.push('/thank-you');
        
//         } else if (res.data.status === 422) {
           
//           swal("All fields are mandatory", "", "error");
//           setError(res.data.errors);
//         }
//       });
//     });
//   };
//   // End-Paypal Code

//   const updateOrderInfoData = () => {
//     setOrderInfoData({
//       ...orderinfo_data,
//       firstname: checkoutInput.firstname,
//       lastname: checkoutInput.lastname,
//       phone: checkoutInput.phone,
//       email: checkoutInput.email,
//       address: checkoutInput.address,
//       city: checkoutInput.city,
//       state: checkoutInput.state,
//       zipcode: checkoutInput.zipcode,
//       totalPrice: totalPrice,
//       payment_mode: 'Paid by PayPal',
//       payment_id: '', // Bạn có thể xem xét loại bỏ dòng này, vì payment_id được đặt trong hàm onApprove
//     });
//   };

//   const submitOrder = (e, payment_mode) => {
//     e.preventDefault();

//     const data = {
//       firstname: checkoutInput.firstname,
//       lastname: checkoutInput.lastname,
//       phone: checkoutInput.phone,
//       email: checkoutInput.email,
//       address: checkoutInput.address,
//       city: checkoutInput.city,
//       state: checkoutInput.state,
//       zipcode: checkoutInput.zipcode,
//       payment_mode: payment_mode,
//       totalPrice: totalPrice,
//       payment_id: '',
//     };

//     switch (payment_mode) {
//       case 'cod':
//         axios.post(`/api/place-order`, data).then(res=>{
//             if(res.data.status === 200)
//             {
//                 swal("Order Placed Successfully",res.data.message,"success");
//                 setError([]);
//                 history.push('/thank-you');
//             }
//             else if(res.data.status === 422)
//             {
//                 swal("All fields are mandetory","","error");
//                 setError(res.data.errors);
//             }
//         });
//         break;

//         case 'payonline':
//             // Update orderinfo_data with the latest form field values
//             updateOrderInfoData();
          
//             axios.post(`/api/validate-order`, data).then(res => {
//               if (res.data.status === 200) {
//                 setError([]);
//                 var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
//                 myModal.show();
//               } else if (res.data.status === 422) {
//                 swal("Tất cả các lĩnh vực là bắt buộc", "", "error");
//                 setError(res.data.errors);
//               }
//             });
//             break;
//       default:
//         break;
//     }
//   };

//   if (loading) {
//     return <h4>Đang tải thanh toán....</h4>;
//   }

//   let checkout_HTML = '';

//   if (cart.length > 0) {
//     if (cart.length > 0) {
//         checkout_HTML = (
//           <div>
//             <div className="row">
//               <div className="col-md-7">
//               <div className="card">
//                     <div className="card-header">
//                         <h4>Thông tin thanh toán</h4>
//                     </div>
//                     <div className="card-body">
//                         <div className="form-group">
//                         <label>Tên</label>
//                         <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
//                         <small className="text-danger">{error.firstname}</small>
//                         </div>
//                         <div className="form-group">
//                         <label>Họ</label>
//                         <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
//                         <small className="text-danger">{error.lastname}</small>
//                         </div>
//                         <div className="form-group">
//                         <label>Số điện thoại</label>
//                         <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
//                         <small className="text-danger">{error.phone}</small>
//                         </div>
//                         <div className="form-group">
//                         <label>Địa chỉ email</label>
//                         <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
//                         <small className="text-danger">{error.email}</small>
//                         </div>
//                         <div className="form-group">
//                         <label>Địa chỉ</label>
//                         <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
//                         <small className="text-danger">{error.address}</small>
//                         </div>
//                         <div className="form-group">
//                         <label>Thành Phố/ Tỉnh</label>
//                         <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
//                         <small className="text-danger">{error.city}</small>
//                         </div>
//                         <div className="form-group">
//                         <label>Quận/Huyện</label>
//                         <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
//                         <small className="text-danger">{error.state}</small>
//                         </div>
//                         <div className="form-group">
//                         <label>Xã/Phường</label>
//                         <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
//                         <small className="text-danger">{error.zipcode}</small>
//                         </div>
                     
                       
//                         <div className="form-group text-end">
//                         <button type="button" onClick={(e) => submitOrder(e, 'cod')} className="btn btn-primary mx-1">Đặt Hàng</button>
//                         <button type="button" onClick={(e) => submitOrder(e, 'payonline')} className="btn btn-primary mx-1">Thanh toán trực tuyến</button>
//                         </div>
//                     </div>
//                     </div>


//               </div>
//               <div className="col-md-5">
//                 <table className="table table-bordered">
//                   <thead>
//                     <tr>
//                       <th width="50%">Sản phẩm</th>
//                       <th>Gía</th>
//                       <th>Số Lượng</th>
//                       <th>Tổng cộng</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {cart.map((item, idx) => (
//                       <tr key={idx}>
//                         <td>{item.product.name}</td>
//                         <td>{numeral(item.product.selling_price).format('0,0')}Đ</td>
//                         <td>{item.product_qty}</td>
//                         <td>{numeral(item.product.selling_price * item.product_qty).format(0, 0)}Đ</td>
//                       </tr>
//                     ))}
//                     <tr>
//                       <td colSpan="2" className="text-end fw-bold">Tổng Cộng:</td>
//                       <td colSpan="2" className="text-end fw-bold">{totalPrice}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         );
//       } else {
//         checkout_HTML = (
//           <div>
//             <div className="card card-body py-5 text-center shadow-sm">
//               <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán</h4>
//             </div>
//           </div>
//         );
//       }
      
//   } else {
//     checkout_HTML = (
//       <div>
//         <div className="card card-body py-5 text-center shadow-sm">
//           <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán</h4>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>

//     <div class="modal fade" id="payOnlineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div class="modal-dialog">
//             <div class="modal-content">
//             <div class="modal-header">
//                 <h5 class="modal-title" id="exampleModalLabel">Online Payment Mode</h5>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body">
//                 <hr/>
//                 <PayPalButton
//                     createOrder={(data, actions) => createOrder(data, actions)}
//                     onApprove={(data, actions) => onApprove(data, actions)}
//                 />
//             </div>
//             </div>
//         </div>
//     </div>

//     <div className="py-3 bg-warning">
//         <div className="container">
//             <h6>Home / Checkout</h6>
//         </div>
//     </div>

//     <div className="py-4">
//         <div className="container">
//            {checkout_HTML}
//         </div>
//     </div>

// </div>
//   );
// };

// export default Checkout;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import numeral from 'numeral';
// import swal from 'sweetalert';

// const Checkout = () => {
//     const [totalPrice, setTotalPrice] = useState(0);
//     const history = useHistory();

//     if (!localStorage.getItem('auth_token')) {
//         history.push('/');
//         swal("Cảnh báo", "Đăng nhập để đến Trang giỏ hàng", "error");
//     }

//     const [loading, setLoading] = useState(true);
//     const [cart, setCart] = useState([]);
//     const [error, setError] = useState({}); // Update to empty object for errors

//     const [checkoutInput, setCheckoutInput] = useState({
//         firstname: '',
//         lastname: '',
//         phone: '',
//         email: '',
//         address: '',
//         city: '',
//         state: '',
//         zipcode: '',
//     });

//     useEffect(() => {
//         let isMounted = true;

//         axios.get(`/api/cart`).then(res => {
//             if (isMounted) {
//                 if (res.data.status === 200) {
//                     setCart(res.data.cart);
//                     setLoading(false); // Fix typo (remove ())
//                 } else if (res.data.status === 401) {
//                     history.push('/');
//                     swal("Warrning", res.data.message, "error");
//                 }
//             }
//         });

//         return () => {
//             isMounted = false;
//         };
//     }, [history]);

//     useEffect(() => {
//         let totalCartPrice = 0;

//         cart.forEach((item) => {
//             totalCartPrice += item.product.selling_price * item.product_qty;
//         });

//         setTotalPrice(totalCartPrice);
//     }, [cart]);

//     const handleInput = (e) => {
//         e.persist();
//         setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
//     };

//     // Paypal Code
//     var orderinfo_data = {
      

//         firstname: checkoutInput.firstname,
//         lastname: checkoutInput.lastname,
//         phone: checkoutInput.phone,
//         email: checkoutInput.email,
//         address: checkoutInput.address,
//         city: checkoutInput.city,
//         state: checkoutInput.state,
//         zipcode: checkoutInput.zipcode,
//         totalPrice: totalPrice,
//         payment_mode: 'Paid by PayPal',
//         payment_id: '',
//     };

//     const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
//     const createOrder = (data, actions) => {
//         return actions.order.create({
//             purchase_units: [
//                 {
//                     amount: {
//                         value: totalPrice,
//                         // value: "0.1"
//                     },
//                 },
//             ],
//         });
//     };
//     const onApprove = (data, actions) => {
//         // return actions.order.capture();
//         return actions.order.capture().then(function (details) {
//             console.log(details);
//             orderinfo_data.payment_id = details.id;

//             axios.post(`/api/place-order`, orderinfo_data).then(res => {
//                 if (res.data.status === 200) {
//                     swal("Order Placed Successfully", res.data.message, "success");
//                     setError({});
//                     history.push('/thank-you');
//                 } else if (res.data.status === 422) {
//                     swal("Tất cả  là  bắt buộc", "", "error");
//                     setError(res.data.errors);
//                 }
//             });
//         });
//     };
//     // End-Paypal Code

//     const submitOrder = (e, payment_mode) => {
//         e.preventDefault();

//         const data = {
//             firstname: checkoutInput.firstname,
//             lastname: checkoutInput.lastname,
//             phone: checkoutInput.phone,
//             email: checkoutInput.email,
//             address: checkoutInput.address,
//             city: checkoutInput.city,
//             state: checkoutInput.state,
//             zipcode: checkoutInput.zipcode,
//             payment_mode: payment_mode,
//             totalPrice: totalPrice,
//             payment_id: '',
//         };

//         // Perform form validation before submitting the order
//         const validationErrors = {};
//         if (!checkoutInput.firstname) {
//             validationErrors.firstname = "Yêu cầu nhập tên";
//         }
//         // Add validation checks for other fields as needed

//         if (Object.keys(validationErrors).length > 0) {
//             setError(validationErrors);
//             return; // Stop form submission if there are validation errors
//         }

//         switch (payment_mode) {
//             case 'cod':
//                 axios.post(`/api/place-order`, data).then(res => {
//                     if (res.data.status === 200) {
//                         swal("Đặt hàng thành công", res.data.message, "success");
//                         setError({});
//                         history.push('/thank-you');
//                     } else if (res.data.status === 422) {
//                         swal("Tất cả các lĩnh vực là bắt buộc", "", "error");
//                         setError(res.data.errors);
//                     } else if (res.data.status === 423) {
//                         swal("Xin lỗi bạn", res.data.message, "error");
//                         history.push('/checkout');
//                     }
//                 });
//                 break;
//             case 'payonline':
//                 axios.post(`/api/validate-order`, data).then(res => {
//                     if (res.data.status === 200) {
//                         setError({});
//                         var myModal = new window.bootstrap.Modal(document.getElementById('payOnlineModal'));
//                         myModal.show();
//                     } else if (res.data.status === 422) {
//                         swal("All fields are mandatory", "", "error");
//                         setError(res.data.errors);
//                     }
//                 });
//                 break;
//             default:
//                 break;
//         }
//     };

//     if (loading) {
//         return <h4>Đang tải thanh toán....</h4>;
//     }

//     let checkout_HTML = '';

//     if (cart.length > 0) {
//         checkout_HTML = (
//             <div>
//             <div className="row">
//                 <div className="col-md-7">
//                     <div className="card">
//                         <div className="card-header">
//                             <h4>Thông tin</h4>
//                         </div>
//                         <div className="card-body">
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="form-group mb-3">
//                                     <label>Tên</label>
//                                     <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
//                                     <small className="text-danger">{error.firstname}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group mb-3">
//                                     <label>Họ</label>
//                                     <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
//                                     <small className="text-danger">{error.lastname}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group mb-3">
//                                     <label>Số  điện thoại</label>
//                                     <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
//                                     <small className="text-danger">{error.phone}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group mb-3">
//                                     <label>Địa chỉ email</label>
//                                     <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
//                                     <small className="text-danger">{error.email}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-12">
//                                 <div className="form-group mb-3">
//                                     <label>Địa chỉ</label>
//                                     <textarea row="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
//                                     <small className="text-danger">{error.address}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group mb-3">
//                                     <label>Thành Phố/ Tỉnh</label>
//                                     <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
//                                     <small className="text-danger">{error.city}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group mb-3">
//                                     <label>Quận/Huyện</label>
//                                     <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
//                                     <small className="text-danger">{error.state}</small>
//                                 </div>
//                             </div>
//                             <div className="col-md-4">
//                                 <div className="form-group mb-3">
//                                     <label> Xã/Phường</label>
//                                     <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
//                                     <small className="text-danger">{error.zipcode}</small>
//                                 </div>
//                             </div>

                      
//                             <div className="col-md-12">
//                                 <div className="form-group text-end">
//                                     <button type="button" onClick={(e) => submitOrder(e, 'cod')} className="btn btn-primary mx-1">Đặt Hàng</button>
//                                     <button type="button" onClick={(e) => submitOrder(e, 'payonline')} className="btn btn-primary mx-1">Thanh toán trực tuyến</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//                 <div className="col-md-5">
//                     <table className="table table-bordered">
//                         <thead>
//                             <tr>
//                                 <th width="50%">Sản phẩm</th>
//                                 <th>Gía</th>
//                                 <th>Số Lượng</th>
//                                 <th>Tổng cộng</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cart.map((item, idx) => (
//                                 <tr key={idx}>
//                                     <td>{item.product.name}</td>
//                                     <td>{numeral(item.product.selling_price).format('0,0')}Đ</td>
//                                     <td>{item.product_qty}</td>
//                                     <td>{numeral(item.product.selling_price * item.product_qty).format(0, 0)}Đ</td>
//                                 </tr>
//                             ))}
//                             <tr>
//                                 <td colSpan="2" className="text-end fw-bold">Tổng Cộng:</td>
//                                 <td colSpan="2" className="text-end fw-bold">{numeral(totalPrice).format('0,0')}Đ</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//         );
//     } else {
//         checkout_HTML = (
//             <div>
//             <div className="card card-body py-5 text-center shadow-sm">
//                 <h4>Giỏ hàng của bạn đang trống. Bạn đang ở trang thanh toán</h4>
//             </div>
//         </div>
//         );
//     }

//     return (
//         <div>
//             <div class="modal fade" id="payOnlineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                             <div class="modal-dialog">
//                                 <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h5 class="modal-title" id="exampleModalLabel">Online Payment Mode</h5>
//                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <div class="modal-body">
//                                     <hr/>
//                                     <PayPalButton
//                                         createOrder={(data, actions) => createOrder(data, actions)}
//                                         onApprove={(data, actions) => onApprove(data, actions)}
//                                     />
//                                 </div>
//                                 </div>
//                             </div>
//             </div>





//             <div className="py-4">
//                 <div className="container">
//                     {checkout_HTML}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;

