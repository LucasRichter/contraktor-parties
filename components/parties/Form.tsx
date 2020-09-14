import * as React from 'react'
import { Formik } from "formik"
import { Form as FormAntd, Input, SubmitButton, FormItem } from 'formik-antd'
import { Space } from 'antd'
import { isValidCPF, isValidMobilePhone } from '@brazilian-utils/brazilian-utils';
import * as Yup from 'yup'
import { Part } from "../../interfaces/part"

import MyInputMask from '../InputMask'

type Props = {
  initialValues?: Part,
  onSubmit(values : Part): Part
}

const partSchema = Yup.object({
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
  cpf: Yup
      .string()
    .test('cpf', 'CPF is invalid.', isValidCPF)
    .max(11)
    .required(),
  telephone: Yup
    .string()
    .max(11)
    .test('telephone', 'Telephone is invalid.', isValidMobilePhone).required()
})

const Form = ({ initialValues, onSubmit }: Props) => {
  return (
    <Formik {...{ initialValues, validationSchema: partSchema, onSubmit }}>
      <FormAntd
        className="baseForm"
      >
        <Space
          direction="vertical"
          size='large'
          style={{ width: '100%' }}
        >
          <FormItem
            label='First name'
            id="first_name"
            name="first_name"
            required
          >
            <Input
              name="first_name"
            />
          </FormItem>

          <FormItem
            label='Last name'
            id="last_name"
            name="last_name"
            required
          >
            <Input
              name="last_name"
            />
          </FormItem>
          <FormItem
            name="cpf"
            label="CPF"
            required
          >
            <MyInputMask
              mask="999.999.999-99"
              name="cpf"
            />
          </FormItem>
          <FormItem
            name="telephone"
            label="Telephone"
            required
          >
            <MyInputMask
              mask="(99) 99999-9999"
              name="telephone"
            />
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
