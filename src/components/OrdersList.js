"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import moment from "moment";
import { getProductDetails } from "./service/getData";
import ProductDetails from "./ProductDetails";

function OrdersList({ list }) {
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
  return (
    <div className="h-full w-full overflow-y-auto">
    <div className="w-full flex items-center justify-center">
      <div className="max-w-[1100px] w-full h-full p-6 flex flex-col relative">
    <section class="mt-10 ">
      <div class="m-auto max-w-7xl">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            Orders ({list.length || 0})
          </h1>
          <p class="mt-2 text-md font-normal text-gray-600">
            Check the status of recent and old orders & discover more products
          </p>
          <Carousel opts={{ align: "start" }} className="w-full mt-8">
            <CarouselContent>
              {list?.map((order) => (
                <CarouselItem
                  key={order.order_id}
                  //   onClick={() => handleCardClick(card)}
                  className="md:basis-[100%] flex bg-gray-200 rounded-md"
                >
                  <div class="w-full border-b border-gray-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
                    <div class="px-4 py-6 sm:p-6 lg:p-8">
                      <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
                        <div>
                          <p class="text-md font-medium text-gray-500">
                            Order ID
                          </p>
                          <p class="text-md font-bold text-gray-900 mt-0.5">
                            #{order.order_id}
                          </p>
                        </div>

                        <div>
                          <p class="text-md font-medium text-gray-500">Date</p>
                          <p class="text-md font-bold text-gray-900 mt-0.5">
                            {moment(order.order_date).format("DD MMMM, YYYY")}
                          </p>
                        </div>

                        <div>
                          <p class="text-md font-medium text-gray-500">
                            Total Amount
                          </p>
                          <p class="text-md font-bold text-gray-900 mt-0.5">
                            {order.currency_symbol + "" + order.total_price}
                          </p>
                        </div>

                        <div>
                          <p class="text-md font-medium text-gray-500">
                            Order Status
                          </p>
                          <div class="mt-0.5 flex items-center">
                            {order.status === "completed" && (
                              <div className="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-green-500 mr-1.5">
                                <svg
                                  className="w-2 h-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                            {order.status === "processing" && (
                              <div className="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-yellow-400 mr-1.5">
                                <svg
                                  className="w-2 h-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </div>
                            )}
                            <span class="text-md font-bold text-gray-900 capitalize">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex-1 px-4 py-6 sm:p-6 lg:p-8">
                    <ul class="space-y-7">
                      {order?.items?.map((item) => (
                        <li
                          class="relative flex pb-10 sm:pb-0"
                          key={item.product_id}
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
                                <p class="mt-1.5 text-md font-medium text-gray-500">
                                  Qty : {item.quantity}
                                </p>
                              </div>

                              <div class="mt-4 sm:mt-0">
                                <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                                  {order.currency_symbol + "" + item.price}
                                </p>
                              </div>
                            </div>

                            <div class="absolute bottom-0 left-0 sm:relative">
                              <div class="flex space-x-5">
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
                        </li>
                      ))}
                    </ul>

                    <hr class="mt-8 border-gray-200" />

                    <div class="flex items-center mt-8 space-x-5">
                      <button
                        type="button"
                        class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                      >
                        View Order
                      </button>

                      <button
                        type="button"
                        class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                      >
                        View Invoice
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
              {/* <CarouselItem
                //   onClick={() => handleCardClick(card)}
                className="md:basis-[100%] flex bg-gray-200 rounded-md"
              >
                <div class="w-full border-b border-gray-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
                  <div class="px-4 py-6 sm:p-6 lg:p-8">
                    <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
                      <div>
                        <p class="text-md font-medium text-gray-500">
                          Order ID
                        </p>
                        <p class="text-md font-bold text-gray-900 mt-0.5">
                          #46199271460087
                        </p>
                      </div>

                      <div>
                        <p class="text-md font-medium text-gray-500">Date</p>
                        <p class="text-md font-bold text-gray-900 mt-0.5">
                          14 January, 2022
                        </p>
                      </div>

                      <div>
                        <p class="text-md font-medium text-gray-500">
                          Total Amount
                        </p>
                        <p class="text-md font-bold text-gray-900 mt-0.5">
                          $299
                        </p>
                      </div>

                      <div>
                        <p class="text-md font-medium text-gray-500">
                          Order Status
                        </p>
                        <div class="mt-0.5 flex items-center">
                          <div class="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-green-500 mr-1.5">
                            <svg
                              class="w-2 h-2"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span class="text-md font-bold text-gray-900">
                            {" "}
                            Delivered{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex-1 px-4 py-6 sm:p-6 lg:p-8">
                  <ul class="space-y-7">
                    <li class="relative flex pb-10 sm:pb-0">
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
                              Apple Watch Series 7
                            </p>
                            <p class="mt-1.5 text-md font-medium text-gray-500">
                              Golden
                            </p>
                          </div>

                          <div class="mt-4 sm:mt-0">
                            <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                              $359
                            </p>
                          </div>
                        </div>

                        <div class="absolute bottom-0 left-0 sm:relative">
                          <div class="flex space-x-5">
                            <a
                              href="#"
                              title=""
                              class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                              {" "}
                              View Product{" "}
                            </a>

                            <span class="text-gray-200"> | </span>

                            <a
                              href="#"
                              title=""
                              class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                              {" "}
                              Similar Product{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li class="relative flex pb-10 sm:pb-0">
                      <div class="flex-shrink-0">
                        <img
                          class="object-cover rounded-lg w-28 h-28"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-2.png"
                          alt=""
                        />
                      </div>

                      <div class="flex flex-col justify-between flex-1 ml-5">
                        <div class="sm:grid sm:grid-cols-2 sm:gap-x-5">
                          <div>
                            <p class="text-xl font-bold text-gray-900">
                              Beylob 90 Speaker
                            </p>
                            <p class="mt-1.5 text-md font-medium text-gray-500">
                              Space Gray
                            </p>
                          </div>

                          <div class="mt-4 sm:mt-0">
                            <p class="text-xl font-bold text-left text-gray-900 sm:text-right">
                              $49
                            </p>
                          </div>
                        </div>

                        <div class="absolute bottom-0 left-0 sm:relative">
                          <div class="flex space-x-5">
                            <a
                              href="#"
                              title=""
                              class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                              {" "}
                              View Product{" "}
                            </a>

                            <span class="text-gray-200"> | </span>

                            <a
                              href="#"
                              title=""
                              class="p-1 -m-1 text-md font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            >
                              {" "}
                              Similar Product{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <hr class="mt-8 border-gray-200" />

                  <div class="flex items-center mt-8 space-x-5">
                    <button
                      type="button"
                      class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                    >
                      View Order
                    </button>

                    <button
                      type="button"
                      class="inline-flex items-center justify-center px-4 py-2.5 text-md font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                    >
                      View Invoice
                    </button>
                  </div>
                </div>
              </CarouselItem> */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
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

export default OrdersList;
