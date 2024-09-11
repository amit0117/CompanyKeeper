import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  function goToLoginPage() {
    navigate('/login');
  }
  function goToCompanyPage() {
    navigate('/company');
  }
  return (
    <div className='min-w-full font-semibold min-h-screen bg-slate-200 text-black text-center flex flex-col justify-center items-center gap-5'>
      <span className='font-bold font-serif'> This is Home Page.</span>
      <div className='mx-auto flex flex-row justify-center items-center gap-4'>
        <button
          className='px-3 py-1 bg-indigo-500 rounded-md border-[1px] border-white'
          onClick={goToLoginPage}
        >
          Login
        </button>
        <button
          className='px-3 py-1 bg-green-400 rounded-md border-[1px] border-white'
          onClick={goToCompanyPage}
        >
          Explore Company
        </button>
      </div>
    </div>
  );
};

export default HomePage;
