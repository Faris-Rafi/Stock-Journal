import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from './Layouts/container'
import Home from './Pages/home';
import Login from './Pages/login';

const App = () => {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </Container>
  )
}

export default App