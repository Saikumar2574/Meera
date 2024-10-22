import React, { useState } from "react";
import { Button, Drawer } from "flowbite-react";
import Checkout from "./Checkout";
import ProductDetails from "./ProductDetails";
import { addCart, getProductDetails, removeCart } from "./service/getData";
import Image from "next/image";

export default function Cart({
  isOpen,
  onClose,
  cartDetails,
  position = "right",
  getCartDetails,
}) {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [openProd, setOpenProd] = useState(false);
  const [product, setProduct] = useState(null);

  const fetchProductDetails = async (e, id) => {
    e.stopPropagation();
    setProduct(null);
    const res = await getProductDetails(id);
    if (res?.product) {
      setOpenProd(true);
      setProduct(res?.product);
    }
  };

  const increseQty = async (item) => {
    await addCart({ product_id: item.product_id }).then((res) => {
      if (res.error) {
        console.log("error in increseQty", res.error);
      } else {
        getCartDetails();
      }
    });
  };
  const decreseQty = async (item) => {
    await removeCart({
      product_id: item.product_id,
    }).then((res) => {
      if (res.error) {
        console.log("error in decreseQty", res.error);
      } else {
        getCartDetails();
      }
    });
  };

  const deleteItem = async (item) => {
    await removeCart({ product_id: item.product_id, quantity: 0 }).then(
      (res) => {
        if (res.error) {
          console.log("error in deleteItem", res.error);
        } else {
          getCartDetails();
        }
      }
    );
  };

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        position={position}
        className="w-full md:w-[40%] xl:w-[30%] flex flex-col p-2 mt-0 pb-20 md:pb-2"
      >
        {/* <Drawer.Header titleIcon={() => <></>} title="" closeIcon={() => <></>} /> */}
        <div className="flex-grow overflow-hidden h-full">
          <Drawer.Items className="h-full">
            <div class="h-full overflow-hidden flex flex-col  justify-between  bg-white">
              <div class="flex flex-col h-full overflow-hidden ">
                <div class="flex-shrink-0 px-4 py-5">
                  <div class="flex items-center justify-between">
                    <p class="text-lg md:text-2xl font-bold text-gray-900">
                      Shopping Cart
                    </p>

                    <button
                      type="button"
                      onClick={onClose}
                      class="p-2 -m-2 text-gray-500 transition-all duration-200 bg-transparent rounded-md bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
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
                <div class="flex-auto h-full overflow-y-auto">
                  <div class="px-4 py-2 sm:px-6">
                    <div class="flow-root">
                      <ul class="-my-5 divide-y divide-gray-200 divide-dotted">
                        {cartDetails?.items?.map((item) => (
                          <li
                            class="flex py-5 justify-between"
                            key={item?.product_id}
                          >
                            <div class="flex flex-1">
                              <Image
                                onClick={(e) =>
                                  fetchProductDetails(e, item?.product_id)
                                }
                                class="object-cover w-16 h-16 rounded-lg cursor-pointer"
                                src={item?.images?.[0]?.src}
                                alt={item?.name}
                                width={300}
                                height={300}
                                onError={(e) => {
                                  e.target.src =
                                    "https://dummyimage.com/300/09f/fff.png";
                                }}
                              />
                              <div class="flex flex-col justify-between flex-1 ml-5">
                                <p class="text-sm md:text-base font-semiblod text-gray-900">
                                  {item?.name}
                                </p>
                                <div class="flex items-center mt-1.5">
                                  <p class="text-sm font-medium text-gray-500">
                                    Qty:
                                  </p>
                                  <div class="flex items-center ml-2">
                                    {/* Decrease button */}
                                    <button
                                      type="button"
                                      onClick={() => decreseQty(item)}
                                      class="flex items-center justify-center w-6 h-6 bg-gray-200 text-gray-600 rounded-l-md hover:bg-gray-300 focus:outline-none"
                                    >
                                      <svg
                                        class="w-3 h-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M18 12H6"
                                        />
                                      </svg>
                                    </button>
                                    {/* Quantity display */}
                                    <span class="px-4 text-sm font-medium text-gray-700">
                                      {item?.quantity}
                                    </span>
                                    {/* Increase button */}
                                    <button
                                      type="button"
                                      onClick={() => increseQty(item)}
                                      class="flex items-center justify-center w-6 h-6 bg-gray-200 text-gray-600 rounded-r-md hover:bg-gray-300 focus:outline-none"
                                    >
                                      <svg
                                        class="w-3 h-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M12 6v12m6-6H6"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="flex items-stretch justify-between">
                              <div class="flex flex-col items-end justify-between">
                                <p class="flex-shrink-0 w-20 text-sm md:text-base font-bold text-right text-gray-600">
                                  &#8377;{item?.price}
                                </p>

                                {/* <button
                                  type="button"
                                  onClick={() => deleteItem(item)}
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
                                </button> */}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-4 py-5 border-t border-gray-200 sm:p-6">
                <ul class="space-y-4">
                  <li class="flex items-center justify-between">
                    <p class="text-lg md:text-xl font-bold text-gray-900">
                      Total
                    </p>
                    <p class="text-sm md:text-lg font-bold text-gray-900">
                      &#8377;{cartDetails?.cart_total || 0}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </Drawer.Items>
        </div>
        <div class=" space-y-3">
          <button
            onClick={() => setOpenCheckout(true)}
            type="button"
            class="inline-flex items-center justify-center w-full px-4 py-2 md:px-6 md:py-4 text-sm md:text-xl font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
          >
            Checkout
          </button>

          <button
            type="button"
            class="inline-flex items-center justify-center w-full px-4 py-2 md:px-6 md:py-4 text-sm md:text-xl font-bold text-gray-900 transition-all duration-200 bg-transparent border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200 focus:bg-gray-200"
          >
            Continue Shopping
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
      {openProd && (
        <ProductDetails
          open={openProd}
          close={() => setOpenProd(false)}
          data={product}
        />
      )}
    </>
  );
}
