import React, { useState } from "react";
import { Button, Drawer } from "flowbite-react";
import Checkout from "./Checkout";

function CompareList({ isOpen, onClose }) {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [cart, setCart] = React.useState([
    { id: 1, name: "Cozy Blanket", price: 29.99, quantity: 1 },
    { id: 2, name: "Autumn Mug", price: 12.99, quantity: 2 },
    { id: 3, name: "Fall Fragrance Candle", price: 16.99, quantity: 1 },
  ]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const deleteItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        position="right"
        className="min-w-[30vw] flex flex-col p-2 mt-0"
      >
        {/* <Drawer.Header titleIcon={() => <></>} title="" closeIcon={() => <></>} /> */}
        <div className="flex-grow overflow-y-auto p-2">
          <Drawer.Items className="h-full">
            <div class="h-full overflow-hidden flex flex-col  justify-between  bg-white">
              <div class="flex flex-col h-full">
                <div class="flex-shrink-0 px-4 py-5">
                  <div class="flex items-center justify-between">
                    <p class="text-base font-bold text-gray-900">
                      Compare List
                    </p>

                    <button
                      type="button"
                      onClick={onClose}
                      class="p-2 -m-2 text-gray-500 transition-all duration-200 bg-transparent rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <svg
                        class="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="flex-auto overflow-y-auto">
                  <div class="px-4 py-2 sm:px-6">
                    <div class="flow-root">
                      <ul class="-my-5 divide-y divide-gray-200 divide-dotted">
                        <li class="flex py-5">
                          <div class="flex-shrink-0">
                            <img
                              class="object-cover w-16 h-16 rounded-lg"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-popup/2/product-1.png"
                              alt=""
                            />
                          </div>

                          <div class="flex items-stretch justify-between flex-1 ml-5 space-x-5">
                            <div class="flex flex-col justify-between flex-1">
                              <p class="text-sm font-bold text-gray-900">
                                Apple Watch Series 7 - Golden Edition
                              </p>
                              
                            </div>

                            <div class="flex flex-col items-end justify-between">
                              <p class="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600">
                                $259.00
                              </p>

                              <button
                                type="button"
                                class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                              >
                                <svg
                                  class="w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>

                        <li class="flex py-5">
                          <div class="flex-shrink-0">
                            <img
                              class="object-cover w-16 h-16 rounded-lg"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-popup/2/product-2.png"
                              alt=""
                            />
                          </div>

                          <div class="flex items-stretch justify-between flex-1 ml-5 space-x-5">
                            <div class="flex flex-col justify-between flex-1">
                              <p class="text-sm font-bold text-gray-900">
                                Beoplay M5 Bluetooth Speaker
                              </p>
                              
                            </div>

                            <div class="flex flex-col items-end justify-between">
                              <p class="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600">
                                $46.50
                              </p>

                              <button
                                type="button"
                                class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                              >
                                <svg
                                  class="w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>

                        <li class="flex py-5">
                          <div class="flex-shrink-0">
                            <img
                              class="object-cover w-16 h-16 rounded-lg"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-popup/2/product-3.png"
                              alt=""
                            />
                          </div>

                          <div class="flex items-stretch justify-between flex-1 ml-5 space-x-5">
                            <div class="flex flex-col justify-between flex-1">
                              <p class="text-sm font-bold text-gray-900">
                                Beylob 90 Speaker
                              </p>
                              
                            </div>

                            <div class="flex flex-col items-end justify-between">
                              <p class="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600">
                                $219.00
                              </p>

                              <button
                                type="button"
                                class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                              >
                                <svg
                                  class="w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>

                        <li class="flex py-5">
                          <div class="flex-shrink-0">
                            <img
                              class="object-cover w-16 h-16 rounded-lg"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/cart-popup/2/product-2.png"
                              alt=""
                            />
                          </div>

                          <div class="flex items-stretch justify-between flex-1 ml-5 space-x-5">
                            <div class="flex flex-col justify-between flex-1">
                              <p class="text-sm font-bold text-gray-900">
                                Beoplay M5 Bluetooth Speaker
                              </p>
                              
                            </div>

                            <div class="flex flex-col items-end justify-between">
                              <p class="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600">
                                $149.00
                              </p>

                              <button
                                type="button"
                                class="inline-flex p-2 -m-2 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                              >
                                <svg
                                  class="w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Items>
        </div>
        <div class="mt-5 space-y-3">
          <button
            onClick={() => setOpenCheckout(true)}
            type="button"
            class="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
          >
            Compare
          </button>
        </div>
      </Drawer>
      <Checkout
        open={openCheckout}
        close={() => {
          onClose();
          setOpenCheckout(false);
        }}
      />
    </>
  );
}

export default CompareList;