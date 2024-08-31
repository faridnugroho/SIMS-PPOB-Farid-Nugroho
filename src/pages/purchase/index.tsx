import Head from "next/head"
import dynamic from 'next/dynamic';

const PurchaseView = dynamic(() => import('@/views/purchase'), { ssr: false });

const PurchasePage = () => {
  return (
    <>
      <Head>
        <title>Purchase</title>
      </Head>

      <PurchaseView />
    </>
  )
}

export default PurchasePage