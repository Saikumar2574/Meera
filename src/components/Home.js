"use client";
import {
  getData,
  getProductDetails,
  getQueryData,
  retriveProducts,
} from "@/components/service/getData";
import { InView } from "@/components/ui/in-view";
import { PlaceholdersAndVanishTextarea } from "@/components/ui/placeholders-and-vanish-input";
import { Drawer, Label, Modal, Select, Spinner, Toast } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiX } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import { ImMic } from "react-icons/im";
import MarkdownRenderer from "@/components/Markdown";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaStopCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import Understanding from "@/components/Understanding";

const Categories = dynamic(() => import("@/components/Categories"), {
  ssr: false,
});
const ChatInput = dynamic(() => import("@/components/ChatInput"), {
  ssr: false,
});
const Combinations = dynamic(() => import("@/components/Combinations"), {
  ssr: false,
});
const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const OrdersList = dynamic(() => import("@/components/OrdersList"), {
  ssr: false,
});
const ProductDetails = dynamic(() => import("@/components/ProductDetails"), {
  ssr: false,
});
const ProductList = dynamic(() => import("@/components/ProductList"), {
  ssr: false,
});
const ProductReviews = dynamic(() => import("@/components/ProductReviews"), {
  ssr: false,
});
const Search = dynamic(() => import("@/components/Search"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const InfoLevel = dynamic(() => import("@/components/InfoLevel"), {
  ssr: false,
});

export default function HomePage() {
  const [component, setComponent] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [model, setModel] = useState(null);
  const [data, setData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a JavaScript method to reverse a string",
    "How to assemble your own PC?",
  ];
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioChunksRef = useRef([]); // Use a ref to hold audio chunks
  const [showSelectedProd, setShowSelectedProd] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isProdDetail, setIsProdDetail] = useState(false);
  const [product, setProduct] = useState(null);
  const [language, setLanguage] = useState("en-US");
  const [isStarted, setIsStarted] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const phrasesRef = useRef();
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("speech-lang", language);
    }
  }, [language]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const permission = await navigator.permissions.query({
          name: "microphone",
        });
        setPermissionStatus(permission.state);

        permission.onchange = () => {
          setPermissionStatus(permission.state);
        };
      } catch (error) {
        console.error("Error checking microphone permission:", error);
      }
    };

    checkMicrophonePermission();
  }, []);

  const showPermissionPrompt = () => {
    const userConfirmed = window.confirm(
      "Microphone access is required for speech recognition. Do you want to enable it now?"
    );
    if (userConfirmed) {
      requestMicrophoneAccess();
    }
  };

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionStatus("granted");
      // startRecording();
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error requesting microphone access:", error);
      let errorMessage =
        "Microphone access is not allowed. Please enable it in your browser settings:\n\n";
      alert(errorMessage);
    }
  };

  const startRecording = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Your browser does not support the Web Speech API.");
      return;
    }

    if (permissionStatus !== "granted") {
      showPermissionPrompt();
      return;
    }

    const SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = language;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onstart = () => {
      console.log("Speech recognition started");
      setIsRecording(true);
    };

    recognitionInstance.onresult = (event) => {
      let transcriptResult = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcriptResult += event.results[i][0].transcript;
        }
      }

      // Update the existing transcript with new results
      setTranscript((prevTranscript) => prevTranscript + transcriptResult);
      setSearchText((prevSearchText) => prevSearchText + transcriptResult);
    };

    recognitionInstance.onend = () => {
      console.log("Speech recognition ended");
      setIsRecording(false);
      setRecognition(null); // Clear the recognition instance
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
  };

  const stopRecording = () => {
    if (recognition) {
      console.log("Stopping speech recognition...");
      recognition.abort(); // Use abort for faster termination
      setIsRecording(false);
      setRecognition(null); // Clear the recognition instance
    }
  };
  const onSubmit = (value) => {
    setSearchText("");
    if (value === "conversations") {
      setModel("conversations");
    } else if (selectedItems.length === 0) {
      fetchInitialData(value);
    } else fetchData(value);
  };

  const fetchInitialData = async (msg) => {
    setModel(null);
    setInitialData(null);
    setLoading(true);
    try {
      const res = await getData(msg);
      console.log("API response:", res); // Log the response
      setIsStarted(true);
      setModel("");
      setInitialData({ ...res }); // Force a new object reference
    } catch (error) {
      console.error("Error fetching data:", error); // Log any error encountered
    } finally {
      setLoading(false);
    }
  };

  const getProductList = async (msg) => {
    setProducts([]);
    setLoading(true);
    const res = await retriveProducts(msg);
    setProducts(res?.data);
    setSelectedItems([]);
    setModel("product_listing");
    setShowProducts(true);
    setLoading(false);
  };

  const fetchData = async (msg) => {
    setLoading(true);
    setShowSelectedProd(false);
    try {
      const itemIds = selectedItems.map((item) => item.productId).join(",");
      const res = await getQueryData(itemIds, msg);
      if (res?.error) {
        setToast({
          show: true,
          message:
            res.error?.detail?.[0]?.msg || res.error?.detail || res.error,
          type: "error",
        });
        console.error("Error fetching data:", res?.error);
      } else if (res?.model) {
        setModel(res.model);
        setData(res);
        setShowProducts(false);
        setLoading(false);
      } else {
        setShowSelectedProd(true);
        setData(res);
        setShowProducts(false);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setToast({ show: true, message: `Error: ${err.message}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (id) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => {
        if (item?.productId) {
          return item.productId !== id;
        }
        return item.product_id !== id;
      })
    );
    if (selectedItems.length === 1 && model === "product_listing") {
      setShowSelectedProd(false);
      setShowProducts(true);
    }
  };
  const fetchProductDetails = async (e, id) => {
    e.stopPropagation();
    setProduct(null);
    const res = await getProductDetails(id);
    if (res?.product) {
      setIsProdDetail(true);
      setProduct(res?.product);
    }
  };

  useEffect(() => {
    let timer;
    if (toast.show) {
      // Set a timer to hide the toast after 5 seconds
      timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [toast.show]);

  return (
    <>
      <div className="h-full flex flex-col overflow-hidden">
        {toast.show && (
          <div className="fixed bottom-4 right-2 transform z-50">
            <div className="relative w-full">
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{toast.message}</div>
                <Toast.Toggle
                  onClick={() =>
                    setToast({ show: false, message: "", type: "" })
                  }
                />
              </Toast>
              {/* Timer line indicator */}

              <div
                className="absolute left-0 top-1 h-1 bg-red-500 animate-timer"
                style={{ animationDuration: `${5000}ms` }}
              ></div>
            </div>
          </div>
        )}
        <header
          className="bg-white p-4 w-full sticky top-0 z-20"
          style={{
            border: "1px solid rgb(108 108 108 / 30%)",
            boxShadow: " 0 0px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Header
            reset={() => {
              setModel(null);
              setSelectedItems([]);
            }}
            setOpenModal={setOpenModal}
          />
        </header>
        {/* <div class="absolute top-0 -z-10 h-full w-full bg-white"><div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div> */}
        <div className="flex flex-1 overflow-hidden w-full  bg-white bg-[radial-gradient(ellipse_80%80%_at_50%-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <aside className="hidden lg:block w-20 bg-transparent z-40">
            {/* Sidebar Component */}
            <Sidebar
              component={component}
              setComponent={setComponent}
              setIsSearch={setIsSearch}
            />
          </aside>

          <main className="flex-1 overflow-y-auto relative">
            <div className=" flex h-full w-full">
              <Drawer open={isSearch} onClose={() => setIsSearch(false)}>
                <Drawer.Header title="" titleIcon={() => <></>} />
                <Drawer.Items className="p-4">
                  <Search />
                </Drawer.Items>
              </Drawer>

              <div className="w-full flex flex-col relative overflow-hidden">
                <div className="flex-grow overflow-hidden ">
                  {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <Spinner
                        aria-label="Extra large spinner example"
                        size="xl"
                      />
                    </div>
                  )}
                  {model === null && (
                    <div className="flex items-center justify-center h-full w-full">
                      <div className="max-w-[1200px] w-full h-full p-6 flex flex-col relative items-center justify-center">
                        <h2 className="mt-30 text-xl font-bold sm:text-5xl dark:text-white text-black">
                          Welcome to Gear N Rides
                        </h2>
                        <p className="mt-5 md:mt-[40px] mb-4 md:mb-8  lg:w-[900px] sm:w-full text-center  text-gray-500 text-sm md:text-[20px]">
                          Hey there, welcome to the interactive store of **GEAR
                          N RIDE**! We specialize in offering high-quality
                          motorcycle gear and accessories to enhance your riding
                          experience.
                        </p>
                      </div>
                    </div>
                  )}
                  {isStarted && model === "" && (
                    <div className="flex items-center justify-center h-full w-full relative overflow-y-auto">
                      <div className="max-w-[1200px] w-full h-full p-6 relative">
                        <Understanding
                          data={initialData}
                          selectedPhrase={selectedPhrase}
                          getProductList={getProductList}
                          phrasesRef={phrasesRef}
                        />                        {initialData?.irrelevant_context && (
                          <div className="mt-14">
                            <h4 className="text-xl italic font-bold ">
                              Other Info
                            </h4>
                            <p className="text-lg italic my-4">
                              {initialData?.irrelevant_context}
                            </p>
                          </div>
                        )}
                        <div className="mt-14 pb-10">
                          <h4 className="text-xl italic font-bold ">
                            Tips for better assistence
                          </h4>
                          <p className="text-lg italic my-4">
                            {initialData?.Tips_for_better_engagement}
                          </p>
                        </div>
                        {/* )} */}
                      </div>
                    </div>
                  )}
                  {/* <div className="h-full"> */}
                  {model === "product_listing" && (
                    <div className="flex items-center justify-center h-full w-full relative overflow-y-auto">
                      <div className="max-w-[1200px] w-full h-full relative">
                        <div className="mt-10">
                          <a
                            onClick={() => {
                              if (showProducts) {
                                setModel("");
                              } else {
                                setShowProducts(true);
                              }
                              setSelectedItems([]);
                            }}
                            className="underline text-lg text-blue-500 hover:text-blue-700 px-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            &lt;&lt; Back
                          </a>
                        </div>
                        {showProducts ? (
                          <ProductList
                            products={products}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                          />
                        ) : (
                          <>
                            {isStarted && selectedItems.length > 0 && data && (
                              <>
                                {isProdDetail && (
                                  <ProductDetails
                                    open={isProdDetail}
                                    close={() => setIsProdDetail(false)}
                                    data={product}
                                  />
                                )}
                                <section className="mt-6">
                                  {data?.message &&
                                    selectedItems.length > 0 &&
                                    showSelectedProd && (
                                      <Carousel
                                        opts={{ align: "start" }}
                                        className="w-full mt-4"
                                      >
                                        <CarouselContent>
                                          {selectedItems?.map((card, index) => (
                                            <CarouselItem
                                              key={index}
                                              className={`basis-[100%] md:basis-[50%] lg:basis-[40%] relative`}
                                            >
                                              <div className="flex p-4 border rounded-lg shadow-lg bg-white ">
                                                <Image
                                                  src={card?.images[0]?.src}
                                                  width={100}
                                                  height={100}
                                                  alt={
                                                    card?.name ||
                                                    "Product Image"
                                                  }
                                                  onError={(e) => {
                                                    e.target.src =
                                                      "https://dummyimage.com/300/09f/fff.png";
                                                  }}
                                                  className="rounded-md w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
                                                />
                                                <div className="ml-4 flex-1">
                                                  <h4
                                                    className="font-semibold text-sm md:text-lg line-clamp-3 overflow-hidden overflow-ellipsis min-h-16 md:min-h-20"
                                                    dangerouslySetInnerHTML={{
                                                      __html: card.name,
                                                    }}
                                                  ></h4>
                                                  <span className="block font-semibold text-sm md:text-lg mt-1 text-gray-400">
                                                    Price: &#8377;
                                                    {card.price}
                                                  </span>
                                                  <button
                                                    type="button"
                                                    onClick={(e) =>
                                                      fetchProductDetails(
                                                        e,
                                                        card.productId
                                                      )
                                                    }
                                                    className="mt-3 inline-flex items-center justify-center py-2 px-4 text-sm font-bold text-white bg-gray-900 rounded-md transition duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                                                  >
                                                    <IoBag className="w-4 h-4 mr-2" />
                                                    Buy Now
                                                  </button>
                                                </div>
                                              </div>
                                            </CarouselItem>
                                          ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                      </Carousel>
                                    )}
                                  <h3 className="text-sm md:text-lg">
                                    <MarkdownRenderer
                                      markdown={
                                        data?.error || data?.message || data
                                      }
                                    />
                                  </h3>
                                  {data?.level === "info" && (
                                    <InfoLevel
                                      content={data?.context}
                                      onClick={onSubmit}
                                    />
                                  )}
                                </section>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {model === "category_list" && (
                    <InView
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 100,
                          filter: "blur(4px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        },
                      }}
                      viewOptions={{ margin: "0px 0px -200px 0px" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Categories list={data?.categories} />
                    </InView>
                  )}
                  {model === "product_combinations" && (
                    <InView
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 100,
                          filter: "blur(4px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        },
                      }}
                      viewOptions={{ margin: "0px 0px -200px 0px" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Combinations
                        list={data?.combinations}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                      />
                    </InView>
                  )}
                  {model === "orders_list" && (
                    <InView
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 100,
                          filter: "blur(4px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        },
                      }}
                      viewOptions={{ margin: "0px 0px -200px 0px" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <OrdersList list={data?.orders} />
                    </InView>
                  )}
                  {model === "product_reviews" && (
                    <InView
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 100,
                          filter: "blur(4px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        },
                      }}
                      viewOptions={{ margin: "0px 0px -200px 0px" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ProductReviews
                        product={data.product}
                        reviews={data.reviews}
                      />
                    </InView>
                  )}
                  {model === "conversations" && (
                    <InView
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 100,
                          filter: "blur(4px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        },
                      }}
                      viewOptions={{ margin: "0px 0px -200px 0px" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChatInput />
                    </InView>
                  )}
                  {/* {!loading && model === "" && data && (
                    <InView
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 100,
                          filter: "blur(4px)",
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        },
                      }}
                      viewOptions={{ margin: "0px 0px -200px 0px" }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {isProdDetail && (
                        <ProductDetails
                          open={isProdDetail}
                          close={() => setIsProdDetail(false)}
                          data={product}
                        />
                      )}
                      <div className="h-full w-full overflow-y-auto">
                        <div className="w-full flex items-center justify-center">
                          <div className="w-full h-full pt-4 pl-2 pb-24 pr-2 flex flex-col relative ml-0  md:ml-20">
                            <section className="h-full mt-4">
                              {data?.message &&
                                selectedItems.length > 0 &&
                                showSelectedProd && (
                                  <Carousel
                                    opts={{ align: "start" }}
                                    className="w-full mt-4"
                                  >
                                    <CarouselContent>
                                      {selectedItems?.map((card, index) => (
                                        <CarouselItem
                                          key={index}
                                          className={`basis-[100%] md:basis-[50%] lg:basis-[33%] relative`}
                                        >
                                          <div className="flex p-4 border rounded-lg shadow-lg bg-white ">
                                            <Image
                                              src={card?.images[0]?.src}
                                              width={150}
                                              height={150}
                                              alt={
                                                card?.name || "Product Image"
                                              }
                                              className="rounded-md"
                                            />
                                            <div className="ml-4 flex-1">
                                              <h4
                                                className="font-semibold text-sm md:text-lg line-clamp-3 overflow-hidden overflow-ellipsis min-h-16 md:min-h-20"
                                                dangerouslySetInnerHTML={{
                                                  __html: card.name,
                                                }}
                                              ></h4>
                                              <span className="block font-semibold text-sm md:text-lg mt-1 text-gray-400">
                                                Price: &#8377;
                                                {card.price}
                                              </span>
                                              <button
                                                type="button"
                                                onClick={(e) =>
                                                  fetchProductDetails(
                                                    e,
                                                    card.productId
                                                  )
                                                }
                                                className="mt-3 inline-flex items-center justify-center py-2 px-4 text-sm font-bold text-white bg-gray-900 rounded-md transition duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                                              >
                                                <IoBag className="w-4 h-4 mr-2" />
                                                Buy Now
                                              </button>
                                            </div>
                                          </div>
                                        </CarouselItem>
                                      ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                  </Carousel>
                                )}
                              <h3 className="text-sm md:text-lg">
                                <MarkdownRenderer
                                  markdown={
                                    data?.error || data?.message || data
                                  }
                                />
                              </h3>
                              {data?.level === "info" && (
                                <InfoLevel
                                  content={data?.context}
                                  onClick={onSubmit}
                                />
                              )}
                            </section>
                          </div>
                        </div>
                      </div>
                    </InView>
                  )} */}
                </div>
              </div>
            </div>
            <Modal
              show={openModal}
              size="md"
              onClose={() => setOpenModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <div className="mb-2 block">
                    <Label htmlFor="lang" value="Select Speech Language" />
                  </div>
                  <Select
                    id="lang"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="zh-CN">Chinese (Mandarin)</option>
                    <option value="kn-IN">Kannada (India)</option>
                    <option value="te-IN">Telugu (India)</option>
                  </Select>
                </div>
              </Modal.Body>
            </Modal>
          </main>
        </div>
        <div className="w-full sticky bottom-0" style={{ zIndex: 10 }}>
          <div
            className="hidden md:block relative"
            style={{
              border: "1px solid rgb(108 108 108 / 30%)",
              boxShadow: " 0 8px 32px rgba(0, 0, 0, 0.25)",
              background:
                "linear-gradient(to bottom, rgba(200, 200, 200, 0.2), rgba(255, 255, 255, 0.2))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: " blur(20px)",
              paddingBottom: "0.75rem",
            }}
          >
            {selectedItems.length > 0 && (
              <div className="flex relative w-full max-w-4xl mx-auto -mb-2 pt-3">
                <AnimatePresence>
                  {selectedItems.map((item, index) => (
                    <motion.span
                      key={item.id || item.product_id}
                      initial={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="py-1 px-2 bg-black text-white rounded-md ml-2 max-w-52 flex items-center space-x-2 overflow-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap w-[90%]">
                        {item.name}
                      </span>
                      <AiOutlineClose
                        size={20}
                        className="ml-2 cursor-pointer"
                        onClick={() =>
                          handleRemoveItem(item?.productId || item?.product_id)
                        }
                      />
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <PlaceholdersAndVanishTextarea
              value={searchText}
              setValue={setSearchText}
              isRecording={isRecording}
              stopRecording={stopRecording}
              startRecording={startRecording}
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
          <div
            className="relative block md:hidden bg-white"
            style={{ boxShadow: "0px 0px 5px 0px #ccc" }}
          >
            {selectedItems.length > 0 && (
              <div className="relative w-full max-w-4xl mx-auto -mb-2 pt-3">
                <div className="flex space-x-2 overflow-x-auto whitespace-nowrap pb-2 hide-scrollbar">
                  <AnimatePresence>
                    {selectedItems.map((item, index) => (
                      <motion.span
                        key={item.productId || item.product_id}
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                        className="py-1 px-2 bg-black text-white w-52 rounded-md mx-2 flex items-center space-x-2"
                      >
                        <span className="text-sm w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {item.name}
                        </span>
                        <AiOutlineClose
                          size={18}
                          className="ml-2 cursor-pointer"
                          onClick={() =>
                            handleRemoveItem(
                              item?.productId || item?.product_id
                            )
                          }
                        />
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
            <div className="flex items-center p-4">
              <div className="relative flex flex-1 border rounded-sm border-gray-500">
                <div className="relative w-full">
                  <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Start typing..."
                    required
                    disabled={isRecording}
                    value={searchText}
                    className={`block text-lg w-full pl-3 pr-10 py-2 rounded-md border-none focus:outline-none focus:ring-0 focus:border-none ${
                      isRecording ? "opacity-50" : ""
                    }`}
                  />
                  <button
                    type="button"
                    disabled={isRecording}
                    onClick={() => onSubmit(searchText)}
                    className="absolute inset-y-0 right-1 flex items-center z-20"
                  >
                    <IoMdSend size={24} />
                  </button>
                  {isRecording && (
                    <div className="absolute inset-0 flex items-center justify-center h-8 top-1 text-lg rounded-md z-10 pointer-events-none">
                      <div
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "100%",
                          backgroundColor: "#00bcd4",
                          margin: "0 2px",
                          animation: "wave-animation 1s infinite ease-in-out",
                          animationDelay: "0s",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "100%",
                          backgroundColor: "#00bcd4",
                          margin: "0 2px",
                          animation: "wave-animation 1s infinite ease-in-out",
                          animationDelay: "0.1s",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "100%",
                          backgroundColor: "#00bcd4",
                          margin: "0 2px",
                          animation: "wave-animation 1s infinite ease-in-out",
                          animationDelay: "0.2s",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "100%",
                          backgroundColor: "#00bcd4",
                          margin: "0 2px",
                          animation: "wave-animation 1s infinite ease-in-out",
                          animationDelay: "0.3s",
                        }}
                      ></div>
                      <div
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "100%",
                          backgroundColor: "#00bcd4",
                          margin: "0 2px",
                          animation: "wave-animation 1s infinite ease-in-out",
                          animationDelay: "0.4s",
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>

              {isRecording ? (
                <button className="ml-2 rounded-full" onClick={stopRecording}>
                  <FaStopCircle size={40} />
                </button>
              ) : (
                <button
                  className="ml-2 bg-black rounded-full p-2"
                  onClick={startRecording}
                >
                  <ImMic size={24} color="white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
