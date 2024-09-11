import '@mantine/core/styles.css';
import { Button, Flex, TextInput } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, isNotEmpty } from '@mantine/form';
import React, { useEffect } from 'react';
import { login } from '../actions/useraction';
import { useNavigate } from 'react-router-dom';

function Login() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value)
          ? null
          : 'Invalid email. Hint: (Email must have @ symbol in it And at least one letter after @).',
      password: isNotEmpty('Password is a required field.'),
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.userLogin);

  //if user is already logged in then redirect to company page
  useEffect(() => {
    if (userInfo) {
      navigate('/company');
    }
  }, [userInfo]);

  function userLoginHandler(values: typeof form.values) {
    // @ts-ignore
    dispatch(login(values.email, values.password));
    navigate('/company');
  }
  const websiteName = 'SignUP To CompanyKeeper';
  return (
    <div className='w-full flex flex-row justify-center items-center  '>
      <div className='w-[40%] bg-white rounded-lg border-[1px] border-gray-500 min-h-60 shadow-2xl mt-10'>
        <form
          onSubmit={form.onSubmit(userLoginHandler)}
          className='p-4 flex flex-col justify-start items-start gap-4 w-full'
        >
          <div className='min-w-full pt-4 font-bold text-center text-[24px] text-gray-600'>
            {websiteName.toUpperCase()}
          </div>
          <TextInput
            withAsterisk
            label='UserName'
            placeholder='test@email.com'
            key={form.key('email')}
            {...form.getInputProps('email')}
            className='w-full'
          />
          <TextInput
            withAsterisk
            label='Password'
            placeholder='1234'
            key={form.key('password')}
            {...form.getInputProps('password')}
            className='w-full'
          />
          <Flex
            justify='flex-center'
            align='flex-start'
            direction='row'
            className='w-[70%] mx-auto'
            mt={'md'}
          >
            <Button type='submit' radius={'xl'} fullWidth>
              SignUp
            </Button>
          </Flex>
        </form>
      </div>
    </div>
  );
}
export default Login;
