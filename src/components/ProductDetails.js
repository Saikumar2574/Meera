import { Modal, Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { HiCheck, HiX } from "react-icons/hi";
import { MdFullscreen } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { addCart } from "./service/getData";
import Image from "next/image";

function ProductDetails({ open, close, data }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(data?.price);
  const [quantity, setQuantity] = useState(1);
  // Attributes and variations from props (assuming you pass these)
  const attributes = data?.attributes.filter((item) => item.variation);
  const variations = data?.variations;
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [mainImg, setMainImg] = useState();
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  useEffect(() => {
    if (attributes && attributes.length > 0) {
      const defaultSelectedOptions = attributes.reduce((acc, curr) => {
        acc[curr.name] = curr.options[0];
        return acc;
      }, {});
      setSelectedOptions(defaultSelectedOptions);
      // Find matching variation to set the initial price
      const matchingVariation = variations?.find((variation) =>
        Object.entries(defaultSelectedOptions).every(
          ([key, value]) => variation?.attributes[key] === value
        )
      );
      if (matchingVariation) {
        setCurrentPrice(matchingVariation.price);
      }
    }
  }, []);

  // Handle option change
  const handleOptionChange = (name, value) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [name]: value,
    };
    setSelectedOptions(newSelectedOptions);

    // Find the matching variation for the selected options
    const matchingVariation = variations?.find((variation) =>
      Object.entries(newSelectedOptions).every(
        ([key, value]) => variation.attributes[key] === value
      )
    );
    if (matchingVariation) {
      setCurrentPrice(matchingVariation.price);
    } else {
      setCurrentPrice(data?.price);
    }
  };

  const openLightbox = (index) => {
    setCurrentLightboxIndex(index);
    setLightboxVisible(true);
  };

  const closeLightbox = () => {
    setLightboxVisible(false);
  };

  const goToNextImage = () => {
    setCurrentLightboxIndex(
      (prevIndex) => (prevIndex + 1) % data?.images.length
    );
  };

  const goToPreviousImage = () => {
    setCurrentLightboxIndex(
      (prevIndex) => (prevIndex - 1 + data?.images.length) % data?.images.length
    );
  };

  const handleAddCart = async () => {
    // Mocked API call - replace with your actual API call
    const res = await addCart({ product_id: data._id, quantity: quantity });

    if (res) {
      setIsAddedToCart(true);
      setToast({
        show: true,
        message: "Successfully Added",
        type: "success",
      });
    }
  };
  useEffect(() => {
    if (data) {
      setMainImg(data?.images?.[0].src);
    }
  }, [data]);

  useEffect(() => {
    let timer;
    if (toast.show) {
      // Set a timer to hide the toast after 5 seconds
      timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
        close();
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [toast.show]);

  return (
    <Modal
      show={open}
      size="full"
      theme={{
        content: {
          base: "relative flex md:max-h-[90%] ",
          inner:
            "relative flex flex-col bg-[#edf1f8] shadow dark:bg-gray-700  rounded-none md:rounded-lg",
        },
      }}
      onClose={close}
      popup
    >
      <Modal.Header
        theme={{
          close: {
            base: "ml-auto  inline-flex items-center rounded-lg  p-1.5 text-sm text-gray-400 bg-black hover:text-white dark:hover:bg-gray-600 dark:hover:text-white",
          },
        }}
      />
      <Modal.Body theme={{base:"flex-1 overflow-hidden p-6"}}>
        <section className=" h-full  flex justify-center items-center p-0 md:p-5 pb-28">
          <div class="mx-auto max-w-7xl h-full">
            <div className="flex h-full gap-5">
              {/* Left Side: Sticky Image Section */}
              <div className="w-[40%] relative md:sticky top-0 self-start">
                <div className="relative">
                  <Image
                    className="object-contain w-full h-full rounded-xl p-5 bg-white"
                    src={mainImg}
                    alt="img"
                    width={300}
                    height={300}
                    onError={(e) => {
                      e.target.src = "https://dummyimage.com/300/09f/fff.png";
                    }}
                  />
                  {/* <img
                      src={mainImg}
                      alt="img"
                      className="w-full h-full object-cover rounded-md"
                    /> */}
                  <button
                    className="absolute bottom-2 right-2"
                    onClick={() => openLightbox(0)}
                  >
                    <MdFullscreen size={30} />
                  </button>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent>
                      {data?.images?.map((item, index) => (
                        <CarouselItem
                          key={index}
                          onClick={() => setMainImg(item?.src)}
                          className="relative cursor-pointer basis-28 lg:basis-[23%] xl:basis-[20%]"
                        >
                          <div className="relative overflow-hidden">
                            <Image
                              className={`w-24 h-24 object-cover border rounded-md transition-transform ${
                                item?.src === mainImg
                                  ? "border-2 border-gray-300 border-solid"
                                  : "border-gray-300"
                              }`}
                              src={item?.src}
                              alt={`image${index}`}
                              width={300}
                              height={300}
                              onError={(e) => {
                                e.target.src =
                                  "https://dummyimage.com/300/09f/fff.png";
                              }}
                            />
                            {item?.src === mainImg && (
                              <div className="absolute inset-0 flex items-center justify-center z-10 rounded-md">
                                <div className="absolute inset-0 bg-gray-800 bg-opacity-20 rounded-md" />
                                <HiCheck className="text-white text-2xl z-50" />
                              </div>
                            )}
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {data?.images?.length > 5 && (
                      <>
                        <CarouselPrevious />
                        <CarouselNext />
                      </>
                    )}
                  </Carousel>
                </div>

                {lightboxVisible && (
                  <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
                    <button
                      className="absolute top-5 right-5 text-white"
                      onClick={closeLightbox}
                    >
                      <HiX className="text-3xl" />
                    </button>
                    <button
                      className="absolute left-5 text-white text-2xl bg-gray-300 p-2 rounded-full"
                      onClick={goToPreviousImage}
                    >
                      <FaArrowLeft />
                    </button>
                    <div className="w-full max-w-4xl">
                      <img
                        src={data?.images[currentLightboxIndex]?.src}
                        alt={`img${currentLightboxIndex}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      className="absolute right-5 text-white text-2xl bg-gray-300 p-2  rounded-full"
                      onClick={goToNextImage}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                )}
              </div>

              {/* Right Side: Content Section */}
              <div className="px-0 md:px-4 pb-8 flex-1 xl:pr-16 h-full overflow-y-auto">
                <h1
                  className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
                  dangerouslySetInnerHTML={{
                    __html: data?.name,
                  }}
                ></h1>
                <div className="flex items-center space-x-px my-5">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      className={`w-6 h-6 text-[#fed101]`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-base font-normal leading-7 text-gray-700 dark:text-white mb-5">
                  {data?.short_description}
                </p>
                {/* <p className="mt-5 text-base font-normal leading-7 text-gray-700">
                    {data?.description}
                  </p> */}

                {/* Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {attributes?.map((section) => (
                    <div key={section.name} className="mt-3 mr-10">
                      <label className="block text-lg font-bold text-gray-700 dark:text-white">
                        {section.name}
                      </label>
                      <div className="mt-1">
                        <select
                          value={
                            selectedOptions[section.name] || section.options[0]
                          }
                          onChange={(e) =>
                            handleOptionChange(section.name, e.target.value)
                          }
                          className="block w-full text-black p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                          {section.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Price and Quantity */}
                <div className="mt-5 flex flex-col-reverse md:flex-row">
                  <div className="flex items-center">
                    {/* <p className="text-3xl font-bold line-through text-gray-300 mr-3">
                        &#8377;{data?.regular_price}
                      </p> */}
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      &#8377;{currentPrice || 0}
                    </p>
                  </div>
                  <div className="ml-0 md:ml-10 flex items-center mb-5 md:mb-0">
                    <label
                      htmlFor="quantity"
                      className="block text-lg font-bold text-gray-700 dark:text-white"
                    >
                      Quantity :&nbsp;
                    </label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      defaultValue="1"
                      className="mt-1 block w-30 pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md rounded-md"
                    >
                      {[...Array(5).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-5 sm:mt-8 sm:flex sm:items-center sm:space-x-5">
                  <button
                    onClick={handleAddCart}
                    type="button"
                    className={`
          items-center
          justify-center
          w-full
          px-12
          py-3
          text-base
          font-bold
          leading-7
          text-center
          transition-all
          duration-200
          border border-transparent
          rounded-md
          inline-flex
          sm:w-auto
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          ${
            isAddedToCart
              ? "bg-green-600 text-white hover:bg-green-500 focus:ring-green-600"
              : "bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900"
          }
        `}
                    disabled={isAddedToCart}
                  >
                    {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                  </button>

                  <button
                    type="button"
                    className="
            inline-flex
            items-center
            justify-center
            w-full
            px-4
            py-3
            mt-4
            text-base
            font-bold
            leading-7
            text-center text-gray-900
            transition-all
            duration-200
            bg-transparent
            border border-gray-300
            rounded-md
            sm:mt-0 sm:w-auto
             bg-white
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
            hover:border-gray-900 hover:bg-gray-900
            focus:border-gray-900 focus:bg-gray-900 focus:text-white
            hover:text-white
          "
                  >
                    <svg
                      className="w-5 h-5 mr-2.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
          {toast.show && (
            <div className="fixed bottom-4 right-2 transform z-50">
              <div className="relative w-full">
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-600 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiX className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">
                    {toast.message}
                  </div>
                  <Toast.Toggle
                    onClick={() =>
                      setToast({ show: false, message: "", type: "" })
                    }
                  />
                </Toast>
                {/* Timer line indicator */}

                <div
                  className="absolute left-0 top-1 h-1 bg-green-500 animate-timer"
                  style={{ animationDuration: `${5000}ms` }}
                ></div>
              </div>
            </div>
          )}
        </section>
      </Modal.Body>
    </Modal>
  );
}

export default ProductDetails;
