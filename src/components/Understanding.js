"use client";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import GaugeChart from "react-gauge-chart";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Include the CSS

function Understanding({
  data,
  selectedPhrase,
  getProductList,
  phrasesRef,
  prompt,
}) {
  const router = useRouter();

  const isLoading = !data; // Check if data is loading

  return (
    <div className="flex flex-col relative mt-8">
      <h2 className="mt-30 ml-0 md:ml-6 text-xl font-bold sm:text-[40px] italic dark:text-white text-black leading-6  md:leading-[55px]">
        Hey there,
        <br />
        this is what i could process ...
      </h2>

      <div className="grid grid-cols-12 gap-0 md:gap-8 mt-6 w-full">
        {/* 8-column layout */}
        <div
          className="col-span-12 md:col-span-8 p-5 md:p-10 rounded-2xl border"
          style={{ boxShadow: "10px 5px 20px  #83838336" }}
        >
          <h4 className="text-xl italic font-bold">My Understanding</h4>
          {isLoading ? (
            <Skeleton count={3} />
          ) : (
            <p className="text-lg italic my-4">{data?.my_understanding}</p>
          )}
          <a
            href="#"
            className="w-full flex justify-end font-bold text-lg italic items-center"
          >
            Modify Search <FaArrowRightLong className="ml-5" />
          </a>
        </div>

        <div
          className="col-span-12 md:col-span-4 mt-6 md:mt-0  p-5 md:p-10 rounded-2xl flex justify-center items-center flex-col border"
          style={{ boxShadow: "10px 5px 20px  #83838336" }}
        >
          {isLoading ? (
            <Skeleton circle={true} height={200} width={200} />
          ) : (
            <GaugeChart
              id="gauge-chart5"
              colors={["#EA4228", "#F5CD19", "#5BE12C"]}
              percent={
                data?.relevance_score === 10
                  ? 1
                  : Number(`0.${data?.relevance_score}`)
              }
              arcPadding={0.02}
              hideText
            />
          )}

          {isLoading ? (
            <Skeleton width={100} height={40} />
          ) : (
            <p
              className="text-4xl font-bold mt-5 italic"
              style={{ letterSpacing: "8px" }}
            >
              {data?.relevance_score}/10
            </p>
          )}
          <p className="text-lg">Relevance Score</p>
        </div>
      </div>

      <div
        ref={phrasesRef}
        className="p-5 md:p-10 rounded-2xl mt-6 border"
        style={{ boxShadow: "10px 5px 20px  #83838336" }}
      >
        <h4 className="text-xl italic font-bold">Shopping List</h4>
        {isLoading ? (
          <>
            <Skeleton count={2} />
            <Skeleton width={150} />
          </>
        ) : (
          <>
            <p className="text-lg italic mb-4 mt-6">{data?.first_engagement}</p>
            <p className="text-lg italic font-semibold">
              Select And Get Started
            </p>
          </>
        )}

        <div className="grid grid-cols-12 gap-4 w-full">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="col-span-12 md:col-span-3 bg-[#04102f] bg-[radial-gradient(#ffffff33_1px,#04102f_1px)] bg-[size:20px_20px] relative p-8 rounded-lg flex flex-col h-72 cursor-pointer border"
                  style={{ boxShadow: "10px 5px 20px  #83838336" }}
                >
                  <Skeleton height={50} />
                </div>
              ))
            : data?.category_lists?.map((item, index) => (
                <motion.div
                  key={index}
                  onClick={() => {
                    const state = {
                      product: item.product,
                      child_category: item.child_category,
                      parent_category: item.parent_category,
                      grand_child_category: item.grand_child_category,
                      search_phrase: item.search_phrase,
                    };
                    const encodedState = encodeURIComponent(
                      JSON.stringify(state)
                    );
                    router.push(`/search/products?query=${encodedState}`);
                  }}
                  className="col-span-12 md:col-span-3 bg-[#04102f] bg-[radial-gradient(#ffffff33_1px,#04102f_1px)] bg-[size:20px_20px] relative p-8 rounded-lg flex flex-col h-72 cursor-pointer transition-transform transform border hover:scale-105 mt-10"
                  layoutId={`card-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="w-5 h-5 absolute top-3 -right-0 bg-[#9c9c9c] border-black bo-2 rounded-full mr-4"></div>
                  <p
                    className="text-xl font-bold text-white mt-5 italic uppercase overflow-hidden"
                    style={{
                      letterSpacing: "2px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: "3rem",
                      lineHeight: "1.5rem",
                    }}
                  >
                    {item?.product}
                  </p>
                </motion.div>
              ))}
        </div>
        <a
          href="#"
          className="w-full flex justify-end font-bold text-lg italic items-center  mt-6 "
        >
          Add More To List <FaArrowRightLong className="ml-5" />
        </a>
      </div>
    </div>
  );
}

export default Understanding;
