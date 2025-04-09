import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import BookCart from "../components/BookCard/BookCart";
import Loder from '../Layouts/Loder/Loder';

const Allbooks = () => {
  const [Data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // Sorting state
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-all-books");
        const books = response.data.data || [];
        setData(books);
        setFilteredData(books);

        // Extract unique categories from books
        const uniqueCategories = [...new Set(books.map((book) => book.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Function to filter and sort books
  const filterAndSortBooks = (category, order) => {
    let updatedBooks = [...Data];

    // Apply Category Filter
    if (category) {
      updatedBooks = updatedBooks.filter((book) => book.category === category);
    }

    // Apply Sorting
    if (order === "low") {
      updatedBooks.sort((a, b) => a.price - b.price);
    } else if (order === "high") {
      updatedBooks.sort((a, b) => b.price - a.price);
    } else if (order === "az") {
      updatedBooks.sort((a, b) => (a.name?.toLowerCase() || "").localeCompare(b.name?.toLowerCase() || ""));
    } else if (order === "za") {
      updatedBooks.sort((a, b) => (b.name?.toLowerCase() || "").localeCompare(a.name?.toLowerCase() || ""));
    }

    setFilteredData(updatedBooks);
  };

  // Handle Sort Change
  const handleSortChange = (order) => {
    setSortOrder(order);
    filterAndSortBooks(selectedCategory, order); // ✅ Ensure sorting is applied immediately
  };

  // Handle Category Change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterAndSortBooks(category, sortOrder); // ✅ Ensure filtering is applied immediately
  };

  return (
    <div className="bg-zinc-900 px-12 py-8 h-auto">
      <h4 className="text-white text-xl lg:text-2xl font-semibold">All Books</h4>

      {/* Filters */}
      <div className="flex gap-4 mt-4">
  {/* Sorting Dropdown */}
  <select 
    className="px-1 py-2 bg-gray-900 text-white rounded-lg border border-gray-700 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               hover:bg-gray-800 transition-all duration-300 shadow-md"
    onChange={(e) => handleSortChange(e.target.value)}
    value={sortOrder}
  >
    <option value="" disabled className="text-gray-400">📌 Sort by</option>
    <option value="low"> Price: Low to High</option>
    <option value="high"> Price: High to Low</option>
    <option value="az">A to Z</option>
    <option value="za">Z to A</option>
  </select>
</div>

      {/* Show Loader when data is not available */}
      {!Data.length && (
        <div className="flex items-center justify-center w-full h-[100%]">
          <Loder />
        </div>
      )}

      {/* Display Books */}
      <div className="my-8 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8">
        {filteredData.map((item, i) => (
          <div key={i}>
            <BookCart data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allbooks;