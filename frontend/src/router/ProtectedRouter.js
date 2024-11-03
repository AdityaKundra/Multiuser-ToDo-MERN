import {useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';
import AuthContext from '../context/AuthContext';

const ProtectedRouter = ({children}) => {
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(`isAuthenticated: ${isAuthenticated}`)
        if (!isAuthenticated) {
            navigate('/'); // Redirect to login page
        }
    }, [isAuthenticated, navigate]);
    
    if(!isAuthenticated){
       return navigate('/');
    }

    return children

}

export default ProtectedRouter