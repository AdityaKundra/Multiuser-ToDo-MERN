import { React } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Todos from './components/Todos';
import Navigation from './components/Navigation';

function App() {
  return (
  <>
    <BrowserRouter>
      <Navigation/>
      <Routes>
        {/* Login Page as Home  */}
        <Route exact path="/" element={<Home />} /> 
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/todo" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
