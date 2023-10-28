

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import swal from "sweetalert";
const ViewProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewProduct, setProduct] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 5; // Số lượng sản phẩm hiển thị trên mỗi trang

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(`/api/searchSP?term=${searchTerm}`).then(res => {
      if (res.data.results) {
        setProduct(res.data.results);
      }
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      console.log(error);
    });
  };

  useEffect(() => {
    axios.get('/api/view-product').then(res => {
      if (res.data.status === 200) {
        setProduct(res.data.products);
        setLoading(false);
      }
    });
  }, []);
  const deleteProduct = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Đang xóa"

    axios.delete(`/api/delete-product/${id}`).then(res => {
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
  const offset = currentPage * productsPerPage;
  const currentPageData = viewProduct.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(viewProduct.length / productsPerPage);

  const handlePageChange = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  var display_Productdata = "";
  if (loading) {
    return <h4>Đang tải sản phẩm... </h4>
  } else {
    var ProdStatus = '';
    display_Productdata = currentPageData.map((item) => {
      // console.log(item.status); // Kiểm tra giá trị của item.status
      if (item.status == '0') {
        ProdStatus = 'Hoạt động';
      }
      else if (item.status == '1') {
        ProdStatus = 'Ngừng hoạt động';
      }
      // console.log(ProdStatus); // Kiểm tra giá trị của ProdStatus
      const formattedDate = new Date(item.created_at).toLocaleDateString();
      const formattedDate1 = new Date(item.updated_at).toLocaleDateString();
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.category.name}</td>
          <td>{item.name}</td>
          <td>{item.original_price} </td>
          <td>{item.selling_price} </td>
          <td><img src={`http://127.0.0.1:8000/${item.image}`} width="100px" alt={item.name} /></td>
          <td>{item.qty}</td>
          <td>{formattedDate}</td>
          <td>{formattedDate1}</td>

          <td><Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm  ">Cập nhật</Link></td>
          <td>
            <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger btn-sm">Xóa</button>
          </td>
          <td>
            {ProdStatus}
          </td>

        </tr>

      )
    });
  }

  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>Danh sách Sản phẩm
          <Link to="/admin/add-product" className="btn btn-success btn-sm float-end">Thêm sản phẩm</Link>
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Tìm kiếm"
              aria-label="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </form>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Loại</th>
                <th>Tên sản phẩm</th>
                <th>Gía</th>
                <th>Gía sale</th>
                <th>Ảnh</th>
                <th>Số Lượng</th>
                <th>Ngày tạo</th>
                <th>Ngày cập nhật</th>
                <th>Cập nhật</th>
                <th></th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {display_Productdata}
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

export default ViewProduct;
