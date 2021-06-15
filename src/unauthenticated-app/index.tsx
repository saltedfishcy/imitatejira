import React,{ useState } from "react";
import { RegisterScreen } from './register'
import { LoginScreen } from './login'
import { Card, Divider, Button, Typography } from 'antd'
import styled from '@emotion/styled'
import logo from '../assets/logo.svg'
import left from '../assets/left.svg'
import right from '../assets/right.svg'
import { useDocument } from '../utils'



export const UnauthenticatedApp = () => {
  const [isRegister, setIsregister] = useState(false);
  const [errors,setError] = useState<Error | null>(null);

  useDocument('请登录/注册')

  return <Container>
    <Header />
    <Background />
    <Button 
      onClick={()=> {throw new Error('咩屎')}}
    >抛出异常</Button>
    <ShadowCard>
      <Title>{isRegister ? "请注册" : "请登录"}</Title>
      {
        errors? <Typography.Text type={"danger"}>{errors.message}</Typography.Text>:null
      }
      {
        isRegister ? <RegisterScreen onError={setError}></RegisterScreen>: <LoginScreen onError={setError}></LoginScreen>
      }
      <Divider />
      <Button type={'link'} onClick={() => setIsregister(!isRegister)} >切换到{isRegister? '已经有账号了？直接登录': '没有账号，注册新账号'}</Button>
    </ShadowCard>
    
  </Container>
}

const ShadowCard = styled(Card)`
width: 40rem;
min-height: 56rem;
padding: 3.2rem 4rem;
border-radius: 0.3rem;
box-sizing: border-box;
box-shadow: rgba(0,0,0,0.1) 0 0 10px;
text-align: center;
`
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;
`

const Header = styled.header`
background: url(${logo}) no-repeat center;
padding: 5rem 0;
background-size: 8rem;
width: 100%;
`

const Background = styled.div`
position: absolute;
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-attachment: fixed;
background-position: left bottom, right bottom;
background-size: calc(((100vw - 40vw)/2)-3.2rem), calc(((100vw - 40vw)/2)-3.2rem), cover;
background-image: url(${left}), url(${right});
`
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;