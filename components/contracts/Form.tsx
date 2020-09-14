import * as React from 'react'
import { Formik } from "formik"
import { Contract } from "../../interfaces/contract"
import { Button } from '@material-ui/core'
import useFetch from '../../hooks/useFetch'
import { Part } from '../../interfaces/part'
import Autocomplete from '../Autocomplete'
import { Form as FormAntd, Input, SubmitButton, DatePicker, Select, FormItem } from 'formik-antd'
import { Space } from 'antd'
import * as Yup from 'yup'

const { Option } = Select;
const contractSchemaValidation = Yup.object({
  title: Yup.string().required(),
  start_at: Yup.date().required(),
  due_at: Yup.date().required(),
  file_url: Yup.string().required(),
  parties_id: Yup.array().min(1).of(Yup.number()).required()
})

type Props = {
  initialValues?: Contract,
  onSubmit(values : Contract): Contract
}

const Form = ({ initialValues, onSubmit }: Props) => {
  const { data } = useFetch<Part[]>('parties')
  return (
    <Formik {...{ initialValues, validationSchema: contractSchemaValidation, onSubmit }}>
      <FormAntd
        className="baseForm"
      >
        <Space direction="vertical">
          <FormItem
            name="title"
            label="Title"
            required
          >
            <Input
              id="title"
              name="title"
            />
          </FormItem>
          <FormItem
            required
            name='start_at'
            label='Start At'
          >
            <DatePicker
              id="start_at"
              name="start_at"
            />
          </FormItem>
          <FormItem
            required
            label='Due At'
            name='due_at'
          >
            <DatePicker
              id="due_at"
              name="due_at"
            />
          </FormItem>
          <FormItem
            required
            label='File URL'
            name="file_url"
          >
            <Input
              id="file_url"
              name="file_url"
            />
          </FormItem>
          <FormItem
            required
            label='Parties'
            name='parties_id'
          >
            <Select
              mode="multiple"
              name='parties_id'
              id='parties_id'
            >
              {data?.map((part: Part) => (
                <Option
                  key={part.id}
                  value={part.id}
                >
                  {part.first_name} {part.last_name}
                </Option>
              ))}
            </Select>
          </FormItem>
          <SubmitButton>
            Save
          </SubmitButton>
        </Space>
      </FormAntd>
    </Formik>
  );
}

export default Form
