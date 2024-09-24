"use client";

import ProductList from "@/components/ProductList";
import { retriveProducts } from "@/components/service/getData";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Pagination, Spinner } from "flowbite-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const query = useSearchParams();
  useEffect(() => {
    const encodedData = query.get("query");
    if (encodedData) {
      // Decode and parse the data from the query parameter
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      setSearchData(decodedData);
    }
  }, [query]);

  const getProductList = async (page, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await retriveProducts(page, data);
      setProducts(res?.data || []);
      setTotalPages(res?.total_pages);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    getProductList(page, searchData);
  };

  // Fetch products when the component mounts or when `productQuery` changes
  useEffect(() => {
    if (searchData) {
      getProductList(currentPage, searchData);
    }
  }, [currentPage, searchData]);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {/* <Header /> */}
      <div className="flex items-center justify-center h-full w-full relative overflow-y-auto">
        {/* {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        )} */}
        {products.length > 0 ? (
          <div className="max-w-[1200px] w-full h-full relative">
            <ProductList products={products} loading={loading} />
            {/* Add Pagination Component */}
            <div className="flex overflow-x-auto sm:justify-center mt-4">
              <Pagination
                //   layout="table"
                currentPage={currentPage}
                totalPages={totalPages} // Use totalPages from API
                onPageChange={onPageChange}
                showIcons
              />
            </div>
          </div>
        ) : (
          <p>No products available</p>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Page;
