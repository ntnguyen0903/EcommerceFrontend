
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const Navbar = () => {
  const history = useHistory();
  // tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = useState("");



  useEffect(() => {
    const userToken = localStorage.getItem("auth_token");
    const userName = localStorage.getItem("auth_name");
    // const userEmail = localStorage.getItem("auth_email");
  
    if (userToken && userName) {
      setUserName(userName);
      // setUserEmail(userEmail);
    }
  }, []);





  const handleSearch = (e) => {
    e.preventDefault();

    // Chuyển hướng đến trang kết quả tìm kiếm
    history.push(`/search?term=${searchTerm}`);
  };
  //
  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal("Success", res.data.message, "success");
        history.push('/');
      }
    });
  };

  let AuthButtons = null;
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/login">Đăng nhập</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Đăng ký</Link>
        </li>
      </ul>
    );
  } else {
    AuthButtons = (
      <>
        <li>
          <li>
            <span className="nav-link text-danger">Chào! {userName} </span>
          </li>
        </li>
        <li>
          <Link className="nav-link" to="/customer/information">Thông Tin</Link>
        </li>
        <li className="nav-item">
          <button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm ">Đăng xuất</button>
        </li>
      </>

    );
  }

  return (
    <nav className="navbar navbar-expand-lg  bg-white shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{ fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold', color: '#FF0000' }}>
          LAPTOP
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Trang chủ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Giới thiệu</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li> */}
            <li className="nav-item">
              {/* <Link className="nav-link" to="/collections">Bộ sưu tập</Link> */}
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">Giỏ Hàng</Link>
              {/* <Link class="fa-solid fa-cart-shopping"></Link> */}
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/order">Theo Dõi đơn hàng</Link>
            </li>


            <li className="nav-item">
              <form className="d-flex" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Tìm kiếm..."
                  aria-label="Tìm kiếm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </li>


            {AuthButtons}
          </ul >
        </div >
      </div >
    </nav >
  );
}
export default Navbar;
