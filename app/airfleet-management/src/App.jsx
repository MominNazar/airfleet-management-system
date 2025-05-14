import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import adminRoutes from './routes/adminRoutes';
import passengerRoutes from './routes/passengerRoutes';
import crewRoutes from './routes/crewRoutes';
import Aboutus from './pages/Admin/Aboutus';
import Contactus from './pages/Admin/Contactus';
import ViewFlight from './pages/Admin/ViewFlight';
import AdminDashboard from './pages/Admin/Dashboard';
import PassengerDashboard from './pages/Passenger/Dashboard';
import CrewDashboard from './pages/CrewMember/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import CrewLayout from './layouts/CrewMember';
import PassengerLayout from './layouts/PassengerLayout';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/flight-schedule" element={<ViewFlight/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        </Route>
        
        <Route element={<PassengerLayout />}>
        <Route
          path="/passenger/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Passenger']}>
              <PassengerDashboard />
            </ProtectedRoute>
          }
        />
        </Route>
        
        <Route element={<CrewLayout />}>
        <Route
          path="/crew/dashboard"
          element={
            <ProtectedRoute allowedRoles={['Crew']}>
              <CrewDashboard />
            </ProtectedRoute>
          }
        />
        </Route>
        {/* Admin Routes */}
        {adminRoutes}

        {/* Passenger Routes */}
        {passengerRoutes}

        {/* Crew Routes */}
        {crewRoutes}
      </Routes>
    </Router>
  );
};

export default App;
