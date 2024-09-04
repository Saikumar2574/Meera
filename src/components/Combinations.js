"use client";
import React, { useState } from "react";
import { getProductDetails } from "./service/getData";
import ProductDetails from "./ProductDetails";
import { HiCheckBadge } from "react-icons/hi2";

function Combinations({ list, selectedItems, setSelectedItems }) {
  const [isDetail, setIsDetail] = useState(false);
  const [product, setProduct] = useState(null);

  const fetchProductDetails = async (e, id) => {
    e.stopPropagation();
    setProduct(null);
    const res = await getProductDetails(id);
    if (res?.product) {
      console.log(res);
      setIsDetail(true);
      setProduct(res?.product);
    }
  };
  const handleCardClick = (card) => {
    setSelectedItems((prevSelectedCards) => {
      if (
        prevSelectedCards.some(
          (prevCard) => prevCard.product_id === card.product_id
        )
      ) {
        // If the card is already selected, remove it
        return prevSelectedCards.filter(
          (prevCard) => prevCard.product_id !== card.product_id
        );
      } else {
        // If the card is not selected, add it
        return [...prevSelectedCards, card];
      }
    });
  };
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1100px] w-full h-full p-6 flex flex-col relative">
          <section class="mt-10">
            <div class="mx-auto max-w-7xl">
              <div class="text-center lg:text-left flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Suggested Combinations
                </h2>
              </div>
              {list?.map((combination, index) => (
                <div className="mt-10">
                  <h4 class="text-xl font-bold text-gray-900 sm:text-2xl">
                    {combination.combination_name}
                  </h4>
                  <div
                    key={index}
                    class="flex-1 px-4 py-6 sm:p-6 lg:p-8 bg-gray-200 rounded-md mt-2"
                  >
                    <ul class="space-y-7">
                      {combination?.products?.map((item) => (
                        <li
                          class={`relative flex p-2 cursor-pointer ${
                            selectedItems?.some(
                              (selectedCard) =>
                                selectedCard?.product_id === item?.product_id
                            )
                              ? "ring-2 ring-blue-500 bg-white rounded-md"
                              : ""
                          }`}
                          key={item?.product_id}
                          onClick={() => handleCardClick(item)}
                        >
                          <div class="flex-shrink-0">
                            <img
                              class="object-cover rounded-lg w-28 h-28"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-1.png"
                              alt=""
                            />
                          </div>

                          <div class="flex flex-col justify-between flex-1 ml-5">
                            <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                              <div>
                                <p class="text-xl font-bold text-gray-900">
                                  {item.name}
                                </p>
                                <p class="mt-1.5 text-base font-medium text-gray-500">
                                  {item?.description}
                                </p>
                              </div>
                              <div class="mt-4 sm:mt-0">
                                <p class="text-base font-bold text-left text-gray-900 sm:text-right">
                                  {item?.currency_symbol +
                                    "" +
                                    item?.sale_price}
                                </p>
                              </div>
                            </div>

                            <div class="absolute bottom-0 left-0 sm:relative">
                              <div class="flex space-x-5 justify-between">
                                <button
                                  onClick={(e) =>
                                    fetchProductDetails(e, item?.product_id)
                                  }
                                  class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                >
                                  {" "}
                                  View Product{" "}
                                </button>
                              </div>
                            </div>
                          </div>
                          {selectedItems.some(
                            (selectedCard) =>
                              selectedCard.product_id === item?.product_id
                          ) && (
                            <HiCheckBadge
                              size={24}
                              className="absolute -top-2 -left-2 text-blue-500"
                            />
                          )}
                        </li>
                      ))}
                    </ul>

                    <hr class="mt-8 border-gray-200" />

                    <div class="flex items-end mt-8 space-x-5 justify-between">
                      <button
                        type="button"
                        class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                      >
                        Add Combination to Cart
                      </button>
                      <p className="text-xl font-bold">
                        Combination Total :{" "}
                        {combination?.products[0]?.currency_symbol +
                          "" +
                          combination.total}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ProductDetails
              open={isDetail}
              close={() => setIsDetail(false)}
              data={product}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Combinations;
