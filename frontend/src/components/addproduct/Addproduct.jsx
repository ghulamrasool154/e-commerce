import React from "react";
import { useState } from "react";
import "./addproduct.css";
const Addproduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

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
  const _hanldeSubmit = async (event) => {
    event.preventDefault();

    console.log(!name);
    if (!name || !price || !company || !category) {
      setErrorMessage(true);
      return false;
    } else {
      const userID = JSON.parse(localStorage.getItem("user"))._id;
      const adddprodct = {
        product_name: name,
        product_price: price,
        product_company: company,
        product_category: category,
        product_add_userId: userID,
      };

      let appProduct = await fetch("http://localhost:5000/add_product", {
        method: "POST",
        body: JSON.stringify(adddprodct),
        headers: {
          "Content-Type": "application/json",
        },
      });
      appProduct = await appProduct.json();
      console.log("Product =>", appProduct);
      setErrorMessage(false);

      setName("");
      setCategory("");
      setCompany("");
      setPrice("");
    }
  };

  return (
    <div className="container">
     
      <form onSubmit={_hanldeSubmit} className="add-product-wrapper">

      <h2>add product</h2>
        <div className="add-product">
          <div className="input-filed">
            <label htmlFor="name"> Name</label>

            {errorMessage && !name && (
              <span className="invaluidmessage"> Invalid name </span>
            )}

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
            {errorMessage  && !price && <span className="invaluidmessage"> Invalid price </span>}

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
            {errorMessage && !category && <span className="invaluidmessage"> Invalid category </span>}

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
            {errorMessage && !company && <span className="invaluidmessage"> Invalid company </span>}
                        <input
              type="text"
              id="company"
              placeholder="company"
              value={company}
              onChange={onChaneCompanyHandler}
            />
          </div>

       
          <input type="submit" value="add product" />
        </div>
      </form>
    </div>
  );
};

export default Addproduct;
