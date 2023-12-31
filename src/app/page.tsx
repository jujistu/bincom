import Layout from '@/components/Layout/Layout';
import IndividualPolling from '@/screens/IndividualPolling';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <main className='flex h-80 items-center justify-between pt-10'>
        <IndividualPolling />
      </main>
    </Layout>
  );
}
