import Head from "next/head"
import dynamic from 'next/dynamic';

const TransactionView = dynamic(() => import('@/views/transaction'), { ssr: false });

const TransactionPage = () => {
  return (
    <>
      <Head>
        <title>Transaction</title>
      </Head>

      <TransactionView />
    </>
  )
}

export default TransactionPage