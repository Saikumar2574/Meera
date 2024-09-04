"use client";
import React, { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

function Search(props) {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <>
      <div>
        <div className="mx-auto max-w-7xl">
          <div className="text-center lg:text-left mb-6">
            <h2 className="text-xl font-bold text-gray-900 ">
              Active Conversations
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
            <div class="overflow-hidden bg-[#f6f0fa] shadow-md rounded-xl">
              <div class="p-7">
                <h3 class=" text-xl font-bold text-gray-900  font-pj">
                  Predictive Insights
                </h3>

                <p class="mt-3 text-base text-gray-600 font-pj">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Eleifend nullam consectetur.
                </p>
              </div>
            </div>
            <div class="overflow-hidden bg-[#f6f0fa] shadow-md rounded-xl">
              <div class="p-7">
                <h3 class=" text-xl font-bold text-gray-900  font-pj">
                  Predictive Insights
                </h3>

                <p class="mt-3 text-base text-gray-600 font-pj">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Eleifend nullam consectetur.
                </p>
              </div>
            </div>
            <div class="overflow-hidden bg-[#f6f0fa] shadow-md rounded-xl">
              <div class="p-7">
                <h3 class=" text-xl font-bold text-gray-900  font-pj">
                  Predictive Insights
                </h3>

                <p class="mt-3 text-base text-gray-600 font-pj">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Eleifend nullam consectetur.
                </p>
              </div>
            </div>
            <div class="overflow-hidden bg-[#f6f0fa] shadow-md rounded-xl">
              <div class="p-7">
                <h3 class=" text-xl font-bold text-gray-900  font-pj">
                  Predictive Insights
                </h3>

                <p class="mt-3 text-base text-gray-600 font-pj">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Eleifend nullam consectetur.
                </p>
              </div>
            </div>
            <div class="overflow-hidden bg-[#f6f0fa] shadow-md rounded-xl">
              <div class="p-7">
                <h3 class=" text-xl font-bold text-gray-900  font-pj">
                  Predictive Insights
                </h3>

                <p class="mt-3 text-base text-gray-600 font-pj">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Eleifend nullam consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
