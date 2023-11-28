import React from 'react';
import Link from 'next/link';

const Headers = () => {
  return (
    <header className='flex items-center w-full bg-neutral-100 justify-between h-16 px-6 border-b'>
      <Link className='flex items-center gap-2 font-semibold' href='/'>
        <span>Election Results</span>
      </Link>
      <nav className='flex items-center gap-4'>
        <Link className='text-black hover:text-gray-500 ' href='/'>
          Individual polling Unit
        </Link>
        <Link className='text-black  hover:text-gray-500 ' href='/summedpage'>
          Summed total
        </Link>
        <Link className='text-black  hover:text-zinc-900 ' href='/storeresult'>
          Store Result
        </Link>
      </nav>
    </header>
  );
};

export default Headers;
