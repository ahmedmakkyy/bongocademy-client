import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../../../firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext(null);

const auth = getAuth(app);



const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
    const unsubscribe =  onAuthStateChanged(auth,loggedUser =>{
            console.log(loggedUser);
            setUser(loggedUser);

            // get and set token--->
            if (loggedUser){
                axios.post('https://bongo-sports-server.vercel.app/jwt', {email:loggedUser.email})
                .then(data=>{
                    console.log(data.data.token);
                    localStorage.setItem('access-token',data.data.token)
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token')
            }
            
        })
        
        return()=>{
            unsubscribe()
        }
     
    },[])
    
    const authInfo = {
        user,
        loading,
        createUser ,
        signIn,
        logOut    
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;