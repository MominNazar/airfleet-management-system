import React from 'react';
import { Route } from 'react-router-dom';
import CrewLayout from '../layouts/CrewMember';
import CrewHome from '../pages/HomeCrew';
import AssignedFlights from '../pages/CrewMember/AssignFlights';
import FlightWithdrawalRequests from '../pages/CrewMember/FlightWithdraw';
import FlightStatus from '../pages/CrewMember/FlightStatus';
import ProfileUpdate from '../pages/CrewMember/ProfileUpdate';
import NotificationAlert from '../pages/CrewMember/Notification';
import CrewTrackingPanel from '../pages/CrewMember/TrackingPanel';
import CrewDashboard from '../pages/CrewMember/Dashboard';
import Auth from '../pages/CrewMember/Authen';

const crewRoutes = (
  <>
    <Route path="/crew" element={<CrewHome />} />
    <Route element={<CrewLayout />}>
      <Route path="/crew/assigned-flights" element={<AssignedFlights />} />
      <Route path="/crew/flight-withdrawal" element={<FlightWithdrawalRequests />} />
      <Route path="/crew/flight-status" element={<FlightStatus />} />
      <Route path="/crew/profile" element={<ProfileUpdate />} />
      <Route path="/crew/notifications" element={<NotificationAlert />} />
      <Route path="/crew/tracking" element={<CrewTrackingPanel />} />
      <Route path="/crew/dashboard" element={<CrewDashboard />} />
      <Route path="/crew/authentication" element={<Auth />} />
    </Route>
  </>
);

export default crewRoutes;
