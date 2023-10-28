// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useHistory } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import swal from 'sweetalert';
// import numeral from 'numeral';

// const Test = () => {
//     const history = useHistory();
//     const [loading, setLoading] = useState(true);
//     const [product, setProduct] = useState([]);
//     const [quantity, setQuantity] = useState(1);

//     useEffect(() => {
//         let isMounted = true;

//         axios.get('/api/view-producttest').then(res => {
//             if (isMounted) {
//                 if (res.data.status === 200) {
//                     setProduct(res.data.product);
//                     setLoading((false));
//                 }
//             }
//         });

//         return () => {
//             isMounted = false;
//         };
//     }, [history]);

//     const submitAddtoCart = (e, product_id) => {
//         e.preventDefault();

//         const data = {
//             product_id: product_id,
//             product_qty: quantity,
//         };

//         setQuantity(quantity + 1);

//         axios.post(`/api/add-to-cart`, data).then(res => {
//             if (res.data.status === 201) {
//                 swal("Success", res.data.message, "success");
//                 history.push('/cart');
//             }
//             else if (res.data.status === 409) {
//                 swal("Warning", res.data.message, "warning");
//             }
//             else if (res.data.status === 401) {
//                 swal("Error", res.data.message, "error");
//             }
//             else if (res.data.status === 404) {
//                 swal("Warning", res.data.message, "warning");
//             }
//         });
//     };

//     if (loading) {
//         return <h4>Loading Product....</h4>;
//     } else {
//         var showProductList = '';

//         showProductList = product.map((item, idx) => {
//             return (
//                 <div className="col-md-3" key={idx}>
//                     <div className="card">
//                     <Link to={`/collections/${item.category.slug}/${item.slug}`}>
//                             <img src={`http://127.0.0.1:8000/${item.image}`} className="w-100" alt={item.name} />
//                         </Link>
//                         <div className="card-body">  
//                                 <h5>{item.name}</h5>    
//                                 <h5 className="mb-1">
//                                     <span style={{ color: 'red' }}>
//                                         {numeral(item.selling_price).format('0,0')}<sup>đ</sup>
//                                     </span>
//                                     <s className="ms-2"  style={{ opacity: 0.5 }}>{numeral(item.original_price).format('0,0')}<sup>đ</sup></s>
//                                 </h5>
//                             {/* <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{item.description}</p> */}
//                             {item.qty > 0 ? (
//                                 <button type="button" className="btn btn-primary w-100" onClick={(e) => submitAddtoCart(e, item.id)}>Thêm vào giỏ hàng</button>
//                             ) : (
//                                 <label className="btn btn-primary w-100">Hết hàng</label>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             );
//         });
//     }

//     return (
//         <div>
//         <div className="py-3 ">
//           <div className="container">
//           <h6 style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', color: '#FF0000' }}>Sản phẩm</h6>
//           </div>
//         </div>

//         <div className="py-3">
//           <div className="container">
//             <div className="row">
//               {showProductList}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// }

// export default Test;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import numeral from 'numeral';
import ReactPaginate from 'react-paginate';

const Test = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8; // Số lượng sản phẩm hiển thị trên mỗi trang

    useEffect(() => {
        let isMounted = true;

        axios.get('/api/view-producttest').then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
                    setLoading((false));
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [history]);

    const submitAddtoCart = (e, product_id) => {
        e.preventDefault();

        const data = {
            product_id: product_id,
            product_qty: quantity,
        };

        setQuantity(quantity + 1);

        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {
                swal("Success", res.data.message, "success");
                history.push('/cart');
            }
            else if (res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            }
            else if (res.data.status === 401) {
                swal("Error", res.data.message, "error");
            }
            else if (res.data.status === 404) {
                swal("Warning", res.data.message, "warning");
            }
        });
    };

    const offset = currentPage * productsPerPage;
    const currentProducts = product.slice(offset, offset + productsPerPage);
    const pageCount = Math.ceil(product.length / productsPerPage);

    const handlePageChange = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    if (loading) {
        return <h4>Loading Product....</h4>;
    } else {
        var showProductList = '';

        showProductList = currentProducts.map((item, idx) => {
            return (
                <div className="col-md-3" key={idx}>
                    <div className="card">
                        <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                            <img src={`http://127.0.0.1:8000/${item.image}`} className="w-100" alt={item.name} />
                        </Link>
                        <div className="card-body">
                            <h5>{item.name}</h5>
                            <h5 className="mb-1">
                                <span style={{ color: 'red' }}>
                                    {numeral(item.selling_price).format('0,0')}<sup>đ</sup>
                                </span>
                                <s className="ms-2" style={{ opacity: 0.5 }}>{numeral(item.original_price).format('0,0')}<sup>đ</sup></s>
                            </h5>
                            {item.qty > 0 ? (
                                <button type="button" className="btn btn-primary w-100" onClick={(e) => submitAddtoCart(e, item.id)}>Thêm vào giỏ hàng</button>
                            ) : (
                                <label className="btn btn-primary w-100">Hết hàng</label>
                            )}
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div>
            <div className="py-3 ">
                <div className="container">
                    <h6 style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', color: '#FF0000' }}>Sản phẩm</h6>
                </div>
            </div>

            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {showProductList}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center">
            <ReactPaginate
                previousLabel={'Trước'}
                nextLabel={'Tiếp'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
            />
            </div>
        </div>
    );
}

export default Test;
