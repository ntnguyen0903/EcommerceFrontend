
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ReactPaginate from 'react-paginate';

const ViewCategory = () => {
  const [loading, setLoading] = useState(true);
  const [categorylist, setCategorylist] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const categoriesPerPage = 5; // Số lượng thể loại hiển thị trên mỗi trang

  useEffect(() => {
    axios.get('/api/view-category').then(res => {
      if (res.data.status === 200) {
        setCategorylist(res.data.category);
        setLoading(false);
      }
    });
  }, []);

  const offset = currentPage * categoriesPerPage;
  const currentPageData = categorylist.slice(offset, offset + categoriesPerPage);
  const pageCount = Math.ceil(categorylist.length / categoriesPerPage);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const deleteCategory = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đang xóa"

    axios.delete(`/api/delete-category/${id}`).then(res => {
      if (res.data.status === 200) {
        swal("Thành công", res.data.message, "success")
        thisClicked.closest("tr").remove();
      } else if (res.data.status === 500) {
        swal("Lỗi", res.data.message, "error")
        thisClicked.innerText = "Không thể xóa";
      } else if (res.data.status === 404) {
        swal("Thành công", res.data.message, "success")
        thisClicked.innerText = "Không thể xóa";
      }
    });
  }

  var viewcategory_HTMLTABLE = [];
  if (loading) {
    return <h4>Đang tải thể loại...</h4>
  } else {
    var CategoryStatus = '';
    viewcategory_HTMLTABLE = currentPageData.map((item) => {
      if (item.status == '0') {
        CategoryStatus = 'Hoạt động';
      }
      else if (item.status == '1') {
        CategoryStatus = 'Ngừng hoạt động';
      }
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>{CategoryStatus}</td>
          <td>
            <Link to={`edit-category/${item.id}`} className="btn btn-success btn-sm">Cập nhật</Link>
          </td>
          <td>
            <button type="button" onClick={(e) => deleteCategory(e, item.id)} className="btn btn-danger btn-sm">Xóa</button>
          </td>
        </tr>
      )
    });
  }

  return (
    <div className="container px -4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>Danh sách thể loại
            <Link to="/admin/add-category" className="btn btn-primary btn-sm float-end">Thêm thể loại</Link>
          </h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên loại</th>
                <th>Slug</th>
                <th>Trạng thái</th>
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {viewcategory_HTMLTABLE}
            </tbody>
          </table>
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
    </div>
  );
}

export default ViewCategory;
