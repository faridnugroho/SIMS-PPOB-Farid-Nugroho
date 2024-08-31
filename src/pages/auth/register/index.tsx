import Head from "next/head"
import dynamic from 'next/dynamic';

const RegisterView = dynamic(() => import('@/views/auth/register'), { ssr: false });

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <RegisterView />
    </>
  )
}

export default RegisterPage