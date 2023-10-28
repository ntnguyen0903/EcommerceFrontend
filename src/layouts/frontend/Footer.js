import React from "react";
import {Link} from 'react-router-dom';
const Footer = () => {
    return ( 
    
        <footer className="bg-white py-5" >
           <div className="container">
               <div className="row text-black g-4">
   
                   <div className="col-md-6 col-lg-3">
                       <a className="text-uppercase text-decoration-none brand text-black" href="index.html">THÔNG TIN</a>
                       <p className="text-black text-muted mt-3">Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình mua sắm và đáp ứng mọi câu hỏi hay yêu cầu của bạn. Chúng tôi cam kết mang đến cho bạn một trải nghiệm mua sắm trực tuyến an toàn, tiện lợi và đáng tin cậy.</p>
                   </div>
   
                   <div className="col-md-6 col-lg-3">
                       <h5 className="fw-light mb-3">Liên hệ với chúng tôi</h5>
                       <div className="d-flex justify-content-start align-items-start my-2 text-muted">
                           <span className="me-3">
                               <i className="fas fa-map-marked-alt"></i>
                           </span>
                           <span className="fw-light">
                           180 CAO LỖ QUẬN 8
                           </span>
                       </div>
                       <div className="d-flex justify-content-start align-items-start my-2 text-muted">
                           <span className="me-3">
                               <i className="fas fa-envelope"></i>
                           </span>
                           <span className="fw-light">
                               ntnguyen09032001@gmail.com
                           </span>
                       </div>
                       <div className="d-flex justify-content-start align-items-start my-2 text-muted">
                           <span className="me-3">
                               <i className="fas fa-phone-alt"></i>
                           </span>
                           <span className="fw-light">
                               0909316074
                           </span>
                       </div>
                   </div>
   
                   <div className="col-md-6 col-lg-3">
                       <h5 className="fw-light mb-3">Theo dõi chúng tôi tại:</h5>
                       <div>
                           <ul className="list-unstyled d-flex">
                               <li>
                                   <Link to="https://www.facebook.com/profile.php?id=100046832262190" className="text-black text-decoration-none text-muted fs-4 me-4">
                                       <i className="fab fa-facebook-f"></i>
                                   </Link>
                               </li>
                               <li>
                                   <Link to="https://www.facebook.com/profile.php?id=100046832262190" className="text-black text-decoration-none text-muted fs-4 me-4">
                                       <i className="fab fa-twitter"></i>
                                   </Link>
                               </li>
                               <li>
                                   <Link href="https://www.facebook.com/profile.php?id=100046832262190" className="text-black text-decoration-none text-muted fs-4 me-4">
                                       <i className="fab fa-instagram"></i>
                                   </Link>
                               </li>
                               <li>
                                   <Link to="https://www.facebook.com/profile.php?id=100046832262190" className="text-black text-decoration-none text-muted fs-4 me-4">
                                       <i className="fab fa-pinterest"></i>
                                       {/* <i class="fas fa-users"></i>
                                       <i class="fas fa-eye"></i>
                                       <i class="fas fa-shopping-cart"></i>
                                       <i class="fas fa-laptop"></i> */}
                                   </Link>
                               </li>
                           </ul>
                       </div>
                   </div>
   
                   <div className="col-md-6 col-lg-3">
                       <a className="text-uppercase text-decoration-none brand text-black" href="index.html">THÔNG TIN</a>
                       <p className="text-black text-muted mt-3">Chào mừng bạn đến với trang web bán laptop - nơi tuyệt vời để khám phá và mua sắm các sản phẩm laptop hàng đầu. Chúng tôi tự hào là một nền tảng thương mại điện tử đáng tin cậy, cung cấp cho bạn một trải nghiệm mua sắm trực tuyến tuyệt vời và đáng nhớ.</p>
                   </div>
               </div>
           </div>
       </footer>
      
     );
}
 
export default Footer;