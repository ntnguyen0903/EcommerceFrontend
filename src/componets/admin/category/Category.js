
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import swal from "sweetalert";
const Category = () => {
    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        descrip: '',
        status: '',
        meta_title: '',
        meta_keyword: '',
        meta_descrip: '',
        error_list: [],
    });
    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value })
    }
    // const handleCheckbox = (e) => {
    //     e.persist();
    //     const value = e.target.checked ? '1' : '0'; // Sử dụng '1' cho trạng thái được chọn và '0' cho trạng thái không được chọn
    //     setCategory({ ...categoryInput, [e.target.name]: value });
    // };
    const handleCheckbox = (e) => {
        e.persist();
        const value = e.target.checked ? '1' : '0'; // Đảo ngược giá trị '0' và '1'
        setCategory({ ...categoryInput, [e.target.name]: value });
      };
    const submitCategory = (e) => {
        e.preventDefault();


        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.descrip,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keywords: categoryInput.meta_keyword,
            meta_descrip: categoryInput.meta_descrip,
        }
        axios.post('/api/store-category', data).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success")
                document.getElementById('CATEGORY_FORM').reset();
            } else if (res.data.status === 400) {
                setCategory({ ...categoryInput, error_list: res.data.errors });
            }
        })
    }
    var display_errors = [];
    if (categoryInput.error_list) {
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.meta_title,
        ]

    }
    return (
        <div className="container-fluid px-4">
            {
                display_errors.map((item) => {
                    return (<p className="mb-1" key={item}>{item}</p>)
                })
            }
            <div className="card mt-4">
                <div>
                    <h4>Thêm thể loại
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end" >View Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitCategory} id="CATEGORY_FORM">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane card-body boder fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                    <span>{categoryInput.error_list.slug}</span>
                                </div>
                                <div className="form-group mb3">
                                    <label>Tên</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    <span>{categoryInput.error_list.name}</span>
                                </div>
                                <div className="form-group mb3">
                                    <label>Miêu tả</label>
                                    <textarea name="descrip" onChange={handleInput} value={categoryInput.descrip} className="form-control"></textarea>
                                </div>
                                {/* <div className="form-group mb3">
                                    <label>Trạng thái</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} />Status 0=shown/1=hidden
                                </div> */}
                                <div className="form-group mb3">
                                    <label>Trạng thái</label>
                                    <input
                                        type="checkbox"
                                        name="status"
                                        onChange={handleCheckbox}
                                        checked={categoryInput.status === '1'}
                                    />
                                    <span>Status 0=shown/1=hidden</span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end" >Thêm</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Category;