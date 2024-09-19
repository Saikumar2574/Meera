import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function OrderConfirm(props) {
  return (
    <section class="bg-white">
      <div class="px-2 mx-auto lg:px-8 max-w-7xl pb-14 md:pb-0">
        <div class="text-center">
          <p class="text-xs font-bold tracking-widest text-gray-400 uppercase">
            Thank you
          </p>
          <div className="flex items-center mt-3 justify-center">
            <FaCheckCircle className="text-green-600 mr-2 text-xl md:text-3xl" />
            <h1 className="text-sm md:text-2xl font-bold text-gray-900 sm:text-3xl">
              Your order is confirmed
            </h1>
          </div>
        </div>

        <div class="max-w-5xl mx-auto mt-8 md:mt-12">
          <div class="overflow-hidden bg-white shadow rounded-xl">
            <div class="grid grid-cols-1 md:grid-cols-2 md:divide-x-4 md:divide-gray-50">
              <div class="px-5 py-6 md:px-8">
                <div class="flow-root md:max-w-xs">
                  <div class="-my-6 divide-y divide-gray-200">
                    <div class="py-6">
                      <h2 class="font-bold text-gray-900 texts-sm">
                        Order Info
                      </h2>
                      <p class="mt-4 text-sm font-normal text-gray-600">
                        Order number:{" "}
                        <span class="text-gray-900">#9483003</span>
                      </p>
                      <p class="mt-1 text-sm font-normal text-gray-600">
                        Date: January 23, 2022
                      </p>

                      <div class="mt-4">
                        <button
                          type="button"
                          class="inline-flex items-center justify-center px-4 py-3 text-xs font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200"
                        >
                          View invoice
                        </button>
                      </div>
                    </div>

                    <div class="py-6">
                      <h2 class="font-bold text-gray-900 texts-sm">
                        Shipping Address
                      </h2>
                      <p class="mt-4 text-sm font-normal text-gray-600">
                        Wilson Baker
                      </p>
                      <p class="mt-3 text-sm font-normal text-gray-600">
                        4517 Washington Ave. Manchester, Kentucky 39495, USA
                      </p>
                      <p class="mt-3 text-sm font-normal text-gray-600">
                        +1-304-5938
                      </p>
                    </div>

                    <div class="py-6">
                      <h2 class="font-bold text-gray-900 texts-sm">
                        Payment Method
                      </h2>
                      <div class="flex items-start mt-4">
                        <img
                          class="flex-shrink-0 w-6 h-6"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-confirmation/1/master-card-logo.png"
                          alt=""
                        />
                        <div class="ml-2.5">
                          <p class="text-sm font-normal text-gray-600">
                            Ending with 3990
                          </p>
                          <p class="mt-1 text-sm font-normal text-gray-600">
                            Expires 08/23
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-5 py-6 md:px-8">
                <h3 class="font-bold text-gray-900 texts-sm">Ordered Items</h3>

                <div class="flow-root mt-5">
                  <ul class="divide-y divide-gray-200 -my-7">
                    <li class="py-7">
                      <div class="relative flex items-start">
                        <div class="flex-shrink-0">
                          <img
                            class="object-cover w-20 h-20 rounded-lg"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-confirmation/1/product-1.png"
                            alt=""
                          />
                        </div>

                        <div class="flex flex-col justify-between ml-5 sm:pr-16">
                          <div class="flex-1">
                            <p class="text-sm font-bold text-gray-900">
                              Apple Watch Series 7
                            </p>
                            <p class="mt-1.5 text-sm font-medium text-gray-500">
                              Golden
                            </p>
                          </div>
                          <p class="mt-4 text-sm font-medium text-gray-500">
                            x 1
                          </p>
                        </div>

                        <div class="absolute bottom-0 right-0 sm:top-0 sm:bottom-auto">
                          <p class="text-sm font-bold text-right text-gray-900">
                            $319
                          </p>
                        </div>
                      </div>
                    </li>

                    <li class="py-7">
                      <div class="relative flex items-start">
                        <div class="flex-shrink-0">
                          <img
                            class="object-cover w-20 h-20 rounded-lg"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-confirmation/1/product-2.png"
                            alt=""
                          />
                        </div>

                        <div class="flex flex-col justify-between ml-5 sm:pr-16">
                          <div class="flex-1">
                            <p class="text-sm font-bold text-gray-900">
                              Beylob 90 Speaker
                            </p>
                            <p class="mt-1.5 text-sm font-medium text-gray-500">
                              Space Gray
                            </p>
                          </div>
                          <p class="mt-4 text-sm font-medium text-gray-500">
                            x 1
                          </p>
                        </div>

                        <div class="absolute bottom-0 right-0 sm:top-0 sm:bottom-auto">
                          <p class="text-sm font-bold text-right text-gray-900">
                            $59
                          </p>
                        </div>
                      </div>
                    </li>

                    <li class="py-7">
                      <div class="relative flex items-start">
                        <div class="flex-shrink-0">
                          <img
                            class="object-cover w-20 h-20 rounded-lg"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-confirmation/1/product-3.png"
                            alt=""
                          />
                        </div>

                        <div class="flex flex-col justify-between ml-5 sm:pr-16">
                          <div class="flex-1">
                            <p class="text-sm font-bold text-gray-900">
                              Beoplay M5 Bluetooth Speaker
                            </p>
                            <p class="mt-1.5 text-sm font-medium text-gray-500">
                              Gray
                            </p>
                          </div>
                          <p class="mt-4 text-sm font-medium text-gray-500">
                            x 1
                          </p>
                        </div>

                        <div class="absolute bottom-0 right-0 sm:top-0 sm:bottom-auto">
                          <p class="text-sm font-bold text-right text-gray-900">
                            $99
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <hr class="mt-6 border-gray-200" />

                <ul class="mt-5 space-y-3">
                  <li class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-600">Sub total</p>
                    <p class="text-sm font-medium text-gray-600">$499</p>
                  </li>

                  <li class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">Total</p>
                    <p class="text-sm font-bold text-gray-900">$499</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderConfirm;
