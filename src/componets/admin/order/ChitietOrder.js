import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import numeral from 'numeral';

const ChitietOrder = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState({});
    const [error, setError] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});

    useEffect(() => {
        const order_id = props.match.params.id;
        axios.get(`/api/chitiet-order/${order_id}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
            } else if (res.data.status === 404) {
                swal("error", res.data.message, "error");
                history.push("/admin/view-order");
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        setCategory({ ...categoryInput, status: e.target.value });
    };

    if (loading) {
        return <h4>Đang tải trang Đơn hàng...</h4>
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div>
                    <h4>
                        Thông tin chi tiết đơn hàng
                        <Link to="/admin/view-order" className="btn btn-primary btn-sm float-end">Quay lại</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                                    Thông tin Khách Hàng
                                </button>

                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">
                                    Thông tin chi tiết đơn hàng của Khách Hàng</button>
                            </li>

                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Mã theo dỗi đơn hàng.</label>
                                    <input type="text" value={categoryInput.tracking_no} className="form-control" readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Họ Khách Hàng.</label>
                                    <input type="text" value={categoryInput.lastname} className="form-control" readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Tên Khách Hàng.</label>
                                    <input type="text" value={categoryInput.firstname} className="form-control" readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Số điện thoại</label>
                                    <input type="text" name="phone" value={categoryInput.phone} className="form-control" readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="text" name="email" value={categoryInput.email} className="form-control" readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Địa chỉ</label>
                                    <input type="text" value={categoryInput.address} className="form-control" readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Thành Phố/Tỉnh</label>
                                    <input type="text" value={categoryInput.city} className="form-control" readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Thành Phố/Tỉnh</label>
                                    <input type="text" value={categoryInput.city} className="form-control" readOnly />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Quận/Huyện</label>
                                    <input type="text" value={categoryInput.state} className="form-control" readOnly />

                                </div>
                                <div className="form-group mb-3">
                                    <label>Thị trấn/xã</label>
                                    <input type="text" value={categoryInput.zipcode} className="form-control" readOnly />

                                </div>
                               
                            </div>
                        </div>
                        <div className="tab-pane  card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                           
                        <div className="form-group mb3">
                       
                                {categoryInput.orderitems &&
                                    categoryInput.orderitems.map((orderItem, index) => (
                                       <div>
                                        <p>Tên Sản Phẩm: {orderItem.product.name}</p>
                                       <p>Số lượng: {orderItem.qty}</p>
                                       <p>Giá: {numeral(orderItem.product.selling_price).format('0,0')}đ</p>
                                     <p>Tổng Tiền: {numeral(orderItem.product.selling_price * orderItem.qty).format('0,0')}đ</p>
                                       </div>
                                       

                                    ))}
                            </div>
                            
                          
                            <div className="form-group mb3">
                                <label>Tổng đơn hàng</label>
                                <input type="text" value={categoryInput.totalPrice} className="form-control" readOnly />
                            </div>
                            <div className="form-group mb-3">
                                    <label>Trạng thái</label>
                                    <input type="text" value={categoryInput.status} className="form-control" readOnly />

                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChitietOrder;
