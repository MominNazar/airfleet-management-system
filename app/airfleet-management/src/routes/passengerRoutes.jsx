import React from 'react';
import { Route } from 'react-router-dom';
import PassengerLayout from '../layouts/PassengerLayout';
import HomePassenger from '../pages/HomePassenger';
import FlightBookingManagement from '../pages/Passenger/FlightManagement';
import SeatSelection from '../pages/Passenger/SeatSelection';
import ScheduledFlights from '../pages/Passenger/ScheduleFlights';
import TravelHistory from '../pages/Passenger/TravelHistory';
import Profile from '../pages/Passenger/ProfileUpdate';
import LoyaltyProgram from '../pages/Passenger/LoyaltyProgram';
import AirportOverview from '../pages/Passenger/Overview';
import TrackingPanel from '../pages/Passenger/TrackingPanel';
import DashboardPanel from '../pages/Passenger/Dashboard';
import Authent from '../pages/Passenger/Authent';

const passengerRoutes = (
  <>
    <Route path="/passenger" element={<HomePassenger />} />
    <Route element={<PassengerLayout />}>
      <Route path="/passenger/booking" element={<FlightBookingManagement />} />
      <Route path="/passenger/seat-selection" element={<SeatSelection />} />
      <Route path="/passenger/flight-info" element={<ScheduledFlights />} />
      <Route path="/passenger/history" element={<TravelHistory />} />
      <Route path="/passenger/profile" element={<Profile />} />
      <Route path="/passenger/loyalty" element={<LoyaltyProgram />} />
      <Route path="/passenger/airport" element={<AirportOverview />} />
      <Route path="/passenger/tracking" element={<TrackingPanel />} />
      <Route path="/passenger/dashboard" element={<DashboardPanel />} />
      <Route path="/passenger/authentication" element={<Authent />} />
    </Route>
  </>
);

export default passengerRoutes;
