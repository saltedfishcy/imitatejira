import React from 'react'
import { SearchPanel } from './searchpanel';
import { List } from './list';
import { useEffect, useState} from 'react';
import { cleanObject, useMount, useDebounce } from '../../utils';
import * as qs from 'qs';
import { Test } from './test';
import { useHttp } from '../../utils/http';
import styled from '@emotion/styled';

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 2000)

  const [list, setList] = useState([])
  const client = useHttp()

  useEffect(()=> {
    client('projects', {data: cleanObject(debouncedParam)}).then(setList)
  }, [debouncedParam])

  useMount(()=> {
    client('users').then(setUsers)
  })

  return <Container>
    <h1>项目列表</h1>
    {/* <Test /> */}
    <SearchPanel users={users} param={param} setParam={setParam} ></SearchPanel>
    <List users={users} list={list}></List>
  </Container>
}

const Container = styled.div`
padding: 3.2rem
`
