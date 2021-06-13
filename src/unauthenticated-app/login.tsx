import React, { FormEvent } from 'react';
import * as qs from 'qs';
import { cleanObject, useMount, useDebounce } from '../utils';
import { useAuth } from '../context/auth.context'
import {Form, Input, Button} from 'antd';
import { LongButton } from './index'
const apiUrl = process.env.REACT_APP_API_URL;


export const LoginScreen = () => {

  const { login, user } = useAuth();


  const handleSubmit = (values: {username: string, password: string}) => {
    login(values)
    console.log(111)
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
      <LongButton type={'primary'} htmlType="submit">登录</LongButton>
    </Form.Item>
  </Form>
}