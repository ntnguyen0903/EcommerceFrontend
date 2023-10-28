import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
const Thank = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
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
        <div className="container">
            
                <h1>Cảm ơn bạn</h1>
                <p>Kính gửi {userName}!</p>
               

                <p>Chúng tôi xin gửi lời cảm ơn chân thành đến bạn vì sự ủng hộ và đặt hàng từ cửa hàng của chúng tôi.</p>

                <div className="thank-you">
                    <h2>Đơn hàng của bạn đã được xác nhận thành công.</h2>
                    <p>Chúng tôi sẽ tiến hành xử lý và vận chuyển đơn hàng của bạn trong thời gian sớm nhất.</p>
                    <p>Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ thêm, xin vui lòng liên hệ với chúng tôi.</p>
                    <p>Trân trọng,</p>
                    <p>Đội ngũ cửa hàng</p>
                </div>
          
        </div>
    );
}

export default Thank;