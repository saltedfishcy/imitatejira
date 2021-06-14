import React, { FormEvent } from 'react';
import * as qs from 'qs';
import { cleanObject, useMount, useDebounce } from '../utils';
import { useAuth } from '../context/auth.context'
import {Form, Input, Button} from 'antd';
import { LongButton } from './index'
import { useAsync } from '../utils/use-async';
const apiUrl = process.env.REACT_APP_API_URL;


export const LoginScreen = ({onError}:{onError:(error: Error)=> void}) => {

  const { login, user } = useAuth();
  const { run, isLoading } = useAsync();


  const handleSubmit = (values: {username: string, password: string}) => {
    run(login(values).catch((e) => {
      onError(e)
    }))
  }
  return <Form onFinish={handleSubmit}>
    {
      user? <div>
        登录成功，用户名：{user?.name}
      </div> : null
    }
    
    <Form.Item name={'username'} rules={[
      {required: true, message: '请输入用户名'}
    ]}>
      <Input type="text"  placeholder='用户名' />
    </Form.Item>
    <Form.Item name={'password'} rules={[
      {required: true, message: '请输入密码'}
    ]}>
      <Input type="password" placeholder='密码' />
    </Form.Item>
    <Form.Item>
      <LongButton loading={isLoading} type={'primary'} htmlType="submit">登录</LongButton>
    </Form.Item>
  </Form>
}