import { PageHeader, Button, Descriptions } from 'antd';
import useFetch from '../../hooks/useFetch';
import { formatCPF } from '@brazilian-utils/brazilian-utils';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';

const Details = () => {
  const { query, push } = useRouter()
  const { data } = useFetch<Part>(`parties/${query.id}`)
  if (!data) return <div>Loading...</div>
  return (
    <Layout title={`${data.first_name} ${data.last_name}`}>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={data.first_name}
        subTitle={data.last_name}
        extra={[
          <Link key="1" href='/parties/[id]' as={`/parties/${data.id}`} >
            <Button type="primary" key="1">Edit</Button>
          </Link>,
          <Button
            key="2"
            onClick={async () => {
              const results = confirm("You want to delete " + data.first_name)
              if (results === true) {
                await api.delete(`parties/${data.id}`)
                alert(`${data.first_name} was deleted.`)
                push('/parties')
              }
            }}
          >
            Delete
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="First Name">{data.first_name}</Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {data.last_name}
          </Descriptions.Item>
          <Descriptions.Item label="CPF">{formatCPF(data.cpf)}</Descriptions.Item>
          <Descriptions.Item label="Telephone">{data.telephone}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </Layout>
  )
}

export default Details
