import { Button, Modal, TextInput, ScrollArea } from '@mantine/core';
import React from 'react';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { editCompanyDetails } from '../actions/companyaction';

interface EditCompanyDetailsProps {
  company: any;
  onClose: () => void;
}
interface FormValues {
  name?: string;
  website?: number | string;
  phone?: string;
  email?: string;
  parent?: string;
  city?: string;
  countryName?: string;
}
const EditCompanyDetails: React.FC<EditCompanyDetailsProps> = ({
  company,
  onClose,
}) => {
  const dispatch = useDispatch();
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: company?.name ?? '',
      countryName: company?.countryName ?? '',
      city: company?.city ?? '',
      website: company?.website ?? '',
      phone: company?.phone ?? '',
      email: company?.email ?? '',
      parent: company?.parent ?? '',
    },
    validate: {
      name: isNotEmpty('CompanyName is a required field.'),
      city: isNotEmpty('City is a mendatory field'),
      countryName: isNotEmpty('Country Name is a mandatory field'),
      email: (value) => {
        if (!value) return null;
        return /^\S+@\S+$/.test(value) ? null : 'Invalid email';
      },
    },
  });

  const editCompanyHandler = (values: typeof form.values) => {
    // @ts-ignore
    dispatch(editCompanyDetails(company.id, values)); 
    onClose(); // Close the modal after submission
  };

  return (
    <Modal
      onClose={onClose}
      opened={true}
      title='Edit Company Details'
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <form
        onSubmit={form.onSubmit(editCompanyHandler)}
        className='flex flex-col justify-start items-start gap-2 bg-slate-100  min-w-full p-3 max-h-[50%]'
      >
        <TextInput
          {...form.getInputProps('name')}
          key={form.key('name')}
          label='Name'
          placeholder={`Enter Your Company's Name Here...`}
          className='min-w-full'
          withAsterisk
        />
        <TextInput
          {...form.getInputProps('city')}
          key={form.key('city')}
          label='City'
          placeholder={`Google, Microsoft etc.`}
          className='min-w-full'
          withAsterisk
        />
        <TextInput
          {...form.getInputProps('countryName')}
          key={form.key('countryName')}
          label='CountryName'
          placeholder={`India, USA, Russia etc.`}
          className='min-w-full'
          withAsterisk
        />
        <TextInput
          {...form.getInputProps('website')}
          key={form.key('website')}
          label='Website'
          placeholder={`www.google.com`}
          className='min-w-full'
        />
        <TextInput
          {...form.getInputProps('email')}
          key={form.key('email')}
          label='Email'
          placeholder={`abc@gamil.com`}
          className='min-w-full'
        />
        <TextInput
          {...form.getInputProps('phone')}
          key={form.key('phone')}
          label='Phone Number'
          placeholder={`+91 1234567890`}
          className='min-w-full'
        />
        <TextInput
          {...form.getInputProps('parent')}
          key={form.key('parent')}
          label='Parent Company'
          placeholder={`Alphabet, Emkay Global etc`}
          className='min-w-full'
        />
        <Button className='mt-2' type='submit'>
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};

export default EditCompanyDetails;
