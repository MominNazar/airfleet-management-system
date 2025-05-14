import React, { useState, useEffect } from "react";
import axios from "axios";

const LoyaltyProgram = () => {
  const [points, setPoints] = useState(0);  // Set initial points to 0
  const [redeemed, setRedeemed] = useState(null);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with the actual user ID
  const userId = "6754a7635e871cd57ec8f22a"; 

  // Fetch user's loyalty points on component mount
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(`https://airplane-management-system-chi.vercel.app/api/users/loyalty/${userId}`);
        setPoints(response.data.loyaltyPoints);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch points.");
        setLoading(false);
      }
    };

    fetchPoints();
  }, [userId]);

  const handleRedeemPoints = async () => {
    if (redeemAmount <= 0) {
      alert("Please enter a valid amount to redeem.");
    } else if (redeemAmount > points) {
      alert("You don't have enough points to redeem this amount.");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/users/loyalty/redeem/${userId}`,
          { pointsToRedeem: redeemAmount }
        );
        setPoints(response.data.remainingPoints);
        setRedeemed(redeemAmount);
        setRedeemAmount(0); // Reset input after redemption
      } catch (err) {
        alert("Error redeeming points.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Loyalty Program</h2>

        {/* Display Current Points */}
        <div className="mb-6">
          <p className="text-xl">
            You have <span className="text-yellow-400 font-semibold">{points}</span> points.
          </p>
        </div>

        {/* Redeem Points Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Redeem Points for Rewards</h3>
          <p className="text-sm mb-4">Enter the number of points you want to redeem for rewards (e.g., flight discounts, free upgrades, etc.).</p>
          <input
            type="number"
            value={redeemAmount}
            onChange={(e) => setRedeemAmount(Number(e.target.value))}
            className="w-full p-4 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring focus:ring-yellow-500 mb-4"
            placeholder="Enter points to redeem"
          />
          <button
            onClick={handleRedeemPoints}
            className="bg-yellow-500 py-2 px-6 rounded-lg text-white hover:bg-yellow-600 font-semibold"
          >
            Redeem Points
          </button>
        </div>

        {/* Redeem Confirmation */}
        {redeemed !== null && (
          <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">
              You have successfully redeemed {redeemed} points.
            </h3>
            <p className="text-sm text-gray-400">
              Your remaining points: {points}
            </p>
          </div>
        )}

        {/* Rewards Info */}
        <div className="mt-6 p-4 bg-gray-700 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Rewards and Discounts</h3>
          <ul>
            <li>1000 points - $50 flight discount</li>
            <li>2000 points - Free flight upgrade</li>
            <li>3000 points - Free round-trip flight within the same region</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
