import { useState, useEffect } from 'react';
import { DefectJsonTypes } from '../types';
import { useDispatch } from 'react-redux';
import { injectAndUpdateDefects, setDateRange } from '../redux/actions';

export const useFetchDefects = (url: string) => {
  const [defects, setDefects] = useState<DefectJsonTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<any>();

  // get todays date and format it to match the date format in the database
  



  useEffect(() => {
    const fetchData = async () => {
      try {

        // ! TODO: Check local storage for date range, if it exists, use it, if not, use the default
        
        const today = new Date();
        const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("ALL DEFECTS ", data)

        dispatch(setDateRange(sevenDaysAgo.toISOString().split('T')[0], new Date().toISOString().split('T')[0]));

        // get data, then parse it by date. But populate the store with all the data and use that to parse it by date
        dispatch(injectAndUpdateDefects(data));

        setDefects(data);
        setLoading(false);

      } catch (err) {

        const message = (err as Error).message; // Type assertion
        console.error(message);
        setError(message);
        setLoading(false);
      }

    };

    fetchData();
  }, [dispatch, url]);

  return { defects, loading, error };
};
