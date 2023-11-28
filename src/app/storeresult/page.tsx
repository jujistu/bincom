import Layout from '@/components/Layout/Layout';
import StoreResult from '@/screens/StoreResult';
import React from 'react';

const page = () => {
  return (
    <Layout>
      <main className='flex h-80 items-center justify-between pt-10'>
        <StoreResult />
      </main>
    </Layout>
  );
};

export default page;
