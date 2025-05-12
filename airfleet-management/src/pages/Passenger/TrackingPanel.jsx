import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaRegDotCircle } from "react-icons/fa";  // Added money icon and seat icon

const stripePromise = loadStripe("pk_test_51QTcWCRpjA9U7v3sbSo1o6PwDB2IporQNxGlyxMUSljvjB9Nzi4c650vhzGp1JIJI7mm44dyO8QZq0JbvxodSXto00dzJreWgy");

const PaymentForm = ({ bookingData, setPaymentStatus }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      bookingData.clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Error confirming payment:", error);
      setLoading(false);
      alert(`Payment Error: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      await axios.put(`https://airplane-management-system-chi.vercel.app/api/bookings/bookings/${bookingData._id}/payment-status`, {
        paymentStatus: "Paid",
        status: "Confirmed",
      });
      setPaymentStatus("Payment Successful");
      alert("Payment Successful!");

      navigate("/passenger/flight-info");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2 max-w-7xl mx-auto">
        <h3 className="text-2xl font-semibold text-secondary">Billing Information</h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="input-field">
            <label className="block text-lg" htmlFor="email">Email</label>
            <input type="email" id="email" className="w-full p-3 bg-gray-200 border-2 border-gray-600 rounded-lg" placeholder="Enter your email" />
          </div>
          <div className="input-field">
            <label className="block text-lg" htmlFor="address">Address</label>
            <input type="text" id="address" className="w-full p-3 bg-gray-200 border-2 border-gray-600 rounded-lg" placeholder="Enter your address" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-secondary">Card Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-type">
            <input type="radio" id="visa" name="cardType" value="Visa" />
            <label htmlFor="visa" className="text-lg">Visa</label>
          </div>
          <div className="card-type">
            <input type="radio" id="mastercard" name="cardType" value="MasterCard" />
            <label htmlFor="mastercard" className="text-lg">MasterCard</label>
          </div>
          <div className="card-type">
            <input type="radio" id="amex" name="cardType" value="American Express" />
            <label htmlFor="amex" className="text-lg">American Express</label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-secondary">Card Information</h3>
        <div className="border-2 border-gray-600 rounded-lg p-4">
          <CardElement
            className="bg-white p-4 rounded-lg text-black placeholder-gray-400"
            style={{
              base: {
                color: "#000",
                fontSize: "16px",
                padding: "10px",
                fontFamily: "'Roboto', sans-serif",
                backgroundColor: "white",
              },
              placeholder: {
                color: "#ccc",
              },
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-secondary">Seat Information</h3>
        <div className="flex items-center space-x-3">
          <FaRegDotCircle className="text-yellow-500 text-3xl" />
          <p className="text-lg">Seat(s): {bookingData.seatNumbers?.join(", ") || "Not Selected"}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-secondary">Total Payment</h3>
        <div className="flex items-center space-x-3">
          <FaMoneyBillWave className="text-green-500 text-3xl" />
          <p className="text-lg">${bookingData.amountPaid}</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 px-6 rounded-lg w-full shadow-md transform transition-all hover:scale-105 hover:shadow-xl"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const TrackingPanel = () => {
  const [bookingData, setBookingData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const passengerId = localStorage.getItem("PassID");
        if (passengerId) {
          const response = await axios.get(`http://localhost:5000/api/bookings/bookings/latest/${passengerId}`);
          setBookingData(response.data);

          const paymentResponse = await axios.post("http://localhost:5000/api/stripe/create-payment-intent", {
            amount: response.data.amountPaid,
          });
          setClientSecret(paymentResponse.data.clientSecret);
        } else {
          console.error("Passenger ID not found.");
        }
      } catch (err) {
        console.error("Error fetching booking data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  return (
    <div className="tracking-panel min-h-screen bg-white text-black p-8">
      <h2 className="text-4xl font-semibold text-center mb-5">Tracking Panel</h2>

      <div className="max-w-7xl mx-auto bg-white p-8 border-black border-2 rounded-xl shadow-lg space-y-8">
        {loading ? (
          <p className="text-center text-xl">Loading booking details...</p>
        ) : bookingData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="booking-details space-y-5  bg-gray-200 p-6 rounded-lg shadow-md border-2 border-gray-600">
              <h3 className="text-2xl text-secondary font-semibold mb-4">Booking Details</h3>
              <p className="text-lg ">Flight: 
                <span className="bg-gray-800 mx-5 text-white px-4 py-2 text-sm rounded-full">{bookingData.flightId?.flightNumber || "Not Available"}</span>
              </p>
              <p className="text-lg">Payment Status: 
                <span className="bg-blue-500 mx-5 text-white px-4 text-sm py-2 rounded-full">{bookingData.paymentStatus}</span>
              </p>
              <p className="text-lg" >Amount Paid: <span className="bg-green-500 mx-5 text-sm text-white px-4 py-2 rounded-full" >${bookingData.amountPaid}</span></p>
            </div>

            <div className="payment-section bg-gray-200 p-6 rounded-lg shadow-md border-2 border-gray-600">
              <h3 className="text-2xl font-semibold text-secondary mb-4">Payment</h3>
              <p className="text-lg mb-6">Status: {paymentStatus || "Awaiting Payment"}</p>
              {clientSecret ? (
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    bookingData={{ ...bookingData, clientSecret }}
                    setPaymentStatus={setPaymentStatus}
                  />
                </Elements>
              ) : (
                <button className="bg-yellow-500 py-2 px-6 rounded-lg w-full" disabled>
                  Loading Payment Form...
                </button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-xl">No booking data found.</p>
        )}
      </div>
    </div>
  );
};

export default TrackingPanel;
