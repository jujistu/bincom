'use client';

import { postResults } from '@/Helpers';
import React, { useState } from 'react';

const StoreResult = () => {
  const [pollingUnitId, setPollingUnitId] = useState('');
  const [results, setResults] = useState<{ [key: string]: string }>({});
  const [enteredBy, setEnteredBy] = useState('');

  const array = Object.entries(results);
  console.log(array);

  const extractedData = array.map(([key, value]) => ({ key, value }));
  console.log(extractedData);

  const handleResultChange = (party: string, score: any) => {
    setResults({ ...results, [party]: score });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(results, pollingUnitId, enteredBy);

    postResults(array, pollingUnitId, enteredBy);

    // try {
    //   await axios.post('http://localhost:3000/storeResults', {
    //     pollingUnitId,
    //     results,
    //   });
    //   // Handle success
    //   console.log('Results stored successfully');
    // } catch (error) {
    //   // Handle error
    //   console.error('Error storing results:', error.message);
    // }
  };

  return (
    <div className='flex h-screen mt-[30rem]'>
      <label className='text-xl m-3 mb-5'>
        Polling Unit ID:
        <input
          className='bg-neutral-50 px-2.5 py-3 ml-2'
          type='text'
          value={pollingUnitId}
          onChange={(e) => setPollingUnitId(e.target.value)}
        />
      </label>
      <div className='flex flex-col w-full'>
        {/* Create input fields for each party */}
        <label className='text-xl m-3'>
          PDP:
          <input
            value={results['PDP']}
            className='bg-neutral-50 px-2.5 py-3 ml-2.5'
            type='text'
            onChange={(e) => handleResultChange('PDP', e.target.value)}
          />
        </label>
        <label className='text-xl m-3'>
          DPP:
          <input
            value={results['DPP']}
            className='bg-neutral-50 px-2.5 py-3 ml-2.5'
            type='text'
            onChange={(e) => handleResultChange('DPP', e.target.value)}
          />
        </label>
        <label className='text-xl m-3'>
          ACN:
          <input
            value={results['ACN']}
            className='bg-neutral-50 px-2.5 py-3 ml-2.5'
            type='text'
            onChange={(e) => handleResultChange('ACN', e.target.value)}
          />
        </label>
        <label className='text-xl m-3'>
          PPA:
          <input
            value={results['PPA']}
            className='bg-neutral-50 px-2.5 py-3 ml-2.5'
            type='text'
            onChange={(e) => handleResultChange('PPA', e.target.value)}
          />
        </label>
        <label className='text-xl m-3'>
          CDC:
          <input
            value={results['CDC']}
            className='bg-neutral-50 px-2.5 py-3 ml-2.5'
            type='text'
            onChange={(e) => handleResultChange('CDC', e.target.value)}
          />
        </label>
        <label className='text-xl m-3'>
          JP:
          <input
            value={results['JP']}
            className='bg-neutral-50 px-2.5 py-3 ml-2.5'
            type='text'
            onChange={(e) => handleResultChange('JP', e.target.value)}
          />
        </label>
        <label className='text-xl m-3'>
          ANPP:
          <input
            value={results['ANPP']}
            className='bg-neutral-50 px-2.5 py-3 ml-2.5'
            type='text'
            onChange={(e) => handleResultChange('ANPP', e.target.value)}
          />
        </label>
        <label className='text-xl m-3'>
          LABOUR:
          <input
            value={results['LABOUR']}
            className='bg-neutral-50 px-2.5 py-3 ml-2.5'
            type='text'
            onChange={(e) => handleResultChange('LABOUR', e.target.value)}
          />
        </label>{' '}
        <label className='text-xl m-3 mb-4'>
          CPP:
          <input
            value={results['CPP']}
            className='bg-neutral-50 px-2.5 py-3 ml-2.5'
            type='text'
            onChange={(e) => handleResultChange('CPP', e.target.value)}
          />
        </label>
        <div className='flex justify-between items-center mt-4 p-3 -ml-10'>
          <label className='text-xl m-3 mb-4'>
            Entered By:
            <input
              value={enteredBy}
              type='text'
              className='bg-neutral-50 px-2.5 py-3 ml-2.5'
              onChange={(e) => setEnteredBy(e.target.value)}
            />
          </label>
          {/* Repeat for other parties */}
          <button
            className='bg-black text-white py-3 px-5 rounded-full tracking-wide'
            onClick={handleSubmit}
          >
            Submit Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreResult;
