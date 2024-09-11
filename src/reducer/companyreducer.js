import {
  SAVE_COMPANY_LIST,
  CREATE_COMPANY_FAIL,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  EDIT_COMPANY_FAIL,
  EDIT_COMPANY_REQUEST,
  EDIT_COMPANY_SUCCESS,
  FETCH_ALL_COMPANY_FAIL,
  FETCH_ALL_COMPANY_REQUEST,
  FETCH_ALL_COMPANY_SUCCESS,
  FETCH_COMPANY_BY_ID_FAIL,
  FETCH_COMPANY_BY_ID_REQUEST,
  FETCH_COMPANY_BY_ID_SUCCESS,
} from '../constants/companyconstant';

export const saveCompanyListReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_COMPANY_LIST:
      return [...action.payload];
    default:
      return state;
  }
};

export const fetchAllCompanyListReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_COMPANY_REQUEST:
      return { loading: true };
    case FETCH_ALL_COMPANY_SUCCESS:
      return { loading: false, success: true };
    case FETCH_ALL_COMPANY_FAIL:
      return { loading: false, success: false, error: true };
    default:
      return state;
  }
};

export const fetchCompanyByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COMPANY_BY_ID_REQUEST:
      return { loading: true };
    case FETCH_COMPANY_BY_ID_SUCCESS:
      return { loading: false, success: true, currentCompany: action.payload };
    case FETCH_COMPANY_BY_ID_FAIL:
      return { loading: false, success: false, error: true };
    default:
      return state;
  }
};

export const createCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMPANY_REQUEST:
      return { ...state, loading: true };
    case CREATE_COMPANY_SUCCESS:
      return { ...state, loading: false, success: true };
    case CREATE_COMPANY_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const editCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_COMPANY_REQUEST:
      return { ...state, loading: true };
    case EDIT_COMPANY_SUCCESS:
      return { ...state, loading: false, success: true };
    case EDIT_COMPANY_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const deleteCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMPANY_REQUEST:
      return { ...state, loading: true };
    case DELETE_COMPANY_SUCCESS:
      return { ...state, loading: false, success: true };
    case DELETE_COMPANY_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
