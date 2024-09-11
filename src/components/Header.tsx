import React, { useState } from 'react';
import { Text } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import CreateCompanyDetails from './createCompany';
import { logout } from '../actions/useraction';
const Header = () => {
  const { userInfo } = useSelector((state: any) => state.userLogin);
  const [createCompany, setCreateCompany] = useState(false);
  const content = [
    { title: 'Companies', url: '/company' },
    { title: 'login', url: '/login' },
  ];
  const dispatch = useDispatch();
  return (
    <div className='bg-slate-500 flex flex-row justify-between items-center gap-3 h-[5rem]'>
      <Text size='xl' fw={700} style={{ padding: '10px' }}>
        COMPANYKEEPER
      </Text>
      <div className='py-4 pr-8 flex flex-row justify-end items-center'>
        {userInfo && (
          <button
            onClick={() => setCreateCompany(true)}
            className='px-4 mr-2 text-white font-normal py-2 bg-blue-500 rounded-md border-[1px] border-white'
          >
            <FontAwesomeIcon icon={faAdd} /> Company
          </button>
        )}
        {content.map((currentContent: any) => (
          <a
            href={currentContent.url}
            className='hover:underline hover:text-white  font-semibold text-[20px] mr-4'
            key={currentContent.title}
            hidden={userInfo && currentContent.title === 'login'}
          >
            {currentContent.title}
          </a>
        ))}
        {userInfo && (
          <span
            onClick={() => {
              // @ts-ignore
              dispatch(logout());
            }}
            className='hover:underline hover:text-white  font-semibold cursor-pointer'
          >
            Logout
          </span>
        )}
      </div>
      {createCompany && (
        <CreateCompanyDetails onClose={() => setCreateCompany(false)} />
      )}
    </div>
  );
};

export default Header;
