import React from "react";
import { useState, useEffect } from "react";
import "./products.css";

import { Link } from "react-router-dom";
const Products = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    _hanldeInput();
  }, []);
  const _hanldeInput = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProductList(result);
    console.log(result);
  };

  const _hanldeDeleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      alert("Do You want to delete the record");
      _hanldeInput();
    }
  };

  const searchHandler = async (event) => {
    let key = event.target.value;
    if(key){
    let result = await fetch(`http://localhost:5000/search/${key}`);
    result = await result.json();
    if (result) {
      setProductList(result);
    }}else{
      _hanldeInput();
    }
  };
  return (
    <div className="container">
      <div className="product-wrappr">
        <h2> Product List Get Data form api</h2>

        <div className="searchinput">
          <input
            type="text"
            placeholder="Search By Name"
            onChange={searchHandler}
          />
        </div>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th> SR No</th>
              <th> Product Name </th>
              <th> Product Price </th>
              <th> Product Category</th>
              <th> Product Company</th>
              <th> Operation </th>
            </tr>
          </thead>
          <tbody>
            {productList.length > 0 ? (
              productList.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td>{index + 1}</td>
                    <td>{element.product_name}</td>
                    <td>
                      <span className="price">{element.product_price}</span>
                    </td>
                    <td>{element.product_category}</td>
                    <td>{element.product_company}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => _hanldeDeleteProduct(element._id)}
                      >
                        Delete
                      </button>
                      <Link to={`/update/${element._id}`}>
                        <button className="update">Update</button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
             <tr>
                <td colSpan={6}> <h1>Sorry Data No found</h1></td>
             </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
