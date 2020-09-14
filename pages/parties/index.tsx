import { Table, Button } from 'antd'
import Link from 'next/link'

import { Part } from '../../interfaces/part'
import Layout from '../../components/Layout'
import useFetch from '../../hooks/useFetch'
import api from '../../services/api'

const ContractList = () => {
  const { data } = useFetch<Part[]>('/parties')

  return (
    <Layout title="Parties List">
      <Link href='/parties/add'>
        <Button>
          Add a part
        </Button>
      </Link>
      <Table
        columns={[
          {
            dataIndex: 'first_name',
            title: 'First Name'
          },
          {
            dataIndex: 'last_name',
            title: 'Last Name'
          },
          {
            dataIndex: 'cpf',
            title: 'CPF'
          },
          {
            dataIndex: 'telephone',
            title: 'Telephone'
          },
          {
            title: 'Operations',
            dataIndex: 'operation',
            render: (_: any, record: Contract) => {
              return (
                <span>
                  <Link
                    href={`/parties/[id]`}
                    as={`/parties/${record.id}`}
                  >
                    View
                  </Link>
                  |
                  <Link
                    href={`/parties/edit/[id]`}
                    as={`/parties/edit/${record.id}`}
                  >
                    Edit
                  </Link>
                  |
                  <a onClick={async () => {
                    const results = confirm("You want to delete " + record.first_name)
                    if (results === true) {
                      await api.delete(`parties/${record.id}`)
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
