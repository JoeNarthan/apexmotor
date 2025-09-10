// src/pages/Inventory.jsx
import { useFilters } from "../context/FilterContext";
import { useLocation } from "react-router-dom";
import Category from "../pages/Home/Category";
import CarList from "../pages/Home/CarList";
import Breadcrumb from "../components/layout/Breadcrumb";
import { useEffect, useState, useRef } from "react";
// import SmartScroll from '../utils/SmartScroll';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Inventory() {
  const { filters, setFilters, sortOption, setSortOption } = useFilters();
  const location = useLocation();
  const queryParam = useQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const [ setIsReady] = useState(false);
  const scrollContainerRef = useRef();

  // Update searchQuery only when page loads or URL changes
   useEffect(() => {
    setSearchQuery(queryParam.get("search") || "");
  }, [location.search]);


  const params = new URLSearchParams(location.search);
  const brandFromQuery = params.get("brand");

  const appliedFilters = {
    ...filters,
    brand: brandFromQuery || filters.brand,
    search: searchQuery, // now search only updates on submit
  };

  return (
    <div className="mt-10" ref={scrollContainerRef}>
      <div className="mx-7 sm:mx-12">
        <Breadcrumb />
      </div>
      <Category 
        showTypes={false} 
        filters={appliedFilters} 
        setFilters={setFilters} 
        sortOption={sortOption} 
        setSortOption={setSortOption} 
      />
      <CarList filters={appliedFilters} onDataLoaded={() => setIsReady(true)} sortOption={sortOption} isHomePage={false} />
    </div>
  );
}
