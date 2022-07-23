import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./updatedata.css";
const UpdateData = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const onChaneNameHandler = (event) => {
    setName(event.target.value);
  };
  const onChanePriceHandler = (event) => {
    setPrice(event.target.value);
  };
  const onChaneCategoryHandler = (event) => {
    setCategory(event.target.value);
  };
  const onChaneCompanyHandler = (event) => {
    setCompany(event.target.value);
  };

  useEffect(() => {
    // console.log('use params =>', id);
    getSingleProductData();
  }, []);

  const getSingleProductData = async () => {
    let data = await fetch(`http://localhost:5000/product/${params.id}`);
    data = await data.json();
    setName(data.product_name);
    setPrice(data.product_price);
    setCategory(data.product_category);
    setCompany(data.product_company);
  };

  const _hanldeSubmit = async (event) => {
    event.preventDefault();
    const adddprodct = {
      product_name: name,
      product_price: price,
      product_company: company,
      product_category: category,
    };

    let data = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "PUT",
      body : JSON.stringify(adddprodct),
      headers :{
        "Content-Type" : 'application/json'
      }
    });
    data = await data.json();
    navigate("/")


    console.log('update data =>', data);
};

  return (
    <div className="container">
      <form onSubmit={_hanldeSubmit} className="add-product-wrapper">
        <h2>update product</h2>
        <div className="add-product update">
          <div className="input-filed">
            <label htmlFor="name"> Name</label>

            <input
              type="text"
              id="name"
              placeholder="name"
              value={name}
              onChange={onChaneNameHandler}
            />
          </div>
          <div className="input-filed">
            <label htmlFor="price"> price </label>

            <input
              type="text"
              id="price"
              placeholder="price"
              value={price}
              onChange={onChanePriceHandler}
            />
          </div>
          <div className="input-filed">
            <label htmlFor="category"> category</label>

            <input
              type="text"
              id="category"
              placeholder="category"
              value={category}
              onChange={onChaneCategoryHandler}
            />
          </div>
          <div className="input-filed">
            <label htmlFor="company"> company</label>
            <input
              type="text"
              id="company"
              placeholder="company"
              value={company}
              onChange={onChaneCompanyHandler}
            />
          </div>

          <input type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default UpdateData;
