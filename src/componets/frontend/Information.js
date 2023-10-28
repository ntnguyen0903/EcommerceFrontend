import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import UserNav from "./UserNav";


const Information = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/view-indexuser').then(res => {
            if (res.status === 200) {
                const user = res.data.user;
                setUserName(user.name);
                setUserEmail(user.email);
            }
            setLoading(false);
        });
    }, []);

    const handleUpdateUser = () => {
        axios.put('/api/update-user', {
            name: userName,
            email: userEmail
        })
            .then(response => {
                // Xử lý phản hồi thành công từ server
                console.log(response.data);
                swal("Thông tin đã được cập nhật!");
            })
            .catch(error => {
                // Xử lý lỗi từ server
                console.log(error.response.data);
                swal("Có lỗi xảy ra. Vui lòng thử lại!");
            });
    };

    return (
        <div className="container" style={{ paddingTop: '100px' }}>
            <div className="row">
                <div className="col-lg-4 col-xl-auto">
                    <UserNav />
                </div>

                <div className="col-lg-8 col-xl">
                    <div className="row">
                        <div className="col-md-8">
                            <h3 className="d-flex fw-bold">Thông tin cá nhân của bạn</h3>
                            <div className="row form-group" style={{ paddingTop: '30px' }}>
                                <div className="col col-label">
                                    <label>Họ và tên:</label>
                                </div>
                                <div className="col col-input">
                                    <input
                                        className="form-control"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="row form-group" style={{ paddingTop: '30px' }}>
                                <div className="col col-label">
                                    <label>Email:</label>
                                </div>
                                <div className="col col-input">
                                    <input
                                        className="form-control"
                                        value={userEmail}
                                        type="text"
                                        onChange={(e) => setUserEmail(e.target.value)} // Thêm hàm xử lý khi trường input thay đổi
                                    />
                                </div>
                            </div>
                            {/* Các trường thông tin khác */}
                            <hr />
                            {/* Nút cập nhật thông tin */}
                            <button className="btn_user" onClick={handleUpdateUser}>
                                Cập nhật thông tin
                            </button>
                        </div>

                        <div className="col-md-4">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Bảo mật</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Thông tin bạn luôn được đảm bảo</td>
                                    </tr>
                                    <tr>
                                        <td  className= 'container'>
                                            <Link className="text-decoration-none text-dark" to="/change-password">
                                                Đổi mật khẩu
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Information;
