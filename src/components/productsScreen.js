import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  listProducts,
  productCreate,
} from "../actions/productActions";

const ProductsScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState();
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const createProduct = useSelector((state) => state.createProduct);
  const productList = useSelector((state) => state.productList);
  const productDelete = useSelector((state) => state.productDelete);
  const { loading, products, error } = productList;
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
  } = productDelete;
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = createProduct;

  useEffect(() => {
    if (createSuccess) {
      setModalVisible(false);
    }
    dispatch(listProducts());
  }, [createSuccess, deleteSuccess]);

  const submit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    dispatch(
      productCreate({
        _id: id,
        name,
        price,
        brand,
        image,
        category,
        countInStock,
        description,
      })
    );
  };

  const remove = (product) => {
    dispatch(deleteProduct(product._id));
  };

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  };

  return (
    <div className="con">
      {modalVisible && (
        <div className="containe">
          <h1 className="h1">Create Product</h1>
          <form className="form" onSubmit={submit}>
            <label className="label">Name</label>
            <input
              className="linput"
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label className="label">Brand</label>
            <input
              className="linput"
              type="text"
              name="brand"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
            <label className="label">Image</label>
            <input
              className="linput"
              type="text"
              name="image"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
            <label className="label">Category</label>
            <input
              className="linput"
              type="text"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <label className="label">Description</label>
            <input
              className="linput"
              type="text"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <label className="label">Count In Stock</label>
            <input
              className="linput"
              type="text"
              name="countInStock"
              value={countInStock}
              onChange={(e) => {
                setCountInStock(e.target.value);
              }}
            />
            <label className="label">Price</label>
            <input
              className="linput"
              type="text"
              name="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />

            <button className="buttonn">{id ? "Update" : "Create"}</button>
            <button className="buttonn" onClick={() => setModalVisible(false)}>
              back
            </button>
          </form>
        </div>
      )}
      <div>
        <div>
          <h3>Products</h3>
          <button onClick={() => openModal({})}>Create Product</button>
        </div>
        {createLoading && <div>loading...</div>}
        {createError && <div>{createError}</div>}

        <div>
          <table>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button onClick={() => openModal(product)}>Edit</button>
                    <button onClick={() => remove(product)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsScreen;
