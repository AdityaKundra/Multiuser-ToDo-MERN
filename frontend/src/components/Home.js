import { React, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        // API call to login user
        loginUser();
    }

    const loginUser = async (e)=>{
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', {email: username, password: password}, { withCredentials: true });
            console.log(response);
            setError('');
            // navigate('/todo');
            console.log(response);
        }catch (err){
            setError(err.response.data.message);
            console.error(err.response.data.message);
        }
    }
  
    return (
    <>
        <h1> Login! Page </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label> &nbsp;
                <input type="email" value={username} onChange={(e)=>setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>&nbsp;
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
            <div className='errorDiv'>
                {error}
            </div>
        </form>
    </>
  )
}

export default Home;