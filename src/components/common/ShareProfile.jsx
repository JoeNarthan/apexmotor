// src/components/common/ShareProfile.jsx
import { FaShareAlt } from "react-icons/fa";
import { Share2 } from "lucide-react";
import Button from "../common/Button";

// 🔥 Reusable share handler
const shareProfile = async (userId) => {
  const profileUrl = `${window.location.origin}/profile/${userId}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Check out this profile!",
        text: "Take a look at this profile on Car E-conomic 🚗🔥",
        url: profileUrl,
      });
    } else {
      await navigator.clipboard.writeText(profileUrl);
      alert("✅ Link copied to clipboard!");
    }
  } catch (error) {
    console.error("Sharing failed:", error);
    alert("❌ Could not share link.");
  }
};

// 🔥 Reusable share handler
export const shareCar = async (carId) => {
  const carUrl = `${window.location.origin}/car/${carId}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Check out this car! 🚗🔥",
        text: "Take a look at this amazing car on Car E-conomic",
        url: carUrl,
      });
    } else {
      await navigator.clipboard.writeText(carUrl);
      alert("✅ Car link copied to clipboard!");
    }
  } catch (error) {
    console.error("Sharing failed:", error);
    alert("❌ Could not share the link.");
  }
};


// 🔹 Button 1
export function ShareProfileButton({ userId }) {
  return (
    <Button
      onClick={() => shareProfile(userId)}
      className="btn-Bg flex items-center gap-2 text-xs py-1.5 px-3 rounded-sm"
    >
      <FaShareAlt /> Share Profile
    </Button>
  );
}

// 🔹 Button 2
export function ShareProfileLink({ userId }) {
  return (
    <button
      onClick={() => shareProfile(userId)}
      className="flex items-center px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
    >
      <Share2 className="mr-2 h-4 w-4" /> Share Profile
    </button>
  );
}


// 🔹 share button component
export function ShareCarButton({ carId }) {

  return (
    <button
      onClick={() => shareCar(carId)}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-gray-800 transition-colors duration-150 hover:bg-gray-50"
    >
      <span className="text-gray-600"><Share2 size={20} /></span> <span>Share</span>
    </button>
  );
}

// 🔹 share button component
export function ShareCarDetailButton({ carId }) {

  return (
    <button
      onClick={() => shareCar(carId)}>
      <span className="text-gray-600"><Share2 size={20} /></span> 
    </button>
  );
}