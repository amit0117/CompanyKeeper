import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCompanyList } from '../actions/companyaction';
import { Pagination } from '@mantine/core';
import CompanyCard from '../components/CompanyCard';
import { Skeleton } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import '../styles/companyCardStyles.css';
const CompanyScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCompanyList = useSelector((state: any) => state.companyList);
  const { loading: fetchAllCompanyListLoading } = useSelector(
    (state: any) => state.fetchAllCompanyList
  );
  const { loading: deleteCompanyDetailsLoading } = useSelector(
    (state: any) => state.deleteCompany
  );
  const { userInfo } = useSelector((state: any) => state.userLogin);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  // console.log('in company screen userinof is', userInfo);

  // check if user is logged in or not
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo]);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchAllCompanyList(currentPageNumber, 20));
  }, [currentPageNumber]);
  // console.log('in company screen', allCompanyList);

  return (
    <div className='flex flex-col justify-start items-start flex-wrap min-w-full py-4 gap-1 bg-white'>
      {fetchAllCompanyListLoading || deleteCompanyDetailsLoading ? (
        <div className='cards relative gap-1 min-w-full min-h-screen'>
          {Array.from({ length: 8 }).map((_: any, index: number) => (
            <div
              className='card gap-3 justify-start items-end p-3 h-[20rem] bg-gray-200 ms-2 mt-2 min-h-max'
              key={index}
            >
              <Skeleton height={50} circle mb='xl' />
              <Skeleton height={8} radius='xl' />
              <Skeleton height={8} mt={6} radius='xl' />
              <Skeleton height={8} mt={6} width='70%' radius='xl' />
            </div>
          ))}
        </div>
      ) : (
        <div className='flex flex-col justify-start items-start min-w-full gap-2'>
          <div className='cards relative gap-1 min-w-full '>
            {allCompanyList.map((currentCompany: any) => (
              <CompanyCard key={currentCompany.id} company={currentCompany} />
            ))}
          </div>
          <Pagination
            total={10}
            siblings={1}
            defaultValue={1}
            className='my-4 mx-auto'
            value={currentPageNumber}
            onChange={setCurrentPageNumber}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyScreen;
