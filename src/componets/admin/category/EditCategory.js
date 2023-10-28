
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
const EditCategory = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState({
   
      });

    const [error, setError] = useState([]);

    useEffect(() => {
        const category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
            }
            else if (res.data.status === 404) {
                swal("error", res.data.message, "error");
                history.push("/admin/view-category");
            }
            setLoading(false);
        });
    }, [props.match.params.id, history]);
    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    //
    const handleCheckbox = (e) => {
        e.persist();
        const value = e.target.checked ? '1' : '0'; // Đảo ngược giá trị '0' và '1'
        setCategory({ ...categoryInput, [e.target.name]: value });
      };


    const updateCategory = (e) => {
        e.preventDefault();
        const category_id = props.match.params.id;
        const data = categoryInput;
        axios.put(`/api/update-category/${category_id}`, data).then(res => {
            if (res.data.status === 200) {
                swal("Thành công!", res.data.message, "thành công");
                setError([]);
            }
            else if (res.data.status === 422) {
                swal("Tất cả các lĩnh vực là bắt buộc", "", "lỗi");
                setError(res.data.errors)
            }
            else if (res.data.status === 404) {
                swal("Lỗi", res.data.message, "lỗi");
                history.push('admin/view-category');
            }
        })

    }
    if (loading) {
        return <h4>Đang tải...</h4>
    }
    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div>
                    <h4>Thêm thể loại
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end" >Back</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateCategory}>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">Seo Tags</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane card-body boder fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                                    <small className="text-danger">{error.slug}</small>
                                </div>
                                <div className="form-group mb3">
                                    <label>Tên</label>
                                    <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                                    <small className="text-danger">{error.name}</small>
                                </div>
                                <div className="form-group mb3">
                                    <label>Miêu tả</label>
                                    <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
                                </div>
                                
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
                        <button type="submit" className="btn btn-primary px-4 float-end" float>Sửa</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCategory;