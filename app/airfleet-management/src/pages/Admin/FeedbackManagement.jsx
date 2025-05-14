import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import userimg from "../../assets/images/user.png";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // Fetch all feedbacks when the component mounts
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("https://airplane-management-system-chi.vercel.app/api/feedbacks");
      const data = await response.json();
      setFeedbacks(data);
      calculateAverageRating(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const calculateAverageRating = (feedbacksList) => {
    const totalRating = feedbacksList.reduce((sum, feedback) => sum + feedback.rating, 0);
    setAverageRating(totalRating / feedbacksList.length);
  };

  const totalFeedbacks = feedbacks.length;

  const getRatingCount = (rating) =>
    feedbacks.filter((feedback) => feedback.rating === rating).length;

  const getFeedbackColor = (rating) => {
    if (rating >= 4) return "bg-green-500 text-white";
    if (rating === 3) return "bg-yellow-500 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <div>
      <div className="flex flex-col items-center text-center justify-center md:flex-row md:justify-between px-6 py-4 bg-secondary">
        <h1 className="text-xl font-bold">Feedback Management</h1>
      </div>

      <div className="p-0 bg-gray-00 min-h-screen flex flex-col gap-6 text-black text-sm">
        {/* Feedback Report Section */}
        <div className="w-full bg-white p-6 shadow-lg">
          <div className="mb-6 p-6 bg-gray-200 rounded-lg md:text-lg flex items-center justify-between">
            <span>Average Rating:</span>
            <div className="flex items-center space-x-3">
              <Star className="text-yellow-500 w-5 h-5" />
              <span className="text-lg font-bold">{averageRating.toFixed(2)} / 5</span>
            </div>
          </div>

          {/* Feedback Breakdown */}
          <div className="space-y-6 md:text-lg bg-gray-200 p-6 rounded-lg">
            <div>
              <strong>Feedback Breakdown:</strong>
              <div className="space-y-4 mt-4">
                {[1, 2, 3, 4, 5].map((rating) => {
                  const count = getRatingCount(rating);
                  const percentage = totalFeedbacks ? (count / totalFeedbacks) * 100 : 0;
                  return (
                    <div key={rating} className="space-y-3">
                      <div className="flex justify-between">
                        <span>Rating {rating}:</span>
                        <span>{count} feedback(s)</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Feedbacks */}
          <div className="overflow-y-auto max-h-80 mt-6 bg-gray-200 p-4 scrollbar-thin scrollbar-thumb-secondary rounded-lg">
            <h3 className="font-semibold mb-4 md:text-lg">Recent Feedbacks</h3>
            <ul className="space-y-4">
              {feedbacks.map((feedback) => (
                <li key={feedback._id} className="border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={userimg}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex justify-between w-full items-center p-3">
                      <span className="font-semibold">{feedback.passengerId.email}</span>
                      <div className="flex items-center">
                        <Star className="mr-2 text-yellow-500" />
                        {feedback.rating}
                      </div>
                    </div>
                  </div>
                  <p className={`${getFeedbackColor(feedback.rating)} p-2 rounded-lg`}>
                    {feedback.comments}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackManagement;
