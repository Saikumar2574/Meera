"use client";
import MarkdownRenderer from "@/components/Markdown";
import { getConversationsById } from "@/components/service/getData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

function page(props) {
  const router = useRouter();
  const [history, setHistory] = useState(null);
  const getAllHistory = async () => {
    try {
      await getConversationsById(props.params.id).then((res) => {
        setHistory(res.histories);
      });
    } catch {
      console.log();
    }
  };

  useEffect(() => {
    getAllHistory();
  }, []);
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="border-2  mb-5 border-none px-4 py-2 font-bold rounded-xl  flex justify-center items-center gap-2"
      >
        <FaArrowLeftLong size={24} />
        Back
      </button>
      <div className="flex items-center gap-4">
        {history?.product_details.map((item) => (
          <div
            key={item._id}
            className="rounded-md group relative  w-80 flex-shrink-0 flex  h-[80px] bg-gray-200 p-4 gap-2"
          >
            <Image
              width={60}
              height={60}
              className="rounded-md w-14 h-14"
              src={item.images[0].src}
            />
            <div>
              <p className="text-sm font-semibold line-clamp-2 overflow-hidden text-ellipsis w-full">
                {item.name}
              </p>
              <p className="text-sm text-gray-400 italic font-semibold">
                &#8377;{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-5">
        {history?.conversations.map((chat, i) => (
          <div key={i} className="flex flex-col gap-4 mt-4">
            {chat.role === "user" && (
              <h6 className="w-fit px-4 py-2 flex font-semibold items-center bg-gray-100 rounded-xl markdown">
                Q&nbsp;:-&nbsp; {chat.message}
              </h6>
            )}
            {chat.role === "assistant" && (
              <>
                <div className="flex gap-3 items-center">
                  <video
                    src="/inputVedio.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-8 h-8"
                  />
                  <p className="font-semibold italic">Meera...</p>
                </div>
                <p className="text-sm md:text-lg px-6 markdown">
                  <MarkdownRenderer markdown={chat.message} />
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
