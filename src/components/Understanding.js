import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import GaugeChart from "react-gauge-chart";

function Understanding({ data, selectedPhrase, getProductList, phrasesRef }) {
  return (
    <div className="flex flex-col relative mt-8">
      <h2
        className="mt-30 ml-0 md:ml-6 text-xl font-bold sm:text-[40px] italic dark:text-white text-black leading-6  md:leading-[55px]"
      >
        Hey there,
        <br />
        this is what i could process ...
      </h2>
      <div className="grid grid-cols-12 gap-0 md:gap-8 mt-6 w-full">
        {/* 8-column layout */}
        <div
          className="col-span-12 md:col-span-8 bg-white p-5 md:p-10 rounded-2xl border"
          style={{ boxShadow: "10px 5px 20px  #83838336" }}
        >
          <h4 className="text-xl italic font-bold ">My Understanding</h4>
          <p className="text-lg italic my-4">{data?.search_summary}</p>
          <a
            href="#"
            className="w-full flex justify-end font-bold text-lg italic items-center"
          >
            Modify Search <FaArrowRightLong className="ml-5" />
          </a>
        </div>

        {/* 4-column layout */}
        <div
          className="col-span-12 md:col-span-4 mt-6 md:mt-0 bg-white p-5 md:p-10 rounded-2xl flex justify-center items-center flex-col border"
          style={{ boxShadow: "10px 5px 20px  #83838336" }}
        >
          <GaugeChart
            id="gauge-chart5"
            // nrOfLevels={420}
            // arcsLength={[0.3, 0.5, 0.2]}
            colors={["#EA4228", "#F5CD19", "#5BE12C"]}
            percent={data?.relevance_score===10 ? 1 :Number(`0.${data?.relevance_score}`)
            }
            arcPadding={0.02}
            hideText
            // animate={false}
          />
          <p
            className="text-4xl font-bold mt-5 italic"
            style={{ letterSpacing: "8px" }}
          >
            {data?.relevance_score}/10
          </p>
          <p className="text-lg">Relevence Score</p>
          {/* <GaugeChart id="gauge-chart1" hideText /> */}
        </div>
      </div>
      <div
        ref={phrasesRef}
        className="bg-white p-5 md:p-10  rounded-2xl mt-6 border"
        style={{ boxShadow: "10px 5px 20px  #83838336" }}
      >
        <h4 className="text-xl italic font-bold ">Shopping List</h4>
        <p className="text-lg italic mb-4 mt-6">{data?.first_engagement}</p>
        <p className="text-lg italic font-semibold">Select And Get Started</p>
        <div className="grid grid-cols-12 gap-4 w-full">
          {/* {data?.search_phrase?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhrase(item?.phrase)}
              className={`col-span-3 bg-[#04102f] relative 
                p-4 rounded-lg flex flex-col h-72 cursor-pointer transition-transform transform hover:scale-105 mt-10 `}
            >
              <div className="w-5 h-5 absolute top-3 -right-0 bg-gray-100 rounded-full mr-4"></div>
              <p className="text-xl font-bold text-white mt-5 italic">Helmets</p>
              <p className="text-lg  text-[#c7c7c7] italic mt-5">
                Motercycle Helmets For Mens
              </p>
              <p className=" absolute bottom-5 text-sm font-semibold  text-[#9c9c9c] italic">Quantity : 500</p>
            </div>
          ))} */}

          {data?.search_phrase?.map((item, index) => (
            <div
              key={index}
              onClick={() => getProductList(item?.phrase)}
              className={`col-span-12 md:col-span-3 bg-[#04102f] bg-[radial-gradient(#ffffff33_1px,#04102f_1px)] bg-[size:20px_20px] relative 
      p-8 rounded-lg flex flex-col h-72 cursor-pointer transition-transform transform border  hover:scale-105 mt-10`}
            >
              {/* Optional dynamic class based on selectedPhrase */}
              {/* ${selectedPhrase === item?.phrase ? "bg-black text-white" : "bg-gray-300 hover:bg-gray-400 text-black"} */}

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
                {item?.item}
              </p>
              <p className="text-lg text-[#c7c7c7] italic mt-5">
                {item?.phrase}
              </p>
              <p className="absolute bottom-5 text-sm font-semibold text-[#9c9c9c] italic">
                Quantity :{" "}
                {data?.possible_cart_items_with_quantity?.find(
                  (cart) => cart.item === item?.item
                )?.quantity || "N/A"}
              </p>
            </div>
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
