import React, { ReactNode, useState } from 'react';
import { User } from '../screens/projectlist/searchpanel'
import * as auth from '../auth-provider';
import { http } from '../utils/http';
import { useMount } from '../utils';

interface AuthForm {
  username: string,
  password: string
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if(token) {
    const data = await http('me', {token})
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<{
  user: User | null,
  register: (form: AuthForm) => Promise<void>,
  login: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>,
} | undefined>(undefined);
AuthContext.displayName = 'AuthContext'; 

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser)
  })
  // 为什么需要 children的类型？因为标签里面的子组件就相当于父节点加了 children属性，属性内容就是子节点
  return <AuthContext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if(!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}

