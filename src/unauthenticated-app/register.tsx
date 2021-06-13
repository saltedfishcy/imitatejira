import React, { FormEvent } from 'react';
import * as qs from 'qs';
import { cleanObject, useMount, useDebounce } from '../utils';
import { useAuth } from '../context/auth.context'
import {Form, Input, Button} from 'antd';
import { LongButton } from './index'
const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {

  const { register, user } = useAuth();

  const handleSubmit = (values: {username: string, password: string}) => {
    register(values)
  }
  return <Form onFinish={handleSubmit}>
    
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
      <LongButton type={'primary'} htmlType="submit">注册</LongButton>
    </Form.Item>
  </Form>
}