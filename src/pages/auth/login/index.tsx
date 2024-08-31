import Head from "next/head"
import dynamic from 'next/dynamic';

const LoginView = dynamic(() => import('@/views/auth/login'), { ssr: false });

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <LoginView />
    </>
  )
}

export default LoginPage