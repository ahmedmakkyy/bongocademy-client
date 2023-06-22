import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useAllInstructors = () => {
  const{data: allinstructors=[]} = useQuery({
    queryKey: ['all-instructors'],
    queryFn: async () => {
      const response = await fetch('https://bongo-sports-server.vercel.app/all-instructors' )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
  return [allinstructors];
};

export default useAllInstructors;