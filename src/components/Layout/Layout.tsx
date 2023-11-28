'use client';
import React from 'react';
import Headers from './Headers';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`bg-white flex flex-col h-full`}>
      <Headers />

      <main className='flex-grow flex flex-col justify-center items-center -mb-8'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
