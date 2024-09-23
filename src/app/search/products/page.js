"use client";

import ProductList from "@/components/ProductList";
import { retriveProducts } from "@/components/service/getData";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "flowbite-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const query = useSearchParams();
  useEffect(() => {
    const encodedData = query.get("query");
    if (encodedData) {
      // Decode and parse the data from the query parameter
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      setSearchData(decodedData);
    }
  }, [query]);

  const getProductList = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await retriveProducts(data);
      setProducts(res?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when the component mounts or when `productQuery` changes
  useEffect(() => {
    if (searchData) {
      getProductList(searchData);
    }
  }, [searchData]);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-full w-full relative overflow-y-auto">
        {/* {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        )} */}
        <div className="max-w-[1200px] w-full h-full relative">
          <ProductList products={products} loading={loading} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
