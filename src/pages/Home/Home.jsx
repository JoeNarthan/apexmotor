// src/pages/Home.jsx
import { useState } from "react";
import Hero from "../../pages/Home/Hero";
import Trending from "../../pages/Home/Trending";
import Category from "../../pages/Home/Category";
import CarList from "../../pages/Home/CarList";
import BlogNews from "../../pages/Home/NewsBlogSection"

export default function Home() {
  const [filters, setFilters] = useState({
    location: "All locations",
    brand: "All brands",
    type: "All types",
    price: "No max",
    year: "All years",
    condition: "All conditions",
    delivery: "All"
  });
  
  const [sortOption, setSortOption] = useState("default");

  return (
    <main>
      <Hero />
      <Trending />
      <Category showTypes={true} filters={filters} setFilters={setFilters} sortOption={sortOption} setSortOption={setSortOption}/>
      <CarList filters={filters} sortOption={sortOption} isHomePage={true} />
      <BlogNews />
    </main>
  );
}