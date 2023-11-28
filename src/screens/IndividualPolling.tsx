'use client';

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
  getIndividualResult,
  getLga,
  getPollingUnit,
  getStates,
} from '@/Helpers';

const IndividualPolling = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [states, setStates] = useState<any>([]);
  const [lgas, setLgas] = useState<any>([]);
  const [pollingUnits, setPollingUnits] = useState<any>([]);
  const [selectedPollingUnit, setSelectedPollingUnit] = useState<any>();
  const [IndividualResult, setIndividualResult] = useState<any>([]);
  const [originalPollingUnits, setOriginalPollingUnits] = useState<any>([]);

  // Set initial states
  useEffect(() => {
    getPollingUnit((data) => {
      setPollingUnits(data);
    });
    getStates(setStates);
  }, []);

  useEffect(() => {
    getIndividualResult(setIndividualResult, selectedPollingUnit);
  }, [selectedPollingUnit]);

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

  useEffect(() => {
    setOriginalPollingUnits(pollingUnits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lgas]);

  const handleLgaChange = useCallback(
    (event: any) => {
      const selectedLgaId = event.target.value;

      // Use the selected LGA id to filter and get the corresponding polling units
      const filteredPollingUnits = originalPollingUnits.filter(
        (unit: any) => unit.lga_id === parseInt(selectedLgaId)
      );

      // Use the functional form of setPollingUnits
      setPollingUnits(filteredPollingUnits);

      setSelectedLGA(selectedLgaId);
    },
    [originalPollingUnits]
  );

  return (
    <div className='flex flex-col m-6 w-full p-2.5 gap-4'>
      <h2 className='mb-10 mt-10 text-3xl font-bold'>
        View result for polling Unit
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
            <select value={selectedLGA} onChange={handleLgaChange}>
              <option value=''>Select</option>
              {lgas.map((lga: any) => (
                <option key={lga.uniqueid} value={lga.lga_id}>
                  {lga.lga_name}
                </option>
              ))}
            </select>
          </label>

          <label>Select Polling Unit:</label>
          <select
            onChange={(e) => setSelectedPollingUnit(e.target.value)}
            value={selectedPollingUnit}
          >
            <option value=''>Select a Polling Unit</option>
            {pollingUnits.map((unit: any) => (
              <option key={unit.uniqueid} value={unit.polling_unit_id}>
                {unit.polling_unit_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex mt-10 w-[60rem] flex-row'>
        {IndividualResult &&
          IndividualResult.map((individual: any) => (
            <div key={individual.result_id} className='flex-row p-6'>
              <table className='table-auto w-full'>
                <thead>
                  <tr>
                    <th className='px-4 py-2'>
                      {individual.party_abbreviation}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='border px-4 py-2'>
                      {individual.party_score}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IndividualPolling;
