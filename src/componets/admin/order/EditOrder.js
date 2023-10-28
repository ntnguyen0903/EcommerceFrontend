
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const EditOrder = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState({});
    const [error, setError] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});

    useEffect(() => {
        const order_id = props.match.params.id;
        axios.get(`/api/edit-order/${order_id}`).then(res => {
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


    const updateCategory = (e) => {
        e.preventDefault();
        const order_id = props.match.params.id;
        const data = categoryInput;
        axios.put(`/api/update-order/${order_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Thành công!", res.data.message, "success");
                setError([]);
            } else if (res.data.status === 422) {
                swal("Tất cả các lĩnh vực là bắt buộc", "", "error");
                setError(res.data.errors);
            } else if (res.data.status === 404) {
                swal("Lỗi", res.data.message, "error");
                history.push('/admin/view-category');
            }
        });
    }

    if (loading) {
        return <h4>Đang tải trang Đơn hàng...</h4>
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div>
                    <h4>
                       Cập nhật đơn hàng
                        <Link to="/admin/view-order" className="btn btn-primary btn-sm float-end">QUay lại</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateCategory}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">
                                    Home
                                </button>
                            </li>
                           
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Mã theo dỗi đơn hàng.</label>
                                    <input type="text" name="tracking_no" value={categoryInput.tracking_no} className="form-control"  readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Số điện thoại</label>
                                    <input type="text" name="phone"  value={categoryInput.phone} className="form-control" readOnly />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="text" name="email" value={categoryInput.email} className="form-control" readOnly />
                                    {/* onChange={handleInput} */}
                                </div>
                               
                                <div className="form-group mb-3">
                                    <label>Trạng thái</label>
                                   
                                    <select
                                    name="status"
                                    onChange={handleSelectChange}
                                    value={selectedOption}
                                    className="form-control"
                                    >
                                    <option value="Đang xử lý">Đang xử lý</option>
                                    <option value="Đã xác nhận">Đã xác nhận</option>
                                    <option value="Đang giao">Đang giao</option>
                                    <option value="Đã giao">Đã giao</option>
                                  
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">
                            Sửa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditOrder;
