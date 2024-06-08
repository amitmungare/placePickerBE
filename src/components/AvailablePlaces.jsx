import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from '../Error.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvaliablePlaces } from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] =useState([]);
  const [isFetching, setIsFetching] =useState(false);
  const [error, setError] =useState();

 

  useEffect(()=>{
    async function fetchPlaces(){
      setIsFetching(true);
      try {
        const places = await fetchAvaliablePlaces();
        navigator.geolocation.getCurrentPosition((pos)=>{
          const sortedPlaces = sortPlacesByDistance(
            places,
            pos.coords.latitude,
            pos.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })
      } catch (error) {
        setError({message: error.message || "Error"})
        setIsFetching(false);
      }
    }
    fetchPlaces();
  },[])

  if(error){
    return <Error title="An error occurred" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
