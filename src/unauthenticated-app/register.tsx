import React, { FormEvent } from 'react';
import * as qs from 'qs';
import { cleanObject, useMount, useDebounce } from '../utils';
import { useAuth } from '../context/auth.context'
import {Form, Input, Button} from 'antd';
import { LongButton } from './index'
import { useAsync } from '../utils/use-async';

const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = ({onError}:{onError:(error: Error)=> void}) => {

  const { register, user } = useAuth();
  const { run, isLoading } = useAsync();

  const handleSubmit = ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
    if(cpassword!==values.password) {
      onError(new Error('请确认2次密码相同'))
      return
    }
    run(register(values).catch((e) => {
      onError(e)
    }))
    
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
    <Form.Item name={'cpassword'} rules={[
      {required: true, message: '请确认密码'}
    ]}>
      <Input type="cpassword" placeholder='确认密码' />
    </Form.Item>
    <Form.Item>
      <LongButton type={'primary'} htmlType="submit">注册</LongButton>
    </Form.Item>
  </Form>
}