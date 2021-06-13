import React from 'react'
import { User } from './searchpanel'
import { Table } from 'antd'
interface projectProps {
  id: string,
  name: string,
  personId: string,
  pin: boolean,
  organization: string
}
interface ListProps {
  list: projectProps[],
  users: User[]
}

export const List = ({users, list}: ListProps) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '负责人',
      render(value, row) {
        return <span>{users.find(user => user.id === row.personId)?.name || '未知'}</span>
      }
    }
  ]
  return <Table pagination={false} columns={columns} dataSource={list}/>
}