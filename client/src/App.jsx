/**
 * This file contains the React-based frontend architecture for the healthcare project.
 */
import 'global';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//import './App.css';
import Home from './Components/Pages/Home';
import VideoConsultation from './Components/Pages/VideoConsultation';
import HealthRecords from './Components/Pages/HealthRecords';
import AppointmentBooking from './Components/Pages/AppointmentBooking';
import PharmacyDelivery from './Components/Pages/PharmacyDelivery';
import LabBooking from './Components/Pages/LabBooking';
import HealthWellness from './Components/Pages/HealthWellness';
import SymptomChecker from './Components/Pages/SymptomChecker';
import SchedulingEngine from './Components/Pages/SchedulingEngine';
import WebScraper from './Components/Pages/WebScraper';
//import AdminPanel from './Components/Pages/AdminPanel';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import PatientRecords from './Components/Pages/PatientRecords';
import GivePrescription from './Components/Pages/GivePrescription';
import DoctorDashboard from './Components/Dashboard/DoctorDashboard';
import PatientDashboard from './Components/Dashboard/PatientDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import ManageUsers from './Components/Dashboard/ManageUsers';
import ManagePatient from './Components/Dashboard/ManagePatient';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video-consultation" element={<VideoConsultation />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/pharmacy-delivery" element={<PharmacyDelivery />} />
          <Route path="/lab-booking" element={<LabBooking />} />
          <Route path="/web-scraper" element={<WebScraper />} />
          <Route path="/health-wellness" element={<HealthWellness />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/scheduling-engine" element={<SchedulingEngine />} />
          <Route path="/patient-records" element={ <PatientRecords />} />
          <Route path="/give-prescription" element={ <GivePrescription />} />
          <Route path="/login" element={ <Login  />} />
          <Route path="/register" element={ <Register  />} />
          {/*<Route path="/admin-panel" element={<AdminPanel />} />*/}
          <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
          <Route path="/patient-dashboard" element={<PatientDashboard/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/manage-users" element={<ManageUsers/>} />
          <Route path="/manage-patient" element={<ManagePatient/>} />
         {/*
          <Route path="/register/patient" render={() => <Register userType="patient" />} />
          <Route path="/register/doctor" render={() => <Register userType="doctor" />} />
          <Route path="/register/admin" render={() => <Register userType="admin" />} />
          <Route path="/login/patient" render={() => <Login userType="patient" />} />
          <Route path="/login/doctor" render={() => <Login userType="doctor" />} />
          <Route path="/login/admin" render={() => <Login userType="admin" />} />
          */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
