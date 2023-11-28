import React from 'react';
import Layout from '@/components/Layout/Layout';
import SummedResult from '@/screens/summedResult';

const page = () => {
  return (
    <Layout>
      <main className='flex h-80 items-center justify-between pt-10'>
        <SummedResult />
      </main>
    </Layout>
  );
};

export default page;
