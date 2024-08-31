import Head from "next/head"
import dynamic from 'next/dynamic';

const TopUpView = dynamic(() => import('@/views/top-up'), { ssr: false });

const TopUpPage = () => {
  return (
    <>
      <Head>
        <title>Top Up</title>
      </Head>

      <TopUpView />
    </>
  )
}

export default TopUpPage