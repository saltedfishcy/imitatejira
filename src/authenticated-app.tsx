import React from 'react'
import { ProjectListScreen } from './screens/projectlist'
import { useAuth } from './context/auth.context'
import styled from "@emotion/styled";
import { Row } from './components/lib'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  
  return(
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
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
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-auto-columns: 20rem 1fr 20rem;
  grid-template-areas: 
  "header header header"
  "nav main aside"
  "footer footer footer"
  ;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  
`;
const HeaderLeft = styled(Row)`

`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;