import { GetStaticProps } from 'next'
import { Table, Button } from 'antd'

import { Contract } from '../../interfaces/contract'
import Layout from '../../components/Layout'
import useFetch from '../../hooks/useFetch'
import { useRouter } from 'next/router'
import api from '../../services/api'
import Link from 'next/link'

type Props = {
  items: Contract[]
}

const ContractList = ({ items }: Props) => {
  const router = useRouter()
  const { data } = useFetch<Contract[]>('/contracts')

  return (
    <Layout title="Contract List">
      <Link href='/contracts/add'>
        <Button>
          Add a contract
        </Button>
      </Link>
      <Table
        columns={[
          {
            dataIndex: 'title',
            title: 'Title'
          },
          {
            dataIndex: 'start_at',
            title: 'Start At',
            type: 'date'
          },
          {
            dataIndex: 'due_at',
            title: 'Due At',
            type: 'date'
          },
          {
            title: 'Operations',
            dataIndex: 'operation',
            render: (_: any, record: Contract) => {
              return (
                <span>
                  <Link
                    href={`/contracts/[id]`}
                    as={`/contracts/${record.id}`}
                  >
                    View
                  </Link>
                  |
                  <Link
                    href={`/contracts/edit/[id]`}
                    as={`/contracts/edit/${record.id}`}
                  >
                    Edit
                  </Link>
                  |
                  <a onClick={async () => {
                    const results = confirm("You want to delete " + record.title)
                    if (results === true) {
                      await api.delete(`contracts/${record.id}`)
                      alert(`${record.title} was deleted.`)
                    }
                  }}>
                    Delete
                  </a>
                </span>
              )
            }
          }
        ]}
        dataSource={data || []}
      />
  </Layout>
  )
}

export default ContractList
