import { PageHeader, Tag, Button, Descriptions } from 'antd';
import useFetch from '../../hooks/useFetch';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Contract } from '../../interfaces/contract';
import { Part } from '../../interfaces/part';
import Link from 'next/link';

const Details = () => {
  const { query, push } = useRouter()
  const { data } = useFetch<Contract>(`/contracts/${query.id}`)
  const { data: parties } = useFetch<Part[]>(`/contracts/${query.id}/parties`)
  if (!data || !parties) return <div>Loading...</div>
  return (
    <Layout title={`${data.title}`}>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={data.title}
        subTitle={data.last_name}
        extra={[
          <Link key="1" href='/contracts/[id]' as={`/contracts/${data.id}`} >
            <Button type="primary" key="1">Edit</Button>
          </Link>,
          <Button
            key="2"
            onClick={async () => {
              const results = confirm("You want to delete " + data.title)
              if (results === true) {
                await api.delete(`contracts/${data.id}`)
                alert(`${data.title} was deleted.`)
                push('/parties')
              }
            }}
          >
            Delete
          </Button>,
        ]}
      >
        <Descriptions size="small" column={2}>
          <Descriptions.Item label="Start At">{data.start_at}</Descriptions.Item>
          <Descriptions.Item label="Due At">{data.due_at}</Descriptions.Item>
          <Descriptions.Item label="File URL">
            <a href={data.file_url} target="_blank">
              Link
            </a>
          </Descriptions.Item>
          <Descriptions.Item label='Parties'>
          {parties.map((part: Part) => (
              <Tag key={part.id}>
                <Link href='/parties/[id]' as={`/parties/${part.id}`} >
                  <span>
                    {part.first_name} {part.last_name}
                  </span>
                </Link>
              </Tag>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </Layout>
  )
}

export default Details
