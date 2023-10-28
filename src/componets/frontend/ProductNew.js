import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import numeral from 'numeral';

const ProductNew = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        let isMounted = true;
        axios.get('/api/view-product-new').then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product);
                    setLoading(false);
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
                swal("Thành công", res.data.message, "success");
                history.push('/cart');
            } else if (res.data.status === 409) {
                swal("Cảnh báo", res.data.message, "warning");
            } else if (res.data.status === 401) {
                swal("Lỗi", res.data.message, "error");
            } else if (res.data.status === 404) {
                swal("Cảnh báo", res.data.message, "warning");
            }
        });
    };

    if (loading) {
        return <h4>Đang tải sản phẩm....</h4>;
    }
    else {

        let showProductList = null;
        if (product && product.length > 0) {
            showProductList = product.map((item, idx) => {
                return (
                    <div className="col-md-3" key={idx}>
                        <div className="card">
                            <Link to={`/`}>
                                <img src={`http://127.0.0.1:8000/${item.image}`} className="w-100" alt={item.name} />
                            </Link>
                            <div className="card-body">

                                <h4>{item.name}</h4>
                                

                                <h5 className="mb-1">
                                    <span style={{ color: 'red' }}>
                                        {numeral(item.selling_price).format('0,0')}<sup>đ</sup>
                                    </span>
                                    <s className="ms-2"  style={{ opacity: 0.5 }}>{numeral(item.original_price).format('0,0')}<sup>đ</sup></s>
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
        } else {
            showProductList = <p>Không tìm thấy sản phẩm.</p>;
        }
    //     <Link className="navbar-brand" to="/" style={{ fontFamily: 'Arial', fontSize: '24px', fontWeight: 'bold', color: '#FF0000' }}>
    //     LAPTOP
    //   </Link>
        return (
            <div>
                <div className="py-3 ">
                    <div className="container">
                        <h6 style={{ fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', color: '#FF0000' }}>Sản phẩm mới</h6>
                    </div>
                </div>

                <div className="py-3">
                    <div className="container">
                        <div className="row">
                            {showProductList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductNew;