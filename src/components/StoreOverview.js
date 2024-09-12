import { Modal } from "flowbite-react";
import React from "react";

function StoreOverview({ open, close }) {
  return (
    <Modal
      show={open}
      size="full"
      theme={{
        content: {
          base: "relative  h-full md:h-[90%] w-[900px]",
          inner:
            "relative flex max-h-full flex-col bg-[#edf1f8] shadow dark:bg-gray-700 h-full rounded-none md:rounded-lg",
        },
      }}
      onClose={close}
      popup
    >
      <Modal.Header
        theme={{
          base: "flex items-center justify-between rounded-t border-b p-5 m-3 dark:border-gray-600",
          close: {
            base: "ml-auto inline-flex items-center rounded-lg  p-1.5 text-sm text-white bg-black dark:hover:bg-gray-600 dark:hover:text-white",
          },
        }}
      />

      <Modal.Body>
        <section className=" h-full  w-full p-0 md:p-5 pb-20">
          <h2 className="font-bold text-3xl">
            Capabilities of a Virtual Assistant in Interactive Shopping:
          </h2>
          <div className="mt-6">
            <h5 className="font-bold text-xl">
              1. Personalized Shopping Experience
            </h5>
            <div className="p-4">
              <h6 className="font-bold text-gray-800 italic  text-lg">
                Understanding Shopper Intent:
              </h6>
              <p className="text-lg">
                The assistant interprets customer needs from vague inputs and
                provides specific recommendations, even suggesting complementary
                products.
              </p>
            </div>
            <div className="p-4">
              <h6 className="font-bold text-gray-800 italic  text-lg">
                Profile Management:
              </h6>
              <p className="text-lg">
                Helps customers set up and update their preferences, style
                choices, and past purchases to continuously refine future
                recommendations.
              </p>
            </div>
            <div className="p-4">
              <h6 className="font-bold text-gray-800 italic  text-lg">
                Behavioral Learning:
              </h6>
              <p className="text-lg">
                Learns from user behavior, improving product suggestions and
                interactions based on historical data, shopping habits, and
                preferences.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h5 className="font-bold text-xl">
              2. Product Discovery and Recommendations
            </h5>
            <div className="p-4">
              <h6 className="font-bold text-gray-800 italic  text-lg">
                Curated Lists:
              </h6>
              <p className="text-lg">
                Offers personalized shopping lists based on trends, user
                preferences, seasons, or special events.
              </p>
            </div>
            <div className="p-4">
              <h6 className="font-bold text-gray-800 italic  text-lg">
                Product Customization:
              </h6>
              <p className="text-lg">
                Assists in configuring products to user specifications, such as
                color, size, material, or other customizations for tailored
                items.
              </p>
            </div>
            <div className="p-4">
              <h6 className="font-bold text-gray-800 italic  text-lg">
                Cross-Selling & Up-Selling:
              </h6>
              <p className="text-lg">
                Suggests related products, accessories, or premium versions of
                selected items to enhance the shopping basket.
              </p>
            </div>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}

export default StoreOverview;
