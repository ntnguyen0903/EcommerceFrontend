
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {Link} from 'react-router-dom';
// import swal from "sweetalert";
// const ViewUser = () => {

//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading,setLoading]= useState(true);
//     const [categorylist,setCategorylist]= useState([]);

//     const handleSearch = (e) => {
//         e.preventDefault(); // Ngăn chặn hành vi mặc định của form submit
//         setLoading(true); // Đặt lại trạng thái loading về true để hiển thị thông báo đang tải
    
//         axios.get(`/api/searchKH?term=${searchTerm}`)
//             .then(res => {
//                 if (res.data.results) {
//                     setCategorylist(res.data.results);
//                 }
//                 setLoading(false); // Đặt trạng thái loading về false khi nhận được kết quả từ API
//             })
//             .catch(error => {
//                 setLoading(false); // Đặt trạng thái loading về false khi có lỗi xảy ra
//                 console.log(error);
//             });
//     };




//     useEffect(()=>{
//         axios.get('/api/view-user').then(res=>{
//             // console.log(res.data.category);
//             if(res.status === 200)
//             {
//                 setCategorylist(res.data.users)
//             }
//             setLoading(false);
//         });
//     },[]);
//     const deleteCategory = (e, id) =>{
//         e.preventDefault();
//         const thisClicked = e.currentTarget;
//         thisClicked.innerText = "Deleting"

//         axios.delete(`/api/delete-user/${id}`).then(res=>{
//             if(res.data.status === 200)
//             {
//                 swal("Success", res.data.message,"success")
//                 thisClicked.closest("tr").remove();
//             }
//             else if (res.data.status === 500)
//             {
//                 swal("Lỗi", res.data.message,"error")
//                 thisClicked.innerText = "Không thể xóa";
//             }
//             else if (res.data.status === 404)
//             {
//                 swal("Success", res.data.message,"success")
//                 thisClicked.innerText = "Không thể xóa";
//             }
//         });
//    }

//     var viewcategory_HTMLTABLE =" ";
//     if(loading){
//         return <h4>loading Category...</h4>
//     }
//     else
//     {
//         viewcategory_HTMLTABLE =
//         categorylist.map((item)=>{
//             return(
//                 <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.name}</td>
//                     <td>{item.email}</td>
//                     <td>
//                         {/* <Link to={"/"} className="btn btn-success btn-sm">Edit</Link> */}
//                         <Link to={`edit-user/${item.id}`} className="btn btn-success btn-sm">Cập Nhật</Link>
//                     </td>
//                     <td>
//                     {/* <button type="button" className="btn btn-danger btn-sm">Xóa</button> */}
//                         <button type="button" onClick={ (e)=> deleteCategory(e,item.id)} className="btn btn-danger btn-sm">Xóa</button>
//                     </td>
//                 </tr>
              
//             )

//         });
//     }
//     return ( 
//        <div className="container px -4">
//          <div className="card mt-4">
//             <div className="card-header">
//                 <h4>Danh sách Khách Hàng
//                     {/* <Link to ="/admin/add-category" className="btn btn-primary btn-sm float-end">Thêm thể loại</Link> */}
//                 </h4>
//                 <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
//                         <input
//                             className="form-control mr-sm-2"
//                             type="search"
//                             placeholder="Tìm kiếm"
//                             aria-label="Search"
//                             value={searchTerm}
//                             onChange={e => setSearchTerm(e.target.value)}
//                         />
//                     </form>
//             </div>
//             <div className="card-body">
//                     <table className="table table-bordered table-striped">
//                         <thead>
//                             <tr>
//                                 <th>Mã khách hàng</th>
//                                 <th>Tên KHách hàng</th>
//                                 <th>email</th>
                            
//                                 <th>Sửa</th>
//                                 <th>Xóa</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {viewcategory_HTMLTABLE}
//                         </tbody>
//                     </table>
//             </div>
//         </div> 
//        </div>
    
//     );
// }
 
// export default ViewUser;
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
import ReactPaginate from 'react-paginate';

const ViewUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5; // Số lượng khách hàng hiển thị trên mỗi trang

    // Xử lý tìm kiếm
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.get(`/api/searchKH?term=${searchTerm}`)
            .then(res => {
                if (res.data.results) {
                    setCategorylist(res.data.results);
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            });
    };

    // Xử lý xóa khách hàng
    const deleteCategory = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-user/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setCategorylist(prevState => prevState.filter(item => item.id !== id));
                } else if (res.data.status === 500) {
                    swal("Error", res.data.message, "error");
                    thisClicked.innerText = "Không thể xóa";
                } else if (res.data.status === 404) {
                    swal("Success", res.data.message, "success");
                    thisClicked.innerText = "Không thể xóa";
                }
            });
    };

    useEffect(() => {
        axios.get('/api/view-user')
            .then(res => {
                if (res.status === 200) {
                    setCategorylist(res.data.users);
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    const offset = currentPage * usersPerPage;
    const currentPageData = categorylist.slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(categorylist.length / usersPerPage);

    const handlePageChange = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    let viewcategory_HTMLTABLE = "";
    if (loading) {
        return <h4>Loading Category...</h4>;
    } else {
        viewcategory_HTMLTABLE = currentPageData.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                    <Link to={`edit-user/${item.id}`} className="btn btn-success btn-sm">Cập Nhật</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteCategory(e, item.id)} className="btn btn-danger btn-sm">Xóa</button>
                </td>
            </tr>
        ));
    }

    return (
        <div className="container px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Danh sách Khách Hàng</h4>
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
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Mã khách hàng</th>
                                <th>Tên Khách hàng</th>
                                <th>Email</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewcategory_HTMLTABLE}
                        </tbody>
                    </table>
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

export default ViewUser;
