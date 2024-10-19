import { React, useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';   

const Home = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {setIsAuthenticated} = useContext(AuthContext);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        // API call to login user
        loginUser();
    }

    const loginUser = async (e)=>{
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', {email: username, password: password}, { withCredentials: true });
            localStorage.setItem('token', response.data.token);
            setError('');
            setIsAuthenticated(true)
            navigate('/todo');
        }catch (err){
            setIsAuthenticated(false)
            setError(err.response.data.message);
            console.error(err.response.data.message);
        }
    }
  
//     return (
//     <>
//         <h1> Login! Page </h1>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Email:</label> &nbsp;
//                 <input type="email" value={username} onChange={(e)=>setUsername(e.target.value)} required />
//             </div>
//             <div>
//                 <label>Password:</label>&nbsp;
//                 <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
//             </div>
//             <div>
//                 <button type="submit">Login</button>
//             </div>
//             <div className='errorDiv'>
//                 {error}
//             </div>
//         </form>
//     </>
//   )
return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center mt-2">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );

}

export default Home;