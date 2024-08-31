import Head from "next/head"
import dynamic from 'next/dynamic';

const AccountView = dynamic(() => import('@/views/account'), { ssr: false });

const AccountPage = () => {
  return (
    <>
      <Head>
        <title>Account</title>
      </Head>

      <AccountView />
    </>
  )
}

export default AccountPage