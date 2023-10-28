
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
const UserNav = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
  
    const history = useHistory();

    useEffect(() => {
        const userToken = localStorage.getItem("auth_token");
        const userName = localStorage.getItem("auth_name");
        const userEmail = localStorage.getItem("auth_email");
      
        if (userToken && userName) {
          setUserName(userName);
          setUserEmail(userEmail);
        }
      }, []);

    return (
        <div className="user_nav container-fluid">
        <div className="user_info d-flex">
          <div className="info_avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="info_name">Xin chào {userName}</div>
        </div>
        <hr />
        <div className="user_menu">
          <div className="user_info d-flex">
            <div className="info_avatar">
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="info_name">
              <Link className="text-decoration-none text-dark" to="/login">
                Thông tin khách hàng
              </Link>
            </div>
          </div>
  
          <div className="user_info d-flex">
            <div className="info_avatar">
              <i className="fa-solid fa-camera-retro"></i>
            </div>
            <div className="info_name">
              <Link className="text-decoration-none text-dark" to="/cart">
                Gio Hàng
              </Link>
            </div>
          </div>
  
          <div className="user_info d-flex">
            <div className="info_avatar">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div className="info_name">
              <Link className="text-decoration-none text-dark" to="/order">
                Theo dõi đơn hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};


export default UserNav;