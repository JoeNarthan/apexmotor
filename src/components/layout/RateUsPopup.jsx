// src/components/layout/RateUsPopup.jsx
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { saveRating } from "../../utils/saveRating"; 
import { useAuth } from "../../context/AuthContext"; 

export default function RateUsPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const { user } = useAuth(); 
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 15000); // 15 seconds delay
    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white p-4 rounded-xs shadow-xl w-72 animate-slideUp">
        <h2 className="sm:text-base text-sm  flex items-center gap-2 text-gray-600 font-bold mb-1"><StarIcon className="text-green-500" /> Rate Us</h2>
        <p className="text-gray-600 sm:text-sm text-xs mb-3">
          Do you like our website? Give us a quick rating!
        </p>

        {/* Stars */}
        <div className="flex text-base justify-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl transition ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setShowPopup(false)}
            className="px-3 py-1 rounded-sm bg-gray-400 text-sm hover:bg-gray-300"
          >
            Skip
          </button>
         <button
            onClick={() => {
              saveRating(rating, user); // user = from AuthContext
              setShowPopup(false);
            }}
            disabled={rating === 0}
            className={`px-3 py-1 rounded-lg text-sm text-white transition ${
              rating > 0
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
