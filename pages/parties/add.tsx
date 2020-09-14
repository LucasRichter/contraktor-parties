import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Contract } from '../../interfaces/contract';
import api from '../../services/api';
import Form from '../../components/parties/Form';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';

const Add = () => {
  const router = useRouter()
  const handleSubmit = useCallback(async (values: Part) => {
    await api.post(`parties`, values)
    router.push('/parties')
    alert('Success!')
  }, []);

  return (
    <Layout
      title='Add New Part'
    >
      <Form
        initialValues={{}}
        onSubmit={handleSubmit}
      />
    </Layout>
  )
}

export default Add
