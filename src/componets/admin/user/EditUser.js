

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
const EditUser = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState([]);
    const [selectedOption, setSelectedOption] = useState({});


    const [categoryInput, setCategory] = useState({
        name: '',
        email: '',
        password: '',
    });



    useEffect(() => {
        const user_id = props.match.params.id;
        axios.get(`/api/edit-user/${user_id}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.user);
            } else if (res.data.status === 404) {
                swal("error", res.data.message, "error");
                history.push("/admin/view-user");
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }
    const handleCheckbox = (e) => {
        e.persist();
        const value = e.target.checked ? '1' : '0'; // Đảo ngược giá trị '0' và '1'
        setCategory({ ...categoryInput, [e.target.name]: value });
    };
    const updateCategory = (e) => {
        e.preventDefault();
        const user_id = props.match.params.id;
        const data = {
          ...categoryInput,
          password: categoryInput.password !== '' ? categoryInput.password : undefined,
        };
        axios.put(`/api/update-user/${user_id}`, data).then(res => {
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
    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div>
                    <h4>Cập nhật Khách Hàng
                        {/* <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end" >Back</Link> */}
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateCategory} >
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                          
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane card-body boder fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb3">
                                    <label>Tên</label>

                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    {/* <small className="text-danger">{error.slug}</small> */}
                                </div>
                                <div className="form-group mb3">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={handleInput} value={categoryInput.email} className="form-control" />
                                    {/* <small className="text-danger">{error.name}</small> */}
                                </div>
                                <div className="form-group mb3">
                                    <label>Mật khẩu</label>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleInput}
                                        value={categoryInput.password}
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-group mb3">
                                    <label>Phân quyền</label>
                                    <input
                                        type="checkbox"
                                        name="role_as"
                                        onChange={handleCheckbox}
                                        checked={categoryInput.role_as === '1'}
                                    />
                                    <span>role_as 0= user 1=admin</span>
                                </div>

                            </div>

                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end" float>Cập Nhật</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default EditUser;