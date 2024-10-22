"use client";
import React, { useEffect, useState } from "react";
import {
  addWishlist,
  deleteWishlist,
  getProductDetails,
  removeWishlistItem,
} from "./service/getData";
import ProductDetails from "./ProductDetails";
import { Drawer } from "flowbite-react";

function Whishlist({ isOpen, onClose, data, position = "right", getWishList }) {
  const [openProd, setOpenProd] = useState(false);
  const [product, setProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false); // State to toggle input visibility
  const [wishlistname, setWishlistName] = useState("");
  const [openSections, setOpenSections] = useState({});
  const handleCreateNewClick = () => {
    setIsCreating(true); // Show input field when "Create New" is clicked
  };

  const handleSaveClick = async () => {
    await addWishlist(wishlistname);
    getWishList();
    setWishlistName("");
    setIsCreating(false);
  };
  const fetchProductDetails = async (e, id) => {
    e.stopPropagation();
    setProduct(null);
    const res = await getProductDetails(id);
    if (res?.product) {
      setOpenProd(true);
      setProduct(res?.product);
    }
  };
  const toggleSection = (id) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const colse = () => {
    setOpenSections({});
    setWishlistName("");
    setIsCreating(false);
    onClose();
  };

  const removeItem = async (listId, prodId) => {
    const res = await removeWishlistItem(listId, prodId);
    if (res) {
      getWishList();
    }
  };
  const deleteList = async (listId) => {
    const res = await deleteWishlist(listId);
    if (res) {
      getWishList();
    }
  };

  return (
    <Drawer
      open={isOpen}
      onClose={colse}
      position={position}
      className="w-full md:w-[40%] xl:w-[30%] p-2 pb-20 md:pb-2"
    >
      <Drawer.Items>
        <div class="h-full overflow-hidden flex flex-col  justify-between  bg-white">
          <div class="flex flex-col h-full overflow-hidden">
            <div class="flex-shrink-0 px-4 py-5">
              <div class="flex items-center justify-between">
                <p class="text-lg md:text-2xl font-bold text-gray-900">
                  Wishlist
                </p>

                <button
                  type="button"
                  onClick={colse}
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
            <div className="p-4">
              {isCreating ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={wishlistname}
                    onChange={(e) => setWishlistName(e.target.value)}
                    placeholder="Name"
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none w-full"
                  />
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none "
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setWishlistName("");
                    }}
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <a
                  href="#"
                  onClick={handleCreateNewClick}
                  className="text-blue-600 hover:text-blue-800 w-full flex justify-end"
                >
                  + Create New
                </a>
              )}
            </div>
            <div className="flex-auto overflow-y-auto">
              <div className="px-4 py-2 sm:px-6">
                {data?.map((wishlist) => (
                  <div key={wishlist._id} className="mb-4">
                    {/* Accordion Header */}
                    <div
                      className="flex items-center justify-between cursor-pointer px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded relative group"
                      onClick={() => toggleSection(wishlist._id)}
                    >
                      <h2 className="text-lg font-bold text-gray-900 uppercase">
                        {wishlist.wishlist_name}
                      </h2>
                      <span className="text-sm flex">
                        <p className="mr-10 text-sm italic">
                          items: {wishlist.items.length}
                        </p>
                        {openSections[wishlist._id] ? "-" : "+"}
                      </span>

                      {/* Delete Button - Visible on Hover */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          deleteList(wishlist._id);
                        }}
                        className="absolute right-4 p-2 text-gray-500 bg-transparent rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        title="Delete Wishlist"
                      >
                        <svg
                          className="w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Accordion Body */}
                    {openSections[wishlist._id] && (
                      <div className="px-4 py-2 bg-white rounded-b">
                        {wishlist.items.length > 0 ? (
                          <ul className="divide-y divide-gray-200 divide-dotted">
                            {wishlist.items.map((item, index) => (
                              <li key={index} className="flex py-4">
                                <div
                                  className="flex flex-1 cursor-pointer"
                                  onClick={(e) =>
                                    fetchProductDetails(e, item._id)
                                  }
                                >
                                  <img
                                    className="object-cover w-16 h-16 rounded-lg"
                                    src={item.images?.[0]?.src}
                                    alt={item.name}
                                  />
                                  <div className="flex flex-col justify-between flex-1 ml-5">
                                    <p className="text-sm  font-bold text-gray-900">
                                      {item.name}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-stretch justify-between">
                                  <div className="flex flex-col items-end justify-between">
                                    <p className="flex-shrink-0 w-20 text-sm font-bold text-right text-gray-600">
                                      &#8377;{item.price}
                                    </p>
                                    <button
                                      onClick={() =>
                                        removeItem(wishlist._id, item._id)
                                      }
                                      type="button"
                                      className="inline-flex p-2 mt-4 text-gray-400 transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:text-gray-900"
                                    >
                                      <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No items in this wishlist.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {openProd && (
            <ProductDetails
              open={openProd}
              close={() => setOpenProd(false)}
              data={product}
            />
          )}
        </div>
      </Drawer.Items>
    </Drawer>
  );
}

export default Whishlist;
