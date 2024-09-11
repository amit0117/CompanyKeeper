import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

import { thunk } from 'redux-thunk';

import {
  saveCompanyListReducer,
  createCompanyReducer,
  editCompanyReducer,
  fetchAllCompanyListReducer,
  fetchCompanyByIdReducer,
  deleteCompanyReducer,
} from './reducer/companyreducer';

import { userLoginReducer } from './reducer/userreducer';

const reducer = combineReducers({
  companyList: saveCompanyListReducer,
  createCompany: createCompanyReducer,
  fetchAllCompanyList: fetchAllCompanyListReducer,
  fetchCompanyById: fetchCompanyByIdReducer,
  editCompany: editCompanyReducer,
  deleteCompany: deleteCompanyReducer,
  userLogin: userLoginReducer,
});
const userInforFromStorage = localStorage.getItem('userInfo')
  ? // @ts-ignore
    JSON.parse(localStorage.getItem('userInfo'))
  : null;
const initialState = {
  userLogin: { userInfo: userInforFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
