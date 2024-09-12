"use client";
import Link from "next/link";
import Auth from "./Auth";
import { useState, useEffect } from "react";
import { FaCog, FaSignInAlt } from "react-icons/fa";
import { MdPerson, MdPersonOutline, MdLogout } from "react-icons/md";
import {
  HiOutlineHeart,
  HiOutlineSearch,
  HiOutlineShoppingCart,
  HiViewGrid,
} from "react-icons/hi";
import { Drawer, Sidebar } from "flowbite-react";
import { getCartDetails, getWhishlistDetails } from "./service/getData";
import Cart from "./Cart";
import Whishlist from "./Whishlist";
import Search from "./Search";
import { ModeToggle } from "./ScreenMode";

export function Header({ reset, setOpenModal }) {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [openCart, setOpenCart] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [openWishList, setOpenWishList] = useState(false);
  const [wishtList, setWishtList] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const toggleCart = async () => {
    const res = await getCartDetails();
    if (res) {
      setCartDetails(res);
      setMobileMenu(false);
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

  useEffect(() => {
    // Check if token exists in session storage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    setMobileMenu(false);
    localStorage.removeItem("token"); // Clear the token
    setIsLoggedIn(false); // Update state
  };

  return (
    <>
    
      <div className="flex h-12 w-full shrink-0 justify-between items-center md:px-6">
        <img src="/logo144.png" className="w-10 h-10 inline md:hidden" />
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
          onClick={reset}
        >
          <img
            src="https://gearnride.in/wp-content/uploads/2023/04/GNR-Shop-SVG-2.svg"
            className="w-28 md:w-40"
          />
        </Link>
        <div className="hidden md:block ">
          {/* <ModeToggle/> */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className=" bg-gray-400 md:bg-white dark:md:bg-black border-black dark:border-white border-[1.5px] flex text-black dark:text-white dark:hover:text-black dark:hover:bg-white hover:text-white hover:bg-black font-semibold text-lg px-[0.40rem] md:px-5 py-[6px] rounded-full md:rounded-full"
            >
              <MdLogout size={26} />
              <span className="hidden md:inline ml-3">Logout</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              style={{ boxShadow: "10px 5px 20px  #83838336" }}
              className="bg-gray-400 md:bg-white flex text-black hover:text-white hover:bg-black font-semibold text-lg px-[0.40rem] md:px-5 py-[6px] rounded-full md:rounded-full"
            >
              <MdPerson size={26} />
              <span className="hidden md:inline ml-3">Login</span>
            </button>
          )}
        </div>
        <button
          onClick={() => setMobileMenu(true)}
          className=" block md:hidden  md:bg-white dark:md:bg-black text-black hover:bg-gray-300 font-semibold text-lg px-[0.40rem] md:px-5 py-[6px] rounded-full md:rounded-full"
        >
          <HiViewGrid size={26} />
        </button>
      </div>
      <Auth
        openModal={showAuth}
        onCloseModal={() => setShowAuth(false)}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="block md:hidden">
        <Drawer open={mobileMenu} onClose={() => setMobileMenu(false)}>
          <Drawer.Header title="" titleIcon={() => <></>} />
          <Drawer.Items>
            <Sidebar
              aria-label="sidebar dropdown"
              className="[&>div]:bg-transparent [&>div]:p-0"
            >
              <div className="flex h-full flex-col justify-between py-2">
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item onClick={getWishList} icon={HiOutlineHeart}>
                      Wishlist
                    </Sidebar.Item>
                    <Sidebar.Item
                      onClick={toggleCart}
                      icon={HiOutlineShoppingCart}
                    >
                      Cart
                    </Sidebar.Item>
                    <Sidebar.Item
                      onClick={() => {
                        setIsSearch(true);
                        setMobileMenu(false);
                      }}
                      icon={HiOutlineSearch}
                    >
                      Search
                    </Sidebar.Item>
                    {isLoggedIn ? (
                      <Sidebar.Item onClick={handleLogout} icon={MdLogout}>
                        Logout
                      </Sidebar.Item>
                    ) : (
                      <Sidebar.Item
                        onClick={() => {
                          setMobileMenu(false);
                          setShowAuth(true);
                        }}
                        icon={MdPerson}
                      >
                        Login
                      </Sidebar.Item>
                    )}
                    <Sidebar.Item
                      onClick={() => {
                        setMobileMenu(false);
                        setOpenModal(true);
                      }}
                      icon={FaCog}
                    >
                      Settings
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </Sidebar>
          </Drawer.Items>
        </Drawer>
        <Cart
          isOpen={openCart}
          onClose={() => setOpenCart(false)}
          cartDetails={cartDetails}
          position="left"
        />
        <Whishlist
          isOpen={openWishList}
          onClose={() => setOpenWishList(false)}
          data={wishtList}
          position="left"
        />
        <Drawer
          className="w-full"
          open={isSearch}
          onClose={() => setIsSearch(false)}
        >
          <Drawer.Header title="" titleIcon={() => <></>} />
          <Drawer.Items className="p-4">
            <Search />
          </Drawer.Items>
        </Drawer>
      </div>
    </>
  );
}

export default Header;
