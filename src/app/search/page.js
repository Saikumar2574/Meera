"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getData } from "@/components/service/getData";
import Understanding from "@/components/Understanding";
import { Spinner } from "flowbite-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function Page() {
  const searchParams = useSearchParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract 'prompt' from query parameters
  const prompt = searchParams.get("prompt");

  useEffect(() => {
    async function fetchData() {
      if (prompt) {
        try {
          const data = await getData(prompt);
          setInitialData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [prompt]); // Dependency array includes 'prompt' to refetch if it changes

  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-full relative">
        <div className="max-w-[1200px] w-full h-full p-6 relative">
          {/* {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
          )} */}
          <Understanding data={initialData} prompt={prompt} />
          {initialData?.irrelevant_context && (
            <div className="mt-14">
              <h4 className="text-xl italic font-bold">Other Info</h4>
              <p className="text-lg italic my-4">
                {initialData?.irrelevant_context}
              </p>
            </div>
          )}
          <div className="mt-14 pb-10">
            <h4 className="text-xl italic font-bold">
              Tips for better assistance
            </h4>
            <p className="text-lg italic my-4">
              {initialData?.tips_for_better_engagement}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
