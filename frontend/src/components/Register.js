import { React, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        // API call to login user
        registerUser();
    }

    const registerUser = async (e)=>{
        try{
            const response = await axios.post('http://localhost:5000/api/auth/register', {email: email, password: password});
            console.log(response);
            setError('');
            navigate('/todo');
        }catch (err){
            setError(err);
            console.error(err);
            console.error(error);
        }
    }
  
    return (
    <>
        <h1> Register! Page </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label> &nbsp;
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>&nbsp;
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            <div className='errorDiv'>
            </div>
        </form>
    </>
  )
}

export default Home;