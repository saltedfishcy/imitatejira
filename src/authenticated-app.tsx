import React from 'react';
import { ProjectListScreen } from './screens/projectlist';
import { useAuth } from './context/auth.context';
import styled from "@emotion/styled";
import { Row } from './components/lib';
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg';
import { Dropdown, Menu, Button } from 'antd';

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  
  return(
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
          <h3 style={{marginTop: '7px', marginLeft: '10px'}} >项目</h3>
          <h3 style={{marginTop: '7px', marginLeft: '10px'}} >用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type={'link'} onClick={logout}>登出</Button>
              </Menu.Item>
            </Menu>
          }>
            <Button type={'link'} onClick={e => e.preventDefault()}>Hi,{user?.name}</Button>
          </Dropdown> 
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
    </Container>)
}

const HeaderItem = styled.h3`
margin-right: 3rem;
`
const PageHeader = styled.header`
height: 6rem;
`
// temporal dead zone(暂时性死区)
const Container = styled.div`
  align-items: center;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
justify-content: space-between;
padding: 3.2rem;
box-shadow: 0 0 5px rgba(0,0,0,0.1);
z-index: 1;
`;
const HeaderLeft = styled(Row)`

`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;