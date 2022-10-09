const { default: Axios } = require("axios");
const {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} = require("../constants/productConstants");

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await Axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const deleteProduct = (productId) => async (dispatch, getstate) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const {
      userSignin: { userInfo },
    } = getstate();
    const { data } = await Axios.delete("/api/products/" + productId, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const productCreate = (product) => async (dispatch, getstate) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getstate();
    if (!product._id) {
      const { data } = await Axios.post("/api/products", product, {
        headers: { Authorization: "Bearer " + userInfo.token },
      });
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        "/api/products/" + product._id,
        product,
        {
          headers: { Authorization: "Bearer " + userInfo.token },
        }
      );
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.message });
  }
};

export { listProducts, detailsProduct, productCreate, deleteProduct };
