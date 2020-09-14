import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Contract } from '../../interfaces/contract';
import api from '../../services/api';
import Form from '../../components/contracts/Form';
import Layout from '../../components/Layout';
import { useRouter, Router } from 'next/router';

const Add = () => {
  const router = useRouter()
  const handleSubmit = useCallback(async (values: Contract) => {
    await api.post(`contracts`, values)
    router.push('/contracts')
    alert('Success!')
  }, []);

  return (
    <Layout
      title='Add New Contract'
    >
      <Form
        onSubmit={handleSubmit}
        initialValues={{}}
      />
    </Layout>
  )
}

export default Add
