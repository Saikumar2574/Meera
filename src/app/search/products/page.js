"use client";

import ProductList from "@/components/ProductList";
import {
  recommendedProducts,
  retriveProducts,
} from "@/components/service/getData";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination, Spinner } from "flowbite-react";

function Page() {
  const [products, setProducts] = useState([]);
  const [recomendedProducts, setRecomendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const query = useSearchParams();
  const [isFullList, setIsFullList] = useState(false);
  const [recommendedLoading, setRecommendedLoading] = useState(false);

  // Function to toggle between "Render List" and "Full List"
  const toggleList = () => {
    setIsFullList((prev) => !prev);
  };
  // Utility function to omit specific fields
  const omitFields = (data, fieldsToOmit) => {
    const filteredData = { ...data };
    fieldsToOmit.forEach((field) => delete filteredData[field]);
    return filteredData;
  };

  useEffect(() => {
    const encodedData = query.get("query");
    if (encodedData) {
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      setSearchData(decodedData);
    }
  }, [query]);

  useEffect(() => {
    if (searchData) {
      const recommendedProductData = omitFields(searchData, [
        "overal_budget",
        "related_price",
        "attributes",
      ]);
      getRecommendedProducts(recommendedProductData);
    }
  }, [searchData]);

  useEffect(() => {
    if (searchData) {
      getProductList(currentPage, searchData);
    }
  }, [currentPage, searchData]);

  const getProductList = async (page, data) => {
    setLoading(true);
    setError(null);

    const retrieveProductData = omitFields(data, ["search_phrase"]);

    try {
      const res = await retriveProducts(page, retrieveProductData);
      setProducts(res?.data || []);
      setTotalPages(res?.total_pages || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const getRecommendedProducts = async (data) => {
    setRecommendedLoading(true);
    try {
      const res = await recommendedProducts(data);
      setRecomendedProducts(res?.data);
    } catch (error) {
      console.error("Error fetching recommended products:", error);
    } finally {
      setRecommendedLoading(false);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* <Header /> */}
      <div className="sticky top-0 bg-white w-full z-20 px-3 flex items-center justify-between">
        <div className="flex gap-3 py-4 px-2 items-center">
          <video
            src="/inputVedio.mp4"
            autoPlay
            loop
            muted
            className="w-12 h-12"
          />
          <p className="font-semibold italic">Meera Is Searching .....</p>
        </div>

        {/* Button Group */}
        <div className="flex gap-4 bg-[#04102f] p-2 rounded-xl">
          <button
            onClick={toggleList}
            className={`px-4 py-1 text-sm font-semibold italic  rounded ${
              !isFullList ? "bg-white text-black" : "bg-transparent text-white"
            }`}
          >
            Render List
          </button>
          <button
            onClick={toggleList}
            className={`px-4 py-1 text-sm font-semibold italic  rounded ${
              isFullList ? "bg-white text-black" : "bg-transparent text-white"
            }`}
          >
            Full List
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center h-full w-full relative ">
        {/* {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        )} */}
        <div className="w-full h-full relative">
          <ProductList
            isFullList={isFullList}
            products={products}
            recomendedProducts={recomendedProducts}
            loading={loading}
            recommendedLoading={recommendedLoading}
          />
          {/* Add Pagination Component */}
          {isFullList && (
            <div className="flex overflow-x-auto sm:justify-center mt-4">
              <Pagination
                //   layout="table"

                currentPage={currentPage}
                totalPages={totalPages} // Use totalPages from API
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Page;
