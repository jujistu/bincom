import React from 'react';
import axios from 'axios';

const getLga = async (setLgas: React.Dispatch<any>) => {
  try {
    const response = await axios.get('http://localhost:8000/getlga');
    // console.log(response);
    setLgas(response.data);
  } catch (error) {
    console.log('error getting LGAs', error);
  }
};

const getStates = async (setStates: React.Dispatch<any>) => {
  try {
    const response = await axios.get('http://localhost:8000/getstates');
    // console.log(response);
    setStates(response.data);
  } catch (error) {
    console.log('error getting States', error);
  }
};

const getPollingUnit = async (setPollingUnits: React.Dispatch<any>) => {
  try {
    const response = await axios.get('http://localhost:8000/getpollingunit');

    setPollingUnits(response.data);
  } catch (error) {
    console.log('error getting LGAs', error);
  }
};

const getIndividualResult = async (
  setIndividualResult: React.Dispatch<any>,
  selectedPollingUnit: any
) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/polling_unit_result/${selectedPollingUnit}`
    );

    setIndividualResult(response.data);
  } catch (error) {
    console.log('error getting LGAs', error);
  }
};

const getSummedResult = async (
  setSummedResult: React.Dispatch<any>,
  lga_id: any
) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/local-government/${lga_id}`
    );

    setSummedResult(response.data);
  } catch (error) {
    console.log('error getting LGAs', error);
  }
};

const postResults = async (
  results: any,
  polling_unit_uniqueid: any,
  entered_by_user: string
) => {
  try {
    const response = await axios.post('http://localhost:8000/store_results', {
      results,
      polling_unit_uniqueid,
      entered_by_user,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export {
  getLga,
  getPollingUnit,
  getStates,
  getIndividualResult,
  getSummedResult,
  postResults,
};
