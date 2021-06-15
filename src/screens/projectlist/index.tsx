import React from 'react'
import { SearchPanel } from './searchpanel';
import { List } from './list';
import { useEffect, useState} from 'react';
import { cleanObject, useMount, useDebounce, useDocument } from '../../utils';
import * as qs from 'qs';
import { Test } from './test';
import { useHttp } from '../../utils/http';
import styled from '@emotion/styled';
import {Select, Typography} from 'antd'
import { useAsync } from '../../utils/use-async';
import {projectProps} from './list';
import {useProjects} from '../../utils/project'
import {useUsers} from '../../utils/user'
const { Option } = Select;

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocument('项目列表', false)
  // const [users, setUsers] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 2000)

  // const client = useHttp()
  const { isLoading, error, data:list } = useProjects(debouncedParam)
  const {data: users} = useUsers()

  // useMount(()=> {
  //   client('users').then(setUsers)
  // })

  return <Container>
    <h1>项目列表</h1>
    {/* <Test /> */}
    <SearchPanel users={users || []} param={param} setParam={setParam} ></SearchPanel>
    {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
    <List loading={isLoading} users={users || []} dataSource={list || []}></List>
  </Container>
}

const Container = styled.div`
padding: 3.2rem
`
