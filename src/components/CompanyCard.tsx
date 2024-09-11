import React, { useState } from 'react';
import { randomCompanyImage } from '../utils/getRandomCompanyImage';
import { Card, Image, Text, Flex, Space, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch } from 'react-redux';
import { deleteCompanyDetails } from '../actions/companyaction';
import EditCompanyDetails from './editCompany';
import '../styles/companyCardStyles.css';

interface CompanyCardInterface {
  company: any;
}
const CompanyCard: React.FC<CompanyCardInterface> = ({ company }) => {
  if (!company.imageUrl) {
    company.imageUrl = randomCompanyImage();
  }
  const [opened, { close, open }] = useDisclosure(false);
  const [editOpened, setEditOpened] = useState(false);

  const dispatch = useDispatch();
  function deleteCompany() {
    // @ts-ignore
    dispatch(deleteCompanyDetails(company.id));
    close();
  }

  return (
    <Card
      className='w-full max-w-sm rounded overflow-hidden shadow-lg ms-2 mt-2 bg-slate-300 relative basis-[17rem] card'
      style={{
        height: '30rem',
        backgroundColor: '#e6e8e6',
      }}
    >
      <Card.Section>
        <Image
          src={company.imageUrl}
          className='w-full h-60 border-b-[3px] border-b-slate-300'
          alt='Company Image...'
        />
      </Card.Section>
      <Flex
        direction={'column'}
        justify={'flex-start'}
        align={'start'}
        className='min-w-full'
      >
        <p className='break-all text-center font-bold mx-auto w-full my-2 text-[18px]'>
          {company?.name ?? 'No Company name'}
        </p>
        <div className='text-start font-bold flex flex-row justify-start items-center gap-1 '>
          <span className='font-medium'>Website:</span>
          <Space w={2} />
          <p className='font-normal text-[15px] space-x-2 break-all '>
            {company.website && company.website.length > 0
              ? company.website
              : 'No website'}
          </p>
        </div>
        <Text
          fw={500}
          className='text-start font-bold flex flex-row justify-start items-center gap-1 '
        >
          Phone:
          <Space w={2} />
          <span className='font-normal text-[15px] space-x-2'>
            {company.phone && company.phone.length > 0
              ? company.phone
              : 'Phone No not available.'}
          </span>
        </Text>
        <Text
          fw={500}
          className='text-start font-bold flex flex-row justify-start items-center gap-1 '
        >
          Email:
          <Space w={2} />
          <span className='font-normal text-[15px] space-x-2'>
            {company.email && company.email.length > 0
              ? company.email
              : 'Email is not available.'}
          </span>
        </Text>

        <Flex
          justify={'flex-start'}
          direction={'row'}
          gap={'sm'}
          align={'center'}
          className='min-w-full font-semibold'
        >
          Parent:
          <span className='font-normal'>{company?.parent ?? 'No Parent'}</span>
        </Flex>
      </Flex>
      <div className='flex flex-row justify-start items-center gap-4 min-w-full absolute bottom-2'>
        <button
          className='bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded font-medium'
          onClick={() => {
            console.log('clicked');
            setEditOpened(true);
          }}
        >
          <FontAwesomeIcon icon={faEdit} /> Explore And Edit
        </button>
        <button
          className='bg-red-400 hover:bg-red-500  px-3 py-1 rounded mr-8 font-medium'
          onClick={open}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
      {opened && (
        <Modal opened={opened} onClose={close}>
          <Flex
            justify={'flex-start'}
            align={'start'}
            direction={'column'}
            gap={'sm'}
          >
            <p className='font-medium text-center'>
              {`Are you sure to delete this Company? This Action can't be undone.`}
            </p>
            <Flex
              justify={'flex-start'}
              align={'start'}
              direction={'row'}
              gap={'md'}
              className='font-medium'
            >
              <button
                type='button'
                className='px-3 py-1 rounded bg-inherit border-[1px] border-slate-800 '
                onClick={close}
              >
                Cancel
              </button>
              <button
                type='button'
                className='px-3 py-1 rounded bg-red-400 hover:bg-red-500 border-[1px] border-slate-800'
                onClick={deleteCompany}
              >
                Yes, Delete
              </button>
            </Flex>
          </Flex>
        </Modal>
      )}
      {editOpened && (
        <EditCompanyDetails
          company={company}
          onClose={() => setEditOpened(false)}
        />
      )}
    </Card>
  );
};
export default CompanyCard;
