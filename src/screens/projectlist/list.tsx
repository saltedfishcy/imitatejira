import React from 'react'
import { User } from './searchpanel'
import { Table } from 'antd'
import dayjs from 'dayjs';

interface projectProps {
  id: string,
  name: string,
  personId: string,
  pin: boolean,
  organization: string,
  created: number
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
      title: '部门',
      dataIndex: 'organization'
    },
    {
      title: '负责人',
      render(value, row) {
        return <span>{users.find(user => user.id === row.personId)?.name || '未知'}</span>
      }
    },
    {
      title: '创建时间',
      render(value, project) {
        return <span>
          { project.created && dayjs(project.created).format('YYYY-MM-DD')}
        </span>
      }
    }

  ]
  return <Table pagination={false} columns={columns} dataSource={list} rowKey={(record => record.id)} />
}