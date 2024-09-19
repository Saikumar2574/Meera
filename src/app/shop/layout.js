"use client";
import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useRouter, usePathname } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import {
  HiOutlineHeart,
  HiOutlineSearch,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import Cart from "@/components/Cart";
import Whishlist from "@/components/Whishlist";
import {
  getCartDetails,
  getHistory,
  getWhishlistDetails,
} from "@/components/service/getData";
import { MdOutlinePerson } from "react-icons/md";
import { Drawer } from "flowbite-react";
import Search from "@/components/Search";

const ShopLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isSidebarOpen = true;
  const [breadcrumbArray, setBreadcrumbArray] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [openWishList, setOpenWishList] = useState(false);
  const [wishtList, setWishtList] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => router.push("/"),
    },

    {
      title: "Wishlist",
      icon: (
        <HiOutlineHeart className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => getWishList(),
    },
    {
      title: "Cart",
      icon: (
        <HiOutlineShoppingCart className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => toggleCart(),
    },
    {
      title: "Search",
      icon: (
        <HiOutlineSearch className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => setIsSearch(true),
    },
  ];

  // Function to capitalize words
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Generate breadcrumbs based on the current route
  useEffect(() => {
    const pathSegments = pathname.split("/").filter((segment) => segment);

    const generatedBreadcrumb = pathSegments.map((segment, index) => ({
      name: capitalizeWords(segment),
      level:
        index === 0
          ? "root"
          : index === 1
          ? "parent"
          : index === 2
          ? "child"
          : "grandchild",
      url: "/" + pathSegments.slice(0, index + 1).join("/"),
    }));

    setBreadcrumbArray(generatedBreadcrumb);
  }, [pathname]);

  // Breadcrumb Click Logic
  const handleBreadcrumbClick = (item) => {
    router.push(item.url); // Navigate to the clicked breadcrumb's URL
  };

  const toggleCart = async () => {
    const res = await getCartDetails();
    if (res) {
      setCartDetails(res);
      setOpenCart(true);
    }
  };

  const getWishList = async () => {
    const res = await getWhishlistDetails();
    if (res?.wishlists) {
      setWishtList(res?.wishlists);
      setOpenWishList(true);
    }
  };

  const fetchHistory = async () => {
    const res = await getHistory();
    if (res) {
      setIsSearch(true);
    }
  };

  return (
    <div className="w-full flex h-full">
      <div className="flex flex-1 overflow-hidden">
        <motion.div
          className={`relative h-full transition-transform duration-300 pr-6 ${
            isSidebarOpen ? "w-[360px] h-full" : "w-0"
          } overflow-hidden`}
        >
          <div className="bg-[#200042] rounded-tr-3xl h-full w-full rounded-br-3xl text-white p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <Link href="/" prefetch={false}>
                <img
                  src="https://gearnride.in/wp-content/uploads/2023/04/GNR-Shop-SVG-2.svg"
                  className="w-28 md:w-32 md:h-16"
                  alt="Shop Logo"
                />
              </Link>
              <button className="p-1 rounded-full bg-gray-200">
                <MdOutlinePerson
                  size={30}
                  className="h-full w-full text-neutral-500 dark:text-neutral-300"
                />
              </button>
            </div>

            {/* Breadcrumb */}
            <div className="p-4 text-white capitalize text-base font-semibold italic">
              {breadcrumbArray.length > 1 &&
                breadcrumbArray.map((item, index) => {
                  const decodedName = decodeURIComponent(
                    item.name === "Shop" ? "Home" : item.name
                  );

                  return (
                    <React.Fragment key={index}>
                      <span
                        className={`cursor-pointer capitalize ${
                          index < breadcrumbArray.length - 1
                            ? "text-blue-500"
                            : "text-white"
                        }`}
                        onClick={() => handleBreadcrumbClick(item)}
                      >
                        {decodedName}
                      </span>
                      {index < breadcrumbArray.length - 1 && " | "}
                    </React.Fragment>
                  );
                })}
            </div>
            <div className="mt-auto">
              <FloatingDock items={links} />
            </div>
          </div>
        </motion.div>
        <div className="flex-1 w-full flex flex-col transition-all duration-300">
          <main id="scrollableDiv" className="h-full overflow-y-auto px-20">
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-full">
                  <p>Loading...</p>
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          <div className="px-20">
            <Footer />
          </div>
        </div>
      </div>
      <Cart
        isOpen={openCart}
        onClose={() => setOpenCart(false)}
        cartDetails={cartDetails}
        getCartDetails={toggleCart}
      />
      <Whishlist
        isOpen={openWishList}
        onClose={() => setOpenWishList(false)}
        data={wishtList}
        getWishList={getWishList}
      />
      <Drawer className="w-96" open={isSearch} onClose={() => setIsSearch(false)}>
        <Drawer.Header title="" titleIcon={() => <></>} />
        <Drawer.Items className="p-4">
          <Search />
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default ShopLayout;
