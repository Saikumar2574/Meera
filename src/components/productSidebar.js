"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteShortListedItem, getConversations } from "./service/getData";
import {
  fetchShortlistItems,
  setSelectedIds,
} from "@/lib/redux/reducer/productReducer";
import Link from "next/link";
import { logout } from "@/lib/redux/reducer/authReducer";
import Auth from "./Auth";
import { MdPerson, MdPushPin } from "react-icons/md";
import { motion } from "framer-motion";
import Image from "next/image";
import { RiChat1Line, RiDeleteBinLine } from "react-icons/ri";
import { BsChatSquareTextFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { FaRectangleList } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";

function ProductSidebar({ breadcrumbArray, page }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState("");
  const token = useSelector((state) => state.auth?.token || null);
  const pinnedProducts = useSelector((state) => state.products?.selectedIds);
  const shortList = useSelector((state) => state.products?.shortList);
  const [showAuth, setShowAuth] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [conversations, setConversations] = useState(null);
  const fetchConversations = async () => {
    await getConversations().then((res) => {
      console.log(res);
      setConversations(res.histories);
    });
  };
  const handleRemovePinnedItem = (id) => {
    const resetProsucts = pinnedProducts.filter((item) => {
      if (item?.productId) {
        return item.productId !== id;
      }
    });
    dispatch(setSelectedIds(resetProsucts));
  };

  const handleDeleteShortlist = async (shortlistId, prodId) => {
    await deleteShortListedItem({
      shortlist_id: shortlistId,
      product_id: prodId,
    }).then((res) => {
      dispatch(fetchShortlistItems());
    });
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? "" : section));
  };

  // Effect to expand Pinned Items section if a new item is added

  useEffect(() => {
    if (pinnedProducts && pinnedProducts.length > 0) {
      setOpenSection("pinned");
    }
  }, [pinnedProducts]);

  // Effect to expand Shortlisted Items section if a new item is added
  useEffect(() => {
    if (shortList?.items && shortList.items?.length > 0) {
      setOpenSection("shortlisted");
    }
  }, [shortList]);

  useEffect(() => {
    if (pathname.startsWith("/shop/history")) {
      setOpenSection("conversations");
      const parts = pathname.split("/").filter((part) => part !== "");
      setSessionId(parts[2]);
    }
  }, [pathname]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const rotateAnimation = {
    open: { rotate: 0 },
    closed: { rotate: 180 },
  };

  const renderLists = () => {
    return (
      <div className="mt-auto pl-8 pr-1">
        {/* Pinned Items Section */}
        <div>
          <div
            className="font-bold flex justify-between items-center cursor-pointer mr-6"
            onClick={() => toggleSection("pinned")}
          >
            <MdPushPin size={22} className="mr-2" />
            Pinned Items ({pinnedProducts?.length || 0})
            <motion.div
              animate={openSection === "pinned" ? "open" : "closed"}
              variants={rotateAnimation}
              className="ml-auto"
            >
              <FiChevronDown size={20} />
            </motion.div>
          </div>
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: openSection === "pinned" ? "auto" : 0,
            }}
            className="overflow-hidden"
          >
            <div className="max-w-full mb-6 mr-5">
              {/* Pinned Products */}
              <div
                className="my-4 flex flex-col gap-4 overflow-y-auto hide-scrollbar"
                style={{ maxHeight: "300px" }}
              >
                {pinnedProducts && pinnedProducts.length > 0 ? (
                  pinnedProducts?.map((item) => (
                    <div
                      key={item.productId}
                      className="rounded-md group relative flex-shrink-0 flex w-full h-[80px] bg-gray-200 p-4 gap-2"
                    >
                      <Image
                        width={60}
                        height={60}
                        className="rounded-md w-14 h-14"
                        src={item.images ? item.images[0].src : item.image}
                      />
                      <div>
                        <p className="text-sm font-semibold line-clamp-2 overflow-hidden text-ellipsis w-full">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-400 italic font-semibold">
                          &#8377;{item.price}
                        </p>
                      </div>
                      <button
                        className="hidden group-hover:block ml-auto"
                        onClick={() => handleRemovePinnedItem(item.productId)}
                      >
                        <RiDeleteBinLine color="red" size={18} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No pinned products available.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <hr className="w-[90%] h-[2px] bg-[#c6c6c6] my-4 border-none" />

        {/* Conversations Section */}
        <div>
          <div
            className="font-bold flex  justify-between items-center cursor-pointer mr-6"
            onClick={() => toggleSection("conversations")}
          >
            <BsChatSquareTextFill size={22} className="mr-2" />
            Conversations
            <motion.div
              animate={openSection === "conversations" ? "open" : "closed"}
              variants={rotateAnimation}
              className="ml-auto"
            >
              <FiChevronDown size={20} />
            </motion.div>
          </div>
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: openSection === "conversations" ? "auto" : 0,
            }}
            className="overflow-hidden"
          >
            <div className="max-w-full mb-6 mr-5">
              <div
                className="my-4 flex flex-col gap-4 overflow-y-auto hide-scrollbar"
                style={{ maxHeight: "300px" }}
              >
                {conversations?.map((item) => (
                  <div
                    key={item.session_id}
                    onClick={() =>
                      router.push(`/${page}/history/${item.session_id}`)
                    }
                    className={`rounded-xl relative group p-4 min-w-[200px] cursor-pointer ${
                      sessionId === item.session_id
                        ? "bg-[#04102f] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RiChat1Line size={22} />
                      <p className="font-semibold text-sm line-clamp-2 overflow-hidden text-ellipsis">
                        Title
                      </p>
                      <button className="hidden group-hover:block ml-auto">
                        <RiDeleteBinLine color="red" size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                {/* <div
                  onClick={() => router.push(`/history/123`)}
                  className={`rounded-xl relative group p-4 min-w-[200px] cursor-pointer bg-gray-200`}
                >
                  <div className="flex items-center gap-4">
                    <RiChat1Line size={22} />
                    <p className="font-semibold text-sm line-clamp-2 overflow-hidden text-ellipsis">
                      get more details about this product.
                    </p>
                    <button className="hidden group-hover:block ml-auto">
                      <RiDeleteBinLine color="red" size={18} />
                    </button>
                  </div>
                </div>
                <div
                  onClick={() => router.push(`/history/111`)}
                  className={`rounded-xl relative group p-4 min-w-[200px] cursor-pointer bg-gray-200 `}
                >
                  <div className="flex items-center gap-4">
                    <RiChat1Line size={22} />
                    <p className="font-semibold text-sm line-clamp-2 overflow-hidden text-ellipsis">
                      Compare this two products.
                    </p>
                    <button className="hidden group-hover:block ml-auto">
                      <RiDeleteBinLine color="red" size={18} />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </motion.div>
        </div>

        <hr className="w-[90%] h-[2px] bg-[#c6c6c6] my-4 border-none" />

        {/* Shortlisted Items Section */}
        <div>
          <div
            className="font-bold flex justify-between items-center cursor-pointer mr-6"
            onClick={() => toggleSection("shortlisted")}
          >
            <FaRectangleList size={22} className="mr-2" />
            Shortlisted Items ({shortList?.items.length})
            <motion.div
              animate={openSection === "shortlisted" ? "open" : "closed"}
              variants={rotateAnimation}
              className="ml-auto"
            >
              <FiChevronDown size={20} />
            </motion.div>
          </div>
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: openSection === "shortlisted" ? "auto" : 0,
            }}
            className="overflow-hidden"
          >
            <div className="max-w-full mb-6 mr-5">
              <div
                className={`my-4 flex flex-col  gap-4  overflow-y-auto hide-scrollbar`}
                style={{ maxHeight: "300px" }}
              >
                {shortList?.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-md group relative flex-shrink-0 flex w-full h-[80px] bg-gray-200 p-4 gap-2"
                  >
                    <Image
                      width={60}
                      height={60}
                      className="rounded-md w-14 h-14"
                      src={item.images?.[0].src}
                    />
                    <div>
                      <p className="text-sm font-semibold line-clamp-2 overflow-hidden text-ellipsis w-full">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-400 italic font-semibold">
                        &#8377;{item.price}
                      </p>
                    </div>
                    <button
                      className="hidden group-hover:block ml-auto"
                      onClick={() =>
                        handleDeleteShortlist(shortList._id, item.product_id)
                      }
                    >
                      <RiDeleteBinLine color="red" size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`relative hidden xl:block h-full transition-transform duration-300   w-[20%] xl:w-[25%] 4xl:w-[20%]  overflow-hidden`}
    >
      <Auth openModal={showAuth} onCloseModal={() => setShowAuth(false)} />
      <div className="bg-[#f4f4f4] rounded-tr-[20px] h-full w-full rounded-br-[20px]  pb-4 pt-2 flex flex-col">
        <div className="px-8">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" prefetch={false}>
              <img
                src="https://gearnride.in/wp-content/uploads/2023/04/GNR-Shop-SVG-2.svg"
                className="w-28 md:w-32 md:h-16"
                alt="Shop Logo"
              />
            </Link>
            {token ? (
              <button
                onClick={() => dispatch(logout())}
                className="rounded-full bg-gray-200"
              >
                <img src="/avatar.png" className="w-12 h-12" alt="Shop Logo" />
              </button>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className=" flex text-black  hover:text-gray-600    font-semibold text-lg   rounded-full md:rounded-full"
              >
                <MdPerson size={26} />
                <span className="hidden md:inline ml-3">Login</span>
              </button>
            )}
          </div>
          <div>
            <h6 className="italic text-gray-500 font-bold text-sm mb-2">
              Meera insights
            </h6>
            <p className="font-bold text-xl italic">
              You can select from board list of categories
            </p>
          </div>
        </div>
        {!pathname.includes("/shop/history") && breadcrumbArray
          ? breadcrumbArray.some((item) => item.level === "grandchild")
            ? renderLists()
            : null
          : renderLists()}
      </div>
    </div>
  );
}

export default ProductSidebar;
