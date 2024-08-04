import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45255678-7b1e2ce8abc638d1eba867b77';

const useFetchImages = (query, page) => {
  const [data, setData] = useState({ hits: [], totalHits: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) return; 
      setLoading(true);
      try {
        const url = `${BASE_URL}?q=${encodeURIComponent(
          query
        )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        const response = await axios.get(url);
        setData({
          hits: response.data.hits,
          totalHits: response.data.totalHits,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]); 

  return { data, loading, error };
};

export default useFetchImages;
