import { useQuery } from '@tanstack/react-query';


const useUsers = () => {
  const{data: users=[]} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://bongo-sports-server.vercel.app/users' )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
  return [users];
};

export default useUsers;