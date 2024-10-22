import {React, createContext, useEffect, useState} from 'react'
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const AuthApi = async()=>{
        try{
            
            const  token = localStorage.getItem('token'); 
            const authCall =await axios.get('http://localhost:5000/auth/protected',{
                headers: {
                    'Authorization': `Bearer ${token}`,
                } 
                    // { withCredentials: true }  // This is used when you want to send cookies in the request header.
            });

            if(authCall.status === 200){
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
                console.log(`Auth Failed Status Code ${authCall.status}`)
                
            }

        }catch(err){
            console.error('Error checking auth status:', err);
            setIsAuthenticated(false);
        }

    }
    useEffect((e)=>{
        AuthApi()
    },[])

    return(
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext