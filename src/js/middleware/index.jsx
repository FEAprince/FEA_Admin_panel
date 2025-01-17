import {
  categoryHandlerData,
  categoryStatus,
  searchProductData,
  categoryDelete,
  productHandlerData,
  productStatus,
  productDelete,
  searchHandlerData,
  // customersEditHandlerdata,
  customersStatus,
  // customersDataHndlerData,
  customersHandler,
  searchCustomersData,
  customersDelete,
} from "../../service/Auth.Service";
import {
  loadingStart,
  loadingStop,
  fetchCategoryList,
  fetchCategoryListFailure,
  fetchCategoryListSuccess,
  fetchProductListFailure,
  fetchProductList,
  fetchProductListSuccess,
  fetchProductSearchSuccess,
  fetchSearchSuccess,
  pageNumber,
  categoryPageNumber,
  fetchCustomersSearchSuccess,
  fetchCustomersList,
  fetchCustomersListFailure,
  fetchCustomersListSuccess,
} from "../actions";

export const loggerMiddleware = (store) => (next) => (action) => {
  try {
    switch (action.type) {
      case "FETCH_CATEGORY":
        store.dispatch(loadingStart());
        categoryHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCategoryListSuccess(res));
            } else {
              store.dispatch(fetchCategoryListFailure());
              alert("FETCH_CATEGORY => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE FETCH_CATEGORY DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "CHANGE_CATEGORY_STATUS":
        store.dispatch(loadingStart());
        categoryStatus(action.payload.id, action.payload.body)
          .then((res) => {
            console.log(res);
            if (res.success) {
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
              alert("CHANGE_CATEGORY_STATUS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE CHANGE_CATEGORY_STATUS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_DELETION":
        store.dispatch(loadingStart());
        categoryDelete(action.payload.id)
          .then((res) => {
            if (res.status === 200) {
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
              alert("ON_DELETION => RESPONSE => FALSE");
            }
          })
          .catch((error) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE ON_DELETION DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_SEARCH":
        store.dispatch(loadingStart());
        searchHandlerData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchSearchSuccess(res.data));
            } else if (res.success === false) {
              store.dispatch(fetchCategoryListFailure());
            } else {
              store.dispatch(fetchCategoryList(action.payload.defaultPayload));
              alert("ON_SEARCH => RESPONSE => FALSE");
            }
          })
          .catch((error) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE ON_SEARCH DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_SEARCH_PRODUCT":
        store.dispatch(loadingStart());
        searchProductData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchProductSearchSuccess(res.data));
            } else if (res.success === false) {
              store.dispatch(fetchProductListFailure());
              alert("ON_SEARCH_PRODUCT => RESPONSE => FALSE");
            } else {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
              alert("ON_SEARCH_PRODUCT => RESPONSE => ERROR");
            }
          })
          .catch((error) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE ON_SEARCH_PRODUCT DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_PRODUCT":
        store.dispatch(loadingStart());
        productHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchProductListSuccess(res));
            } else {
              store.dispatch(fetchProductListFailure());
              alert("FETCH_PRODUCT => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE FETCH_PRODUCT DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "CHANGE_PRODUCT_STATUS":
        store.dispatch(loadingStart());
        productStatus(action.payload.id, action.payload.body)
          .then((res) => {
            console.log(res);
            if (res.success) {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
              alert("CHANGE_PRODUCT_STATUS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE CHANGE_PRODUCT_STATUS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_DELETION_PRODUCT":
        store.dispatch(loadingStart());
        productDelete(action.payload.id)
          .then((res) => {
            if (res.status === 200) {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchProductList(action.payload.defaultPayload));
              alert("ON_DELETION_PRODUCT => RESPONSE => FALSE");
            }
          })
          .catch((error) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE ON_DELETION_PRODUCT DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_PAGINATION":
        store.dispatch(loadingStart());
        console.log("PAGE", action.payload.pagination.page);
        productHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchProductListSuccess(res));
              store.dispatch(pageNumber(action.payload.pagination.page));
            } else {
              store.dispatch(fetchProductListFailure());
              alert("LOAD_PAGINATION => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchProductListFailure());
            alert("ERROR OCCURED WHILE LOAD_PAGINATION DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_CATEGORY_PAGINATION":
        store.dispatch(loadingStart());
        categoryHandlerData(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCategoryListSuccess(res));
              store.dispatch(
                categoryPageNumber(action.payload.pagination.page)
              );
            } else {
              store.dispatch(fetchCategoryListFailure());
              alert("LOAD_CATEGORY_PAGINATION => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCategoryListFailure());
            alert("ERROR OCCURED WHILE LOAD_CATEGORY_PAGINATION DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;

      case "ON_SEARCH_CUSTOMERS":
        store.dispatch(loadingStart());
        searchCustomersData(action.payload.body)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCustomersSearchSuccess(res.data));
            } else if (res.success === false) {
              store.dispatch(fetchCustomersListFailure());
              alert("ON_SEARCH_CUSTOMERS => RESPONSE => FALSE");
            } else {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
              alert("ON_SEARCH_CUSTOMERS => RESPONSE => ERROR");
            }
          })
          .catch((error) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE ON_SEARCH_CUSTOMERS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "FETCH_CUSTOMERS":
        store.dispatch(loadingStart());
        customersHandler(action.payload)
          .then((res) => {
            
            if (res) {
              store.dispatch(fetchCustomersListSuccess(res));
            } else {
              store.dispatch(fetchCustomersListFailure());
              alert("FETCH_CUSTOMERS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE FETCH_CUSTOMERS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "CHANGE_CUSTOMERS_STATUS":
        store.dispatch(loadingStart());
        customersStatus(action.payload.id, action.payload.body)
          .then((res) => {
            console.log(res);
            if (res) {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
              alert("CHANGE_CUSTOMERS_STATUS => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE CHANGE_CUSTOMERS_STATUS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "ON_DELETION_CUSTOMERS":
        store.dispatch(loadingStart());
        customersDelete(action.payload.id)
          .then((res) => {
            if (res.status === 200) {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
            } else {
              store.dispatch(fetchCustomersList(action.payload.defaultPayload));
              alert("ON_DELETION_CUSTOMERS => RESPONSE => FALSE");
            }
          })
          .catch((error) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE ON_DELETION_CUSTOMERS DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      case "LOAD_PAGINATION_CUSTOMERS":
        store.dispatch(loadingStart());
        console.log("PAGE", action.payload.pagination.page);
        customersHandler(action.payload)
          .then((res) => {
            if (res.success) {
              store.dispatch(fetchCustomersListSuccess(res));
              store.dispatch(pageNumber(action.payload.pagination.page));
            } else {
              store.dispatch(fetchCustomersListFailure());
              alert("LOAD_PAGINATION => RESPONSE => FALSE");
            }
          })
          .catch((err) => {
            store.dispatch(fetchCustomersListFailure());
            alert("ERROR OCCURED WHILE LOAD_PAGINATION DISPATCHED ");
          })
          .finally(() => {
            store.dispatch(loadingStop());
          });
        break;
      default:
        return next(action);
    }
  } catch (error) {
    alert(error);
  }
};
