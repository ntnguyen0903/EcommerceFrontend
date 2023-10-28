
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import numeral from 'numeral';

const SearchResults = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const searchTerm = searchParams.get("term");
  const [searchResults, setSearchResults] = useState([]);

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/api/search?term=${searchTerm}`);
        const searchResults = response.data.results;

        setSearchResults(searchResults);
        //console.log(searchResults); // Kiểm tra kết quả tìm kiếm
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  //Quantity Increment/Decrement Hooks - Start
  const submitAddtoCart = (e, product_id) => {
    e.preventDefault();

    const data = {
      product_id: product_id,
      product_qty: quantity,
    };

    setQuantity(quantity + 1); // Tăng giá trị quantity lên một

    axios.post(`/api/add-to-cart`, data).then(res => {
      if (res.data.status === 201) {
        swal("Success", res.data.message, "success");
        history.push('/cart');
      } else if (res.data.status === 409) {
        swal("Warning", res.data.message, "warning");
      } else if (res.data.status === 401) {
        swal("Error", res.data.message, "error");
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "warning");
      }
    });
  };

  return (
    <div className="container" >
      <h2>Kết quả tìm kiếm cho: "{searchTerm}"</h2>

      {searchResults.length > 0 ? (
      <div className="row">
        {searchResults.map((result) => (
          <div className="col-md-3" key={result.id}>
            <div className="card">
            <Link to={`/collections/${result.category.slug}/${result.slug}`}>
                <img src={`http://127.0.0.1:8000/${result.image}`} className="w-100" alt={result.name} />
              </Link>
              <div className="card-body">
              
                  <h5>{result.name}</h5>
                  {/* <Link to={`/collections/${result.category.slug}/${result.slug}`}>{result.slug} </Link> */}
                 
                  <h6 className="mb-1">
                                    <span style={{ color: 'red' }}>
                                        {numeral(result.selling_price).format('0,0')}<sup>đ</sup>
                                    </span>
                                    <s className="ms-2"  style={{ opacity: 0.5 }}>{numeral(result.original_price).format('0,0')}<sup>đ</sup></s>
                </h6>
                {result.qty > 0 ? (
                  <button type="button" className="btn btn-primary w-100" onClick={(e) => submitAddtoCart(e, result.id)}>Thêm vào giỏ hàng</button>
                ) : (
                  <label className="btn btn-primary w-100">Hết hàng</label>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
       ) : (
        <h6>Không có sản phẩm.</h6>
      )}
    </div>
  );
};

export default SearchResults
