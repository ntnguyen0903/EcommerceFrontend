import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import "./OrderUser.css";
import numeral from 'numeral';


const OrderUser1 = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    //khỏi tạo biến tt
    var totalCartPrice = 0;

    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        swal("Warning", "Đăng nhập để đến Trang giỏ hàng", "error");
    }

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/view-orderuser0`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
                }
                else if (res.data.status === 401) {
                    history.push('/');
                    swal("Warrning", res.data.message, "error");
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [history]);
    //hủy
    const cancelOrder = (orderId) => {
        axios.put(`/api/cancel-order/${orderId}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                // Cập nhật trạng thái đơn hàng đã hủy trong cart
                setCart(prevCart => {
                    const updatedCart = prevCart.map(item => {
                        if (item.id === orderId) {
                            return { ...item, status: 'Đã hủy' };
                        }
                        return item;
                    });
                    return updatedCart;
                });
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        });
    };
    //

    if (loading) {
        return <h4>Đang tải chi tiết sản phẩm....</h4>
    }

    return (
        <div className="container">
            <h2>Đơn hàng của tôi</h2>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" to="/order">Tất cả đơn hàng</Link>
                </li>

                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" to="/order/processing">Đang xử lý</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" to="/order/confirmed">Đã xác nhận</Link>
                 </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" to="/order/shipping">Đang vận chuyển</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" to="/order/delivered">Đã giao</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" to="/order/cancelled">Đã hủy</Link>
                </li>
            </ul>

            <div className="table-responsive">
             <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">Mã đơn hàng</th> */}
                            <th scope="col">Ngày đặt</th>
                            <th scope="col">Trạng thái</th>
                            {/* <th scope="col">Thông tin EMAIL Khách Hàng</th>
                            <th scope="col">Thông tin EMAIL người nhận</th> */}
                            <th scope="col" colSpan="4">Tên chi tiết Sản Phẩm</th>
                            <th scope="col">Tổng Đơn Hàng</th>
                            <th scope="col">Phương thức thanh toán</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, idx) => {
                            let statusLabel = "";
                            if (item.status === 'Đang xử lý') {
                                statusLabel = "Đang xử lý";
                            } else if (item.status === 'Đang giao') {
                                statusLabel = "Đang giao";
                            } else if (item.status === 'Đã giao') {
                                statusLabel = "Đã giao";
                            } else if (item.status === 'Đã hủy') {
                                statusLabel = "Đã hủy";
                            }

                            const formattedDate = new Date(item.created_at).toLocaleDateString();

                            return (
                                <tr key={idx}>
                                    {/* <td>{item.id}</td> */}
                                    <td>{formattedDate}</td>
                                    <td>{statusLabel}</td>
                                    {/* <td>{item.user.email}</td> */}
                                    {/* <td>{item.email}</td> */}
                                    <td colSpan="4">
                                        {item.orderitems.map((orderItem, index) => {
                                            totalCartPrice += orderItem.product.selling_price * orderItem.qty;

                                            return (
                                                <div key={index}>
                                                    <p>Tên Sản Phẩm: {orderItem.product.name}</p>
                                                    <p>Số lượng: {orderItem.qty}</p>
                                                    <p>Giá: {numeral(orderItem.product.selling_price).format('0,0')}đ</p>
                
                                                      <p>Tổng Tiền: {numeral(orderItem.product.selling_price * orderItem.qty).format('0,0')}đ</p>
                                                </div>
                                            );
                                        })}
                                    </td>
                                    <td>{numeral(totalCartPrice).format('0,0')}đ</td>
                                    <td>{item.payment_mode}</td>
                                    <td>
                                        {item.status === "Đang xử lý" || item.status === "Đang giao" ? (
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => cancelOrder(item.id)}
                                            >
                                                Hủy đơn hàng
                                            </button>
                                        ) : (
                                            <span>Không thể hủy</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>
        </div>



    );
}
//tt
export default OrderUser1;