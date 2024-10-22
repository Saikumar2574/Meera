"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

function page(props) {
  const router = useRouter()
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
        <div className="rounded-md group relative  w-80 flex-shrink-0 flex  h-[80px] bg-gray-200 p-4 gap-2">
          <Image
            width={60}
            height={60}
            className="rounded-md w-14 h-14"
            src={
              "https://gearnride.in/wp-content/uploads/2024/02/ACERBIS-Dual-Road-Jacket-CE-Ramsey-My-Vented-2.0-324-Black-Red.png"
            }
          />
          <div>
            <p className="text-sm font-semibold line-clamp-2 overflow-hidden text-ellipsis w-full">
              ACERBIS Dual Road Jacket, CE Ramsey My Vented 2.0 323 Black Red
            </p>
            <p className="text-sm text-gray-400 italic font-semibold">
              &#8377;{999}
            </p>
          </div>
        </div>
        <div className="rounded-md group relative  w-80  flex-shrink-0 flex  h-[80px] bg-gray-200 p-4 gap-2">
          <Image
            width={60}
            height={60}
            className="rounded-md w-14 h-14"
            src={
              "https://gearnride.in/wp-content/uploads/2024/02/ACERBIS-Dual-Road-Jacket-CE-Ramsey-My-Vented-2.0-324-Black-Red.png"
            }
          />
          <div>
            <p className="text-sm font-semibold line-clamp-2 overflow-hidden text-ellipsis w-full">
              ACERBIS Dual Road Jacket, CE Ramsey My Vented 2.0 323 Black Red
            </p>
            <p className="text-sm text-gray-400 italic font-semibold">
              &#8377;{999}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <h6 className="w-fit px-4 py-2 bg-gray-100 rounded-xl">
          Q&nbsp;:-&nbsp; Compare this two products
        </h6>
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
        <p className="text-sm md:text-lg px-6 ">Response</p>
        <h6 className="w-fit px-4 py-2 bg-gray-100 rounded-xl">
          Q&nbsp;:-&nbsp; Compare this two products
        </h6>
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
        <p className="text-sm md:text-lg px-6 ">Response</p>
      </div>
    </div>
  );
}

export default page;
