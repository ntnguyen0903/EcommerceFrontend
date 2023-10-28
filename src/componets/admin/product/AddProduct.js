
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import swal from "sweetalert";
const AddProduct = () => {
    const [categoryList, setCategorylist] = useState([]);
    const [error_list, setError] = useState([]);
    const [productInput, setProduct] = useState([{
        category_id: '',
        slug: '',
        name: '',
        description: '',

        ram: '',
        os: '',
     

        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
       
        status: '',

    }]);
    const [pricture, setPicture] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {

        setPicture({ image: e.target.files[0] });
    }
    ///checkbox
    const [allcheckbox, setCheckboxes] = useState({}); // Change initial state to {}

    const handleCheckbox = (e) => {
        e.persist();
        setCheckboxes({ ...allcheckbox, [e.target.name]: e.target.checked ? 1 : 0 });
    };



    useEffect(() => {
        axios.get('/api/all-category').then(res => {
            if (res.data.status === 200) {
                setCategorylist(res.data.category);
            }
        })
    }, []);
    const submitProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', pricture.image);
        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('os', productInput.os);
        formData.append('ram', productInput.ram);
   

        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        formData.append('brand', productInput.brand);
        ///
   
        formData.append('status', allcheckbox.status ? '1' : '0');

        let axiosConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post('/api/store-product', formData, axiosConfig).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "Success");
                setProduct({
                    ...productInput,
                    category_id: '',
                    slug: '',
                    name: '',
                    description: '',

                    os: '',
                    ram: '',
                

                    selling_price: '',
                    original_price: '',
                    qty: '',
                    brand: '',
                 
                    status: '',
                });
                setError([]);
            }
            else if (res.data.status === 422) {
                swal("All Fields are mandatory", "", "error");
                setError(res.data.errors);
            }

        });
    }
    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Thêm sản phẩm</h4>
                    <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end"> Danh Sách Sản Phẩm</Link>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProduct} encType="multipart/form-data">

                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">Phần cứng</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Chi tiết sản phẩm</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb3">
                                    <label>Thuộc thể loại</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className="form-control">
                                        <option>Chọn thể loại</option>
                                        {
                                            categoryList.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{error_list.category_id}</small>
                                </div>
                                <div className="form-group mb3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                                    <small className="text-danger">{error_list.slug}</small>
                                </div>
                                <div className="form-group mb3">
                                    <label>Tên</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                    <small className="text-danger">{error_list.name}</small>
                                </div>
                                <div className="form-group mb3">
                                    <label>Mô tả</label>
                                    <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>

                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                                    <div className="form-group mb3">
                                        <label>Hệ điều hành</label>
                                        <input type="text" name="os" onChange={handleInput} value={productInput.os} className="form-control" />
                                        <small className="text-danger">{error_list.os}</small>
                                    </div>

                                    <div className="form-group mb3">
                                        <label>Ram</label>
                                        <input type="text" name="ram" onChange={handleInput} value={productInput.ram} className="form-control" />
                                        <small className="text-danger">{error_list.ram}</small>
                                    </div>
                                 
                                </div>
                            <div className="tab-pane  card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                <div className="row ">
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Gía bán</label>
                                        <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                        <small className="text-danger">{error_list.selling_price}</small>
                                    </div>

                                    <div className="col-md-4 form-group mb-3">
                                        <label>Giá gốc</label>
                                        <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
                                        <small className="text-danger">{error_list.original_price}</small>
                                    </div>

                                    <div className="col-md-4 form-group mb-3">
                                        <label>Số lượng</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control" />
                                        <small className="text-danger">{error_list.qty}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Thương hiệu</label>
                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
                                        <small className="text-danger">{error_list.brand}</small>
                                    </div>

                                    <div className="col-md-8 form-group mb-3">
                                        <label>Ảnh</label>
                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        <small className="text-danger">{error_list.image}</small>
                                    </div>

                                  
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Trạng thái (checked=Ẩn)</label>
                                        <input type="checkbox" name="status"  onChange={handleCheckbox}defaultChecked={allcheckbox.status === 1 ? true : false} className="w-50 h-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2" >Thêm</button>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default AddProduct;