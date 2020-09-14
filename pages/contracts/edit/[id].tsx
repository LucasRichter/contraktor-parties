import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Contract } from '../../../interfaces/contract';
import api from '../../../services/api';
import Form from '../../../components/contracts/Form';
import Layout from '../../../components/Layout';
import useFetch from '../../../hooks/useFetch';
import { useRouter } from 'next/router';

const Edit = () => {
  const { query } = useRouter()
  const { data } = useFetch<Contract>(`contracts/${query.id}`)
  const handleSubmit = useCallback((values: Contract) => {
    api.put(`contracts/${query.id}`, values)
    alert(`${values.title} was edited.`)
  }, []);

  if (!data) return <div>Loading...</div>

  return (
    <Layout
      title='Edit Contract'
    >
      {!data
        ? <div>Loading...</div>
        : <Form initialValues={data} onSubmit={handleSubmit} />
      }
    </Layout>
  )
}

export default Edit
