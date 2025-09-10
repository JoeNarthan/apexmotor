import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumbs = ({ carName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const nameMap = {
    profile: "Profile",
    "edit-profile": "Edit Profile",
    sellcar: "Sell a Car",
    wishlist: "Wishlist",
    cart: "Cart",
    cars: "Cars",
  };

  return (
    <nav className="flex items-center text-sm font-medium text-gray-500 my-4 space-x-2">
      <Link
        to="/"
        className="flex items-center gap-1 text-[#2384C1] hover:text-blue-700"
      >
        <FaHome size={15} /> Home
      </Link>

      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;

        // Only allow real routes to be clickable
        let to = "";
        if (value === "cars" && index === 0) to = "/cars"; // Cars list
        else to = null; // All others not clickable

        let name;
        if (isLast && carName) name = carName; // Last item = carName
        else name = nameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <div key={index} className="flex items-center space-x-2">
            <FaChevronRight className="h-3 w-3 text-gray-400" />
            {to ? (
              <Link to={to} className="text-[#2384C1] hover:text-blue-700">
                {name}
              </Link>
            ) : (
              <p className="text-gray-700">{name}</p>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
