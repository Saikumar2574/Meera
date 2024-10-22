"use client";
import InfoLevel from "@/components/InfoLevel";
import MarkdownRenderer from "@/components/Markdown";
import { getProductDetails, getQueryData } from "@/components/service/getData";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const selectProd =
    useSelector((state) => state?.products?.selectedIds) || null;
  const [selectedItems, setSelectedItems] = useState(selectProd);
  const [product, setProduct] = useState(null);
  const searchParams = useSearchParams();
  const msg = searchParams.get("msg"); // Get 'msg' from the URL query params

  const fetchData = async () => {
    setLoading(true);
    try {
      const itemIds = selectedItems.map((item) => item.productId).join(",");
      const res = await getQueryData(itemIds, msg); // Fetch data using 'msg' from the URL
      if (res?.error) {
        console.error("Error fetching data:", res?.error);
      } else {
        setData(res);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (msg && selectedItems?.length > 0) {
      fetchData(); // Fetch data when 'msg' is available from the URL
    }
  }, [msg, selectedItems]);

  const handleRemoveItem = (id) => {
    if (selectedItems.length === 1) {
      router.back();
    } else {
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => {
          if (item?.id) {
            return item.id !== id;
          }
        })
      );
    }
  };

  const fetchProductDetails = async (e, id) => {
    e.stopPropagation();
    setProduct(null);
    const res = await getProductDetails(id);
    if (res?.product) {
      setProduct(res?.product);
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full relative">
      <div className="w-full h-full relative ">
        <section className="mt-6 pb-20">
          {/* <button
            onClick={() => router.back()}
            className="border-2 ml-auto mb-5 border-black px-4 py-2 font-bold rounded-xl hover:bg-black hover:text-white flex justify-center items-center gap-2"
          >
            <FaArrowLeftLong size={24} />
            Back
          </button> */}
          {!selectedItems?.length > 0 && (
            <p className="text-red-600">No product selected.</p>
          )}
          {/* {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
          )} */}
          {/* {data?.message && selectedItems.length > 0 && (
            <Carousel opts={{ align: "start" }} className="w-full mt-4">
              <CarouselContent>
                {selectedItems?.map((card, index) => (
                  <CarouselItem
                    key={index}
                    className={`basis-[100%] md:basis-[50%] lg:basis-[40%] relative`}
                  >
                    <div className="flex p-4 border rounded-lg shadow-lg bg-white">
                      <Image
                        src={card?.image}
                        width={100}
                        height={100}
                        alt={card?.name || "Product Image"}
                        onError={(e) => {
                          e.target.src =
                            "https://dummyimage.com/300/09f/fff.png";
                        }}
                        className="rounded-md w-[100px] h-[100px] md:w-[140px] md:h-[140px]"
                      />
                      <div className="ml-4 flex-1">
                        <h4
                          className="font-semibold text-sm line-clamp-2 overflow-hidden overflow-ellipsis min-h-10 "
                          dangerouslySetInnerHTML={{
                            __html: card.name,
                          }}
                        ></h4>
                        <span className="block font-semibold text-sm mt-1 text-gray-400">
                          Price: &#8377;
                          {card.price}
                        </span>
                        <button
                          type="button"
                          onClick={(e) =>
                            fetchProductDetails(e, card.productId)
                          }
                          className="mt-3 inline-flex items-center justify-center py-2 px-4 text-sm font-bold text-white bg-gray-900 rounded-md transition duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                        >
                          <IoBag className="w-4 h-4 mr-2" />
                          Buy Now
                        </button>
                      </div>
                      <div className="absolute top-0 right-0 cursor-pointer">
                        <MdCancel
                          size={25}
                          onClick={() => handleRemoveItem(card?.productId)}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )} */}
          <div>
            <h6 className="w-fit px-4 py-2 bg-gray-100 rounded-xl">Q&nbsp;:-&nbsp;{msg}</h6>
            <div className="flex gap-3 pt-4 items-center">
              <video
                src="/inputVedio.mp4"
                autoPlay
                loop
                muted
                className="w-8 h-8"
              />
              <p className="font-semibold italic">Meera...</p>
            </div>
            <p className="text-sm md:text-lg p-6 markdown">
              <MarkdownRenderer
                markdown={data?.error || data?.message || data}
              />
            </p>
          </div>
          {data?.level === "info" && <InfoLevel content={data?.context} />}
        </section>
        {product && (
          <ProductDetails
            open={true}
            close={() => setProduct(null)}
            data={product}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
