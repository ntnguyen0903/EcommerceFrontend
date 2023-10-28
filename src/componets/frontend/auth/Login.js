
import React, { useState } from "react";

import axios from "axios";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


const Login = () => {
  const history = useHistory();
  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setLogin ({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get('/sanctum/csrf-cookie').then(() => {
      axios.post('api/login', data).then(res => {
        if (res.data.status === 200) {
          // Xử lý khi đăng nhập thành công
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('auth_email', res.data.email); // Lưu email vào localStorage
          // console.log(res.data.email);
          swal("Succes", res.data.message, "success");
          if(res.data.role  === 'admin'){
            history.push('/admin/dashboard');
          }
          else{
            history.push('/');
          }
        } else if (res.data.status === 401) {
          // Xử lý khi đăng nhập thất bại
          swal("Warning", res.data.message, "warning");
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors });
        }
      });
    });
  };

  return (
    <div>
    
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Đăng Nhập</h4>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="form-group mb-3">
                    <label>Email </label>
                    <input type="email" onChange={handleInput} value={loginInput.email} name="email" className="form-control" />
                    <span>{loginInput.error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Mậy Khẩu</label>
                    <input type="password" onChange={handleInput} value={loginInput.password} name="password" className="form-control" />
                    <span>{loginInput.error_list.password}</span>
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">Đăng Nhập</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;