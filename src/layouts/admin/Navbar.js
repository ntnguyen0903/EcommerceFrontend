import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const Navbar = () => {
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

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        history.push("/");
      }
    });
  };

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
 
        <Link className="navbar-brand ps-3" to="/admin">Trang Quản Trị</Link>
      
        <div className="collapse navbar-collapse ms-auto" id="navbarNav">
          <ul className="navbar-nav">
           
            <li className="nav-item">
         
              <span className="nav-link">Hi!{userName}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link">{userEmail}</span>
              
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light" type="button" onClick={logoutSubmit}>
                Đăng Xuất
              </button>
            </li>
          </ul>
        </div>
      
       
    </nav>
  );
};

export default Navbar;
