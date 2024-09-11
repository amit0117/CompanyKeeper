// @ts-ignore
const baseUrl = import.meta.env.VITE_BASE_URL;
// @ts-ignore
const apiKey = import.meta.env.VITE_API_KEY;
import toast from 'react-hot-toast';
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
import { makeRequest } from '../utils/makeRequest';

export const saveCompanyList = (companyList: any) => (dispatch: any) => {
  dispatch({ type: SAVE_COMPANY_LIST, payload: companyList });
};

export const fetchAllCompanyList =
  (pageNumber: number, pageSize: number) => async (dispatch: any) => {
    try {
      dispatch({ type: FETCH_ALL_COMPANY_REQUEST });
      let url =
        baseUrl +
        `/api/company?apiKey=${apiKey}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
      const config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const companyResponse = await makeRequest(url, config);
      if (companyResponse) {
        dispatch(saveCompanyList(companyResponse.data));
        dispatch({ type: FETCH_ALL_COMPANY_SUCCESS });
      }
    } catch (err: any) {
      dispatch({ type: FETCH_ALL_COMPANY_FAIL });
    }
  };

export const fetchCompanyById =
  (companayId: string) => async (dispatch: any) => {
    try {
      dispatch({ type: FETCH_COMPANY_BY_ID_REQUEST });
      let url = baseUrl + `/api/company/${companayId}?apiKey=${apiKey}`;
      const config = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      const companyResponse = await makeRequest(url, config);

      if (companyResponse) {
        toast.success('Company details fetched successfully');
        dispatch({
          type: FETCH_COMPANY_BY_ID_SUCCESS,
          payload: companyResponse,
        });
      }
    } catch (err: any) {
      console.error('Failed to fetch company by Id', err);
      dispatch({ type: FETCH_COMPANY_BY_ID_FAIL });
    }
  };

export const createCompany = (companyDetails: any) => async (dispatch: any) => {
  try {
    dispatch({ type: CREATE_COMPANY_REQUEST });
    let url = baseUrl + `/api/company/v2?apiKey=${apiKey}`;
    const config = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companyDetails),
    };
    const response = await makeRequest(url, config);

    // because if response is null it means from makeRequest it returned null
    if (response) {
      toast.success('Company Created Successfully.');
      const pageNumber = 1,
        pageSize = 8;
      // i have made this api request because id which returned as a response
      // after creating a company was invalid. So we have to make other request
      // to fetch the company list to get correct information.
      dispatch(fetchAllCompanyList(pageNumber, pageSize));
      dispatch({ type: CREATE_COMPANY_SUCCESS });
    }
  } catch (error: any) {
    dispatch({ type: CREATE_COMPANY_FAIL });
    console.error('error in creating new company', error);
  }
};

export const editCompanyDetails =
  (companyId: string, updatedCompanyDetails: any) =>
  async (dispatch: any, getState: any) => {
    try {
      const url = baseUrl + `/api/company/v2?apiKey=${apiKey}`;
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCompanyDetails),
      };
      dispatch({ type: EDIT_COMPANY_REQUEST });
      const response = await makeRequest(url, config);

      // because if response is null it means from makeRequest it returned null
      if (response) {
        toast.success('Copmany Details Updated Successfully.');
        dispatch({ type: EDIT_COMPANY_SUCCESS });
        dispatch(fetchAllCompanyList(1, 8));
      }
    } catch (error: any) {
      dispatch({ type: EDIT_COMPANY_FAIL });
      console.error('error in updating company details', error?.message);
    }
  };

export const deleteCompanyDetails =
  (companyId: string) => async (dispatch: any, getState: any) => {
    try {
      const url = baseUrl + `/api/company/${companyId}?apiKey=${apiKey}`;
      const config = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
      dispatch({ type: DELETE_COMPANY_REQUEST });
      const response = await makeRequest(url, config);
      dispatch({ type: DELETE_COMPANY_SUCCESS });

      if (response) {
        toast.success('Company Deleted Successfully.');
        const { companyList } = getState();
        const updatedCompanyList = companyList?.filter(
          (currentCompany: any) => currentCompany.id != companyId
        );
        dispatch(saveCompanyList(updatedCompanyList));
      }
    } catch (error: any) {
      dispatch({ type: DELETE_COMPANY_FAIL });
      console.error('error in updating company details', error?.message);
    }
  };
