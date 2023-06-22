import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Pages/LogIn & SignUp/AuthProvider/AuthProvider';

const useSelectedClasses = () => {
const {user} = useContext(AuthContext)
  const{data: classes=[]} = useQuery({
    queryKey: ['selectedClasses'],
    queryFn: async () => {
      const response = await fetch(`https://bongo-sports-server.vercel.app/mySelectedClasses?student_email=${user.email}` )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })
  return [classes];
};

export default useSelectedClasses;




// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';

// const SelectedClasses = () => {
//     const {user} = useContext(AuthContext)
//     const [selectedClasses, setSelectedClasses] = useState([]);

//     useEffect(() => {
//       const fetchSelectedClasses = async () => {
        
//         const url = `https://bongo-sports-server.vercel.app/mySelectedClasses?student_email=${user.email}`;
  
//         try {
//           const response = await fetch(url);
//           if (response.ok) {
//             const data = await response.json();
//             setSelectedClasses(data);
//           } else {
//             console.log('Error:', response.status);
//           }
//         } catch (error) {
//           console.log('Error:', error);
//         }
//       };
  
//       fetchSelectedClasses();
//     }, [user.email]);