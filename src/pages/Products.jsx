import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  // State for storing products and selected products
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch data from local storage
  useEffect(() => {
    const storedData = localStorage.getItem("products");
    setProducts(storedData ? JSON.parse(storedData) : []);
  }, []);

  // Handler function for checkbox change
  const handleCheckboxChange = (index) => {
    const newSelectedProducts = [...selectedProducts];
    if (newSelectedProducts.includes(index)) {
      newSelectedProducts.splice(newSelectedProducts.indexOf(index), 1);
    } else {
      newSelectedProducts.push(index);
    }
    setSelectedProducts(newSelectedProducts);
  };

  // Handler function for mass delete button
  const handleMassDelete = () => {
    const remainingProducts = products.filter(
      (_, index) => !selectedProducts.includes(index)
    );

    setProducts(remainingProducts);

    localStorage.setItem("products", JSON.stringify(remainingProducts));

    setSelectedProducts([]);
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-2">All Products</h2>
      <div className="d-md-flex justify-content-end mb-5">
        <button
          className="col-md-2 col-12 btn btn-info me-5"
          onClick={() => navigate("/AddProduct")}
        >
          Add
        </button>
        <button
          className="col-md-2 col-12 btn btn-danger"
          onClick={handleMassDelete}
          disabled={selectedProducts.length === 0}
        >
          Mass Delete
        </button>
      </div>

      {products.length === 0 ? (
        <Fragment>
          <div className="container mt-4">
            <h2>No Products Available</h2>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="d-flex flex-wrap ">
            {products.map((product, index) => (
              <div key={index} className="card m-md-2 col-md-3 col-12 bg-secondary-subtle">
                <div className="card-body d-md-flex justify-content-between align-items-start">
                  <div className="col-md-11 col-12 d-flex flex-column  ">
                    <p className="card-text">Name:{product.name}</p>
                    <p className="card-text">SKU: {product.sku}</p>
                    <p className="card-text">Price: {product.price}</p>
                    <p className="card-text">Type: {product.type.type}</p>
                    {product.type.type === "DvD" && (
                      <p className="card-text">
                        Size: {product.type.data?.size}
                      </p>
                    )}
                    {product.type.type === "Book" && (
                      <p className="card-text">
                        Weight: {product.type.data?.weight}
                      </p>
                    )}
                    {product.type.type === "Furniture" && (
                      <p className="card-text">
                        Dimensions :{" "}
                        {product.type.data?.height *
                          product.type.data?.width *
                          product.type.data?.length}
                      </p>
                    )}
                  </div>
                  <input
                    id="delete-checkbox"
                    className="col-md-1 col-12"
                    type="checkbox"
                    checked={selectedProducts.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Products;
