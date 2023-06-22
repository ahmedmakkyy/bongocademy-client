import { useQuery } from '@tanstack/react-query';
import React from 'react';

const usePopularInsturctors = () => {
  const{data: instructors=[]} = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      const response = await fetch('https://bongo-sports-server.vercel.app/popular-instructors' )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
  return [instructors];
};

export default usePopularInsturctors;