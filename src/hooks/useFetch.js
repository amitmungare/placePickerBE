import { useEffect, useState } from "react";

export function useFetch(fetchFun, initialValue){

  const [isFetching, setIsFetching] =useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(()=>{
        async function fetchData(){
          setIsFetching(true);
          try {
            const data = await fetchFun();
            setFetchedData(data);
          } catch (error) {
            setError({ message: error.message || "Error" });
          }
          setIsFetching(false);
        }
        fetchData();
      }, [fetchFun])

      return {
        isFetching,
        fetchedData,
        error,
        setFetchedData,
      }
}