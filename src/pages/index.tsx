import Head from "next/head"
import dynamic from 'next/dynamic';

const HomeView = dynamic(() => import('@/views/home'), { ssr: false });

const HomePage = () => {
  return (
    <>
      <Head>
        <title>SIMS PPOB-Farid Nugroho</title>
      </Head>

      <HomeView />
    </>
  );
}

export default HomePage