'use client';

import { getLga, getStates, getSummedResult } from '@/Helpers';
import React, { useEffect, useState } from 'react';

const SummedResult = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [states, setStates] = useState<any>([]);
  const [lgas, setLgas] = useState<any>([]);
  const [summedResult, setSummedResult] = useState<any>([]);

  console.log(summedResult);

  // Set initial states
  useEffect(() => {
    getStates(setStates);
  }, []);

  useEffect(() => {
    getSummedResult(setSummedResult, selectedLGA);
  }, [selectedLGA]);

  const handleStateChange = (event: any) => {
    getLga(setLgas);
    const selectedStateId = event.target.value;
    // Use the selected state id to filter and get the corresponding LGAs
    const filteredLgas = lgas.filter(
      (lga: any) => lga.state_id === parseInt(selectedStateId)
    );
    setLgas(filteredLgas);
    setSelectedState(selectedStateId);
  };

  return (
    <div className='flex flex-col m-6 w-full p-2.5 gap-4'>
      <h2 className='mb-10 mt-10 text-3xl font-bold'>
        View Summed Result according to LGA
      </h2>
      <div className='mb-10'>
        <div className='flex-row space-x-10'>
          <label className=''>
            Select State:
            <select value={selectedState} onChange={handleStateChange}>
              <option value=''>Select</option>
              {states.map((state: any) => (
                <option key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Select LGA:
            <select
              value={selectedLGA}
              onChange={(e) => setSelectedLGA(e.target.value)}
            >
              <option value=''>Select</option>
              {lgas.map((lga: any) => (
                <option key={lga.uniqueid} value={lga.lga_id}>
                  {lga.lga_name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className='flex mt-10 w-[60rem] flex-row'>
        {summedResult &&
          summedResult.map((summed: any) => (
            <div key={summed.party_abbreviation} className='flex-row p-6'>
              <table className='table-auto w-full'>
                <thead>
                  <tr>
                    <th className='px-4 py-2'>{summed.party_abbreviation}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border px-4 py-2'>{summed.total_score}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SummedResult;
