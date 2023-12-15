

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const initialFormData = {
    sku: "",
    price: "",
    name: "",
    type: {
      type: "",
      data: {  },
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [existingSKUs, setExistingSKUs] = useState([]);

  useEffect(() => {
    // Load existing SKUs from local storage
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    const skus = existingProducts.map((product) => product.sku);
    setExistingSKUs(skus);
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      
      [id] :value,
    }));
  };
  const handleTypeInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      
      type : { type:prevData.type.type,data:{...prevData.type.data, [id]:value}},
    }));
  };

  const handleSelectChange = (event) => {
    
    const selectedValue = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      type :{data:{},type:selectedValue},
    }));
    console.log(formData)

  };

  const isUniqueSKU = (sku) => !existingSKUs.includes(sku);

  const handleSave = (e) => {   
    e.preventDefault()
    const { sku } = formData;
   

    if (!sku.trim()) {
      alert("Please enter a SKU.");
      return;
    }

    if (!isUniqueSKU(sku)) {
      alert("SKU must be unique. This SKU already exists.");
      return;
    }

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts = [...existingProducts, formData];

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    setExistingSKUs([...existingSKUs, sku]);
    navigate("/products");
    console.log(1)
  };

  const CancelHandler = () => {
    alert("No new products added");
    navigate("/products");
  };

  return (
    <form className="p-4" id="product_form" onSubmit={(e)=>handleSave(e)}>
      <div className="d-md-flex justify-content-around">
        <button type="submit" className="col-md-2 col-12 btn btn-info" >
          Save
        </button>
        <button
          className="col-md-2 col-12 btn btn-danger"
          onClick={CancelHandler}
        >
          Cancel
        </button>
      </div>

      <div className="col-md-4 col-12">
        <label htmlFor="sku">Sku</label>
        <div className="input-group mt-2">
          <input
            type="text"
            placeholder="Please Enter Sku"
            className="form-control shadow-none p-3"
            id="sku"
            required
            value={formData.sku}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="col-md-4 col-12 mt-3">
        <label htmlFor="name">Name</label>
        <div className="input-group mt-2">
          <input
            type="text"
            placeholder="Please Enter Name"
            className="form-control shadow-none p-3"
            id="name"
            value={formData.name}
            required
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="col-md-4 col-12 mt-3">
        <label htmlFor="price">Price</label>
        <div className="input-group mt-2">
          <input
            type="number"
            placeholder="Please Enter Price"
            className="form-control shadow-none p-3"
            id="price"
            min={0}
            value={formData.price}
            required
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="col-md-4 col-12 mt-3">
        <label htmlFor="productType">Select Type</label>

        <select
          className="form-select shadow-none p-3"
          id="productType"
          value={formData.type.type}
          required
          name="select"
          onChange={(e)=>handleSelectChange(e)}
        >
          <option value="" hidden >
            Insert Type
          </option>
          <option value="DvD">DvD</option>
          <option value="Book">Book</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>

      {formData.type?.type === "DvD" && (
        <div className="col-md-4 col-12 mt-3">
          <label htmlFor="size">Size</label>
          <div className="input-group mt-2">
            <input
              type="text"
              placeholder="Please Enter Size"
              className="form-control shadow-none p-3"
              id="size"
              required
              value={formData.type.data.size}
              onChange={handleTypeInputChange}
            />
          </div>
        </div>
      )}

      {formData.type?.type === "Book" && (
        <div className="col-md-4 col-12 mt-3">
          <label htmlFor="weight">Weight</label>
          <div className="input-group mt-2">
            <input
              type="text"
              placeholder="Please Enter Weight"
              className="form-control shadow-none p-3"
              id="weight"
              required
              value={formData.type.data.weight}
              onChange={handleTypeInputChange}
            />
          </div>
        </div>
      )}

      {formData.type?.type === "Furniture" && (
        <div>
          <div className="col-md-4 col-12 mt-3">
            <label htmlFor="height">Height</label>
            <div className="input-group mt-2">
              <input
                type="number"
                placeholder="Please Enter Height"
                className="form-control shadow-none p-3"
                id="height"
                required
                min={1}
                value={formData.type.data.height|| ''}
                onChange={handleTypeInputChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mt-3">
            <label htmlFor="width">Width</label>
            <div className="input-group mt-2">
              <input
              required
                type="number"
                placeholder="Please Enter Width"
                className="form-control shadow-none p-3"
                id="width"
                min={1}
                value={formData.type.data.width||''}
                onChange={handleTypeInputChange}
              />
            </div>
          </div>
          <div className="col-md-4 col-12 mt-3">
            <label htmlFor="length">Length</label>
            <div className="input-group mt-2">
              <input
                type="number"
                placeholder="Please Enter Length"
                className="form-control shadow-none p-3"
                id="length"
                required
                min={1}
                value={formData.type.data.length||''}
                onChange={handleTypeInputChange}
              />
            </div>
          </div>
        </div>
      )}

      <p>Selected option: {formData.type.type}</p>
    </form>
  );
}
