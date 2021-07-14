import React from 'react'
import { User } from './searchpanel'
import { Table } from 'antd'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'
import { TableProps } from 'antd/es/table'

export interface projectProps {
  id: string,
  name: string,
  personId: string,
  pin: boolean,
  organization: string,
  created: number,
}
interface ListProps extends TableProps<projectProps> {
  users: User[],
}

export const List = ({users, ...props}: ListProps) => {
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      // sorter: (a,b) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={String(project.id)} >{project.name}</Link>
      }
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
  return <Table  pagination={false} columns={columns}  rowKey={(record => record.id)} {...props}/>
}