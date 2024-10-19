import { React } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Todos from './components/Todos';
import Navigation from './components/Navigation';
import { AuthProvider } from './context/AuthContext';
import ProtectedRouter from './router/ProtectedRouter';

function App() {
  return (
  <>
  <AuthProvider>
    <BrowserRouter>
      <Navigation/>
      <Routes>
        {/* Login Page as Home  */}
        <Route exact path="/" element={<Home />} /> 
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/todo" element={
          <ProtectedRouter>
            <Todos />
          </ProtectedRouter>
        } />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  </>
  );
}

export default App;
