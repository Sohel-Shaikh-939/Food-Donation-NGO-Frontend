import React, { useState, useMemo, useEffect, useRef } from "react";
import LocationIcon from "../../components/LocationIcon";
import { ChevronLeft, ChevronRight, Clock, Filter, Search } from "lucide-react";
import axios from "axios";
import { foodPageSliceAction } from "./foodPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FilterBar = ({ filter, setFilter, handleChange }) => {
  const foodTypes = ["All", "Produce", "Prepared", "Baked Goods", "Meat"];

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl mb-8 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Find Available Food
      </h3>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 flex-grow relative">
          <div className="p-2 cursor-pointer rounded-lg">
            <Search className=" text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search food, donor, or location..."
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
          />
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 items-center">
          <div className="flex items-end gap-1 text-gray-600">
            <Filter className="h-5 w-5 mr-1" />
            <span className="font-medium hidden sm:inline">Type:</span>
          </div>
          {foodTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition duration-150 ${
                type == filter
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-green-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FoodListingCard = ({ listing, navigate }) => {
  function getDaysUntilExpiry(expiryString) {
    const expiryDate = new Date(expiryString);
    const today = new Date();
    const diffTime = expiryDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="min-h-fit bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300  border-2 border-gray-200 flex flex-col sm:flex-row overflow-hidden">
      <div className="h-full sm:h-auto sm:w-1/3 w-full bg-gray-100 flex-shrink-0 relative">
        <img
          src={listing.foodImg}
          alt={listing.foodName}
          className="w-full h-full bg-cover"
        />
        {listing.status == "Reserved" ||
        listing.status == "Claimed" ||
        getDaysUntilExpiry(listing.expiryDate) < 0 ? (
          <img
            src={
              getDaysUntilExpiry(listing.expiryDate) < 0
                ? "expired.png"
                : listing.status == "Reserved"
                ? "reserved.png"
                : listing.status == "Claimed"
                ? "claimed.png"
                : ""
            }
            className="w-[70%] h-[70%] bg-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          />
        ) : (
          ""
        )}
      </div>

      <div className="lg:p-5 md:p-2 p-1 flex-grow flex flex-col justify-between">
        <div>
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700 mb-2`}
          >
            {listing.foodCategory == "Fresh Produce"
              ? "Produce"
              : listing.foodCategory == "Prepared Meals"
              ? "Prepared"
              : listing.foodCategory == "Meat"
              ? "Meat"
              : listing.foodCategory == "Baked Goods"
              ? "Baked"
              : "Other"}
          </span>
          <h3 className="lg:text-2xl md:text-lg font-bold text-gray-800 lg:mb-2 mb-1">
            {listing.foodName}
          </h3>
          <div className="text-sm text-gray-500 lg:mb-4 mb-1 flex items-center">
            <div className="pt-1">
              <LocationIcon />
            </div>
            {listing.physicalAddress} | Donor:
            <span className="pl-1 font-semibold text-gray-700">
              {listing.donorName}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-sm font-medium text-gray-600">
            <div className="flex items-center gap-0.5">
              <Clock className="mt-0.5 w-3.5 h-3.5 mr-1" />
              {getDaysUntilExpiry(listing.expiryDate) >= 0 ? (
                <div>
                  Expires in
                  <span className="text-lg font-bold ml-1 text-red-500">
                    {getDaysUntilExpiry(listing.expiryDate)}
                  </span>
                  <span> days</span>
                </div>
              ) : (
                <span className="lg:text-lg text-sm font-bold ml-1 text-red-500">
                  Expired
                </span>
              )}
            </div>
            <div className="border-l pl-4">
              <span className="text-lg font-bold text-green-600">
                {listing.quantity}
              </span>
              {listing.unit}
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-3">
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md cursor-pointer"
            onClick={() => {
              navigate(`/food/${listing.id}`);
            }}
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

const FoodPage = () => {
  const timerRef = useRef(null);
  const pageRef = useRef(1);
  const searchRef = useRef("");
  const [filter, setFilter] = useState("All");
  const dispatch = useDispatch();
  const { foodList } = useSelector((store) => store.FoodPage);
  const [more, setMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    (async () => {
      const query = searchRef.current.trim();
      pageRef.current = 1;
      setMore(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/foodlist?search=${query}&page=${pageRef.current}&filter=${filter}`
        );
        dispatch(foodPageSliceAction.setSearchFoodList(res.data.data));
        if (!res.data.data?.length) setMore(false);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      dispatch(foodPageSliceAction.setFoodListEmpty());
    };
  }, [filter]);

  const handleChange = (e) => {
    searchRef.current = e ? e.target.value : "";

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      const query = searchRef.current.trim();
      pageRef.current = 1;
      setMore(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/foodlist?search=${query}&page=${pageRef.current}&filter=${filter}`
        );
        dispatch(foodPageSliceAction.setSearchFoodList(res.data.data));
        if (!res.data.data?.length) setMore(false);
      } catch (err) {
        console.error(err);
      }
    }, 500);
  };

  const handleLoadMore = async () => {
    const query = searchRef.current.trim();
    setMore(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/foodlist?search=${query}&page=${pageRef.current}&filter=${filter}`
      );
      dispatch(foodPageSliceAction.setFoodList(res.data.data));
      if (!res.data.data?.length) setMore(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased bg-gray-50">
      <main className="container mx-auto px-4 md:px-12 lg:px-20 py-8 md:py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Available Food Listings
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Browse items nearby or use the filters to find exactly what you need.
        </p>

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          handleChange={handleChange}
        />

        <div className="flex flex-col gap-5">
          {foodList.length > 0 ? (
            foodList.map((listing) => (
              <FoodListingCard
                key={listing.id}
                listing={listing}
                navigate={navigate}
              />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100">
              <p className="text-2xl font-semibold text-gray-700">
                No matching food items found.
              </p>
              <p className="text-gray-500 mt-2">
                Try adjusting your search term or filters.
              </p>
            </div>
          )}
        </div>
      </main>
      <div className="w-full flex bg-gray-100 items-center justify-center p-4 mb-10 font-sans ">
        <button
          type="submit"
          disabled={!more}
          className="px-6 py-2.5 rounded-xl text-lg font-semibold text-white bg-[#38a169] shadow-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#38a169]/50 cursor-pointer disabled:cursor-not-allowed"
          onClick={() => {
            pageRef.current = pageRef.current + 1;
            handleLoadMore();
          }}
        >
          {more ? "Load More Listings" : "No More Food"}
        </button>
      </div>
    </div>
  );
};

export default FoodPage;
