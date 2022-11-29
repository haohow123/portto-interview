import { useEffect, useState } from 'react';

type ReturnObj<T> = {
  data: T | undefined;
  error: undefined;
  isLoading: boolean;
};
function useFetch<T>(url: string): ReturnObj<T> {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    fetch(url, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, isLoading };
}
export default useFetch;
