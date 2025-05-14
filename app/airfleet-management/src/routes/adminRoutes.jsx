import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import CrewManagement from '../pages/Admin/CrewManagement';
import FlightSchedule from '../pages/Admin/FlightSchedule';
import UserManagement from '../pages/Admin/UserManagement';
import FeedbackManagement from '../pages/Admin/FeedbackManagement';
import Notifications from '../pages/Admin/Notifications';
import Tracking from '../pages/Admin/Tracking';
import Dashboard from '../pages/Admin/Dashboard';

const adminRoutes = (
    
  <Route element={<AdminLayout />}>
    <Route path="/admin/crew-management" element={<CrewManagement />} />
    <Route path="/admin/flight-schedule" element={<FlightSchedule />} />
    <Route path="/admin/user-management" element={<UserManagement />} />
    <Route path="/admin/feedback" element={<FeedbackManagement />} />
    <Route path="/admin/notifications" element={<Notifications />} />
    <Route path="/admin/tracking" element={<Tracking />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    
  </Route>
);

export default adminRoutes;
