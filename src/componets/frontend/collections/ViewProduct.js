import axios from "axios";
import React, { useEffect, useState, } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import numeral from 'numeral';
import ReactPaginate from 'react-paginate';

const ViewProduct = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 8; // Số lượng sản phẩm hiển thị trên mỗi trang

    const productCount = product.length;

    useEffect(() => {
        let isMounted = true;
        const product_slug = props.match.params.slug;
        axios.get(`/api/fetchproducts/${product_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                    setLoading((false));
                }
                else if (res.data.status === 400) {
                    swal("Warning", res.data.message, "error");
                }
                else if (res.data.status === 404) {
                    history.push('/collections');
                    swal("Warrning", res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, [props.match.params.slug.history]);

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

    const offset = currentPage * productsPerPage;
    const currentProducts = product.slice(offset, offset + productsPerPage);
    const pageCount = Math.ceil(product.length / productsPerPage);

    const handlePageChange = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    if (loading) {
        return <h4>Đang tải sản Phẩm....</h4>
    } else {
        var showProductList = '';
        if (productCount) {
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
                )
            })
        } else {
            showProductList =
                <div className="col-md-12">
                    <h4>Không có sản phẩm cho {category.name}</h4>
                </div>
        }

    }
    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collection/{category.name}</h6>
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

export default ViewProduct;
