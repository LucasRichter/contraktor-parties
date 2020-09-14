import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Part } from '../../../interfaces/part';
import api from '../../../services/api';
import Form from '../../../components/parties/Form';
import Layout from '../../../components/Layout';
import useFetch from '../../../hooks/useFetch';
import { useRouter } from 'next/router';

const Edit = () => {
  const { query } = useRouter()
  const { data } = useFetch<Part>(`parties/${query.id}`)
  const handleSubmit = useCallback((values: Part) => {
    api.put(`parties/${query.id}`, values)
    alert(`${values.title} was edited.`)
  }, []);

  if (!data) return <div>Loading...</div>

  return (
    <Layout
      title='Edit Part'
    >
      {!data
        ? <div>Loading...</div>
        : <Form initialValues={data} onSubmit={handleSubmit} />
      }
    </Layout>
  )
}

export default Edit
