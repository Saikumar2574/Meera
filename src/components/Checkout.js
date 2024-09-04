import { Modal } from "flowbite-react";
import React, { useState } from "react";
import {
  FaAddressBook,
  FaCreditCard,
  FaMoneyCheckAlt,
  FaShippingFast,
} from "react-icons/fa";
import OrderConfirm from "./OrderConfirm";

function Checkout({ open, close }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const stepIcons = [
    { icon: <FaAddressBook />, label: "Contact" },
    { icon: <FaCreditCard />, label: "Billing" },
    { icon: <FaShippingFast />, label: "Shipping" },
    { icon: <FaMoneyCheckAlt />, label: "Payment" },
  ];

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="font-bold text-gray-900 text-base">
              Contact Information
            </h2>
            <form action="#" className="mt-6">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    First & Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter first & last name"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter email address"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                  >
                    Continue to Next
                  </button>
                </div>
              </div>
            </form>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="font-bold text-gray-900 text-base">
              Billing Information
            </h2>
            <form action="#" className="mt-6">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Billing Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter billing address"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter city"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    State
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter state"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Postal Code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter postal code"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                >
                  Continue to Next
                </button>
                <button
                  type="button"
                  onClick={prevStep}
                  className="mr-2 inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-gray-900 transition-all duration-200 bg-gray-200 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-300"
                >
                  Back
                </button>
              </div>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="font-bold text-gray-900 text-base">
              Shipping Information
            </h2>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <label className="flex items-center text-sm text-gray-600">
                Same as Billing Address
              </label>
            </div>
            <form action="#" className="mt-6">
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter shipping address"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter city"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    State
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter state"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Postal Code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Enter postal code"
                      className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-gray-50 caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                >
                  Continue to Next
                </button>
                <button
                  type="button"
                  onClick={prevStep}
                  className="mr-2 inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-gray-900 transition-all duration-200 bg-gray-200 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-300"
                >
                  Back
                </button>
              </div>
            </form>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="font-bold text-gray-900 text-base">
              Payment Method
            </h2>
            <div className="space-y-5 mt-6">
              <div className="p-4 border rounded-lg shadow-md bg-white">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    value="rozarpay"
                    className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                  />
                  <span className="ml-2 text-sm text-gray-600">Rozarpay</span>
                </label>
              </div>

              <div className="p-4 border rounded-lg shadow-md bg-white">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    value="stripe"
                    className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                  />
                  <span className="ml-2 text-sm text-gray-600">Stripe</span>
                </label>
              </div>
              <div className="p-4 border rounded-lg shadow-md bg-white">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    value="wallet"
                    className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                  />
                  <span className="ml-2 text-sm text-gray-600">Wallet</span>
                </label>
              </div>
              <button
                onClick={() => setPaymentSuccess(true)}
                className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
              >
                Complete Payment
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="mr-2 inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold text-gray-900 transition-all duration-200 bg-gray-200 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-300"
              >
                Back
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Modal
        show={open}
        size="full"
        theme={{
          content: {
            base: "relative h-full w-full",
            inner:
              "relative flex max-h-full flex-col bg-white shadow dark:bg-gray-700 h-full",
          },
          body:{
            base:"p-2 md:p-6 flex-1 overflow-auto"
          }
        }}
        onClose={close}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          {!paymentSuccess ? (
            <section className="bg-white  pb-20 md:pb-0">
              <div className="mx-auto px-0 lg:px-8 max-w-7xl">
                <div className="max-w-4xl mx-auto mt-8 md:mt-12">
                  <div className="overflow-hidden bg-white shadow rounded-none md:rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="px-4 py-6 bg-gray-100 md:px-8">
                        <div className="flow-root">
                          <ul class="divide-y divide-gray-200 -my-7">
                            <li class="flex items-stretch justify-between space-x-5 py-7">
                              <div class="flex items-stretch flex-1">
                                <div class="flex-shrink-0">
                                  <img
                                    class="w-20 h-20 border border-gray-200 rounded-lg"
                                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/2/product-1.png"
                                    alt=""
                                  />
                                </div>

                                <div class="flex flex-col justify-between ml-5">
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
                              </div>

                              <div class="flex flex-col items-end justify-between ml-auto">
                                <p class="text-sm font-bold text-right text-gray-900">
                                  $319
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
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </li>

                            <li class="flex items-stretch justify-between space-x-5 py-7">
                              <div class="flex items-stretch flex-1">
                                <div class="flex-shrink-0">
                                  <img
                                    class="w-20 h-20 border border-gray-200 rounded-lg"
                                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/2/product-2.png"
                                    alt=""
                                  />
                                </div>

                                <div class="flex flex-col justify-between ml-5">
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
                              </div>

                              <div class="flex flex-col items-end justify-between ml-auto">
                                <p class="text-sm font-bold text-right text-gray-900">
                                  $59
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
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </li>

                            <li class="flex items-stretch justify-between space-x-5 py-7">
                              <div class="flex items-stretch flex-1">
                                <div class="flex-shrink-0">
                                  <img
                                    class="w-20 h-20 border border-gray-200 rounded-lg"
                                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/2/product-3.png"
                                    alt=""
                                  />
                                </div>

                                <div class="flex flex-col justify-between ml-5">
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
                              </div>

                              <div class="flex flex-col items-end justify-between ml-auto">
                                <p class="text-sm font-bold text-right text-gray-900">
                                  $99
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
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <hr className="mt-6 border-gray-200" />

                        <form action="#" className="mt-6">
                          <div className="sm:flex sm:space-x-2.5 md:flex-col lg:flex-row md:space-x-0 lg:space-x-2.5">
                            <div className="flex-grow">
                              <label className="sr-only">Coupon code</label>
                              <input
                                type="text"
                                placeholder="Enter coupon code"
                                className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                              />
                            </div>
                            <div className="mt-4 sm:mt-0 md:mt-4 lg:mt-0">
                              <button
                                type="submit"
                                className="items-center justify-center w-full px-4 py-3 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-md inline- focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                              >
                                Apply coupon
                              </button>
                            </div>
                          </div>
                        </form>

                        <ul className="mt-6 space-y-3">
                          <li className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-600">
                              Sub total
                            </p>
                            <p className="text-sm font-medium text-gray-600">
                              $499
                            </p>
                          </li>

                          <li className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              Total
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              $499
                            </p>
                          </li>
                        </ul>
                      </div>

                      {/* Information div with stepper and form content */}
                      <div className="px-5 py-6 md:px-8">
                        <div className="flow-root">
                          <ul className="flex items-center space-x-4 justify-evenly">
                            {stepIcons.map((step, index) => (
                              <li
                                key={index}
                                className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                                  currentStep >= index
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                              >
                                {step.icon}
                                {index < stepIcons.length - 1 && (
                                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-14 h-0.5 bg-gray-300"></div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-8">{renderStepContent()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <OrderConfirm />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Checkout;
