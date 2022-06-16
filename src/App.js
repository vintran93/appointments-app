import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { Switch, Route, useLocation } from 'react-router-dom';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Doctors from './components/Doctors';
import Doctor from './components/Doctor';
import Appointments from './components/Appointments';
import Appointment from './components/Appointment';
import NewAppointment from './components/NewAppointment';
import { clearMessage } from './actions/message';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(clearMessage()); // clear message when changing location
  }, [dispatch, location]);

  return (
    <div>
      <Sidebar />
      <main>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/doctors" element={<Doctors />} /> 
          <Route path="/doctors/:id" element={<Doctor />} /> 
          <Route path="/appointments" element={<Appointments />} /> 
          <Route path="/appointments/new" element={<NewAppointment />} /> 
          <Route path="/appointments/:id" element={<Appointment />} /> 
        </Routes>
      </main>
    </div>
  );
};

export default App;
