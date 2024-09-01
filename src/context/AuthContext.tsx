import { createContext, ReactNode, useState } from 'react'

type ErrCallbackType = (err: { [key: string]: string }) => void

type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

type AuthValuesType = {
  loading: boolean
  setLoading: (value: boolean) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
  logout: () => void
}

const defaultProvider: AuthValuesType = {
  loading: true,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {

  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  // const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {

  // }

  const values = {
    loading,
    setLoading,
    // login: handleLogin,
    // logout: handleLogout,
  }

  // return (
  //   <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  // )
}

export { AuthContext }