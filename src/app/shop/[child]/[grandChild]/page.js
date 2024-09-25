"use client";
import {
  fetchProducts,
  selectGrandChild,
  setGrandchildCategories,
} from "@/lib/redux/reducer/storeReducer";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function page(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const grandchildCategories = useSelector(
    (state) => state.shop.grandchildCategories
  );
  const selectedChild = useSelector((state) => state.shop.selectedChild);
  const selectedParent = useSelector((state) => state.shop.selectedParent);

  const [loadingGrandchildren, setLoadingGrandchildren] = useState(false);

  useEffect(() => {
    if (selectedChild === null) return;
    const fetchGrandchildCategories = async () => {
      try {
        setLoadingGrandchildren(true);

        const res = await axios.get(
          `https://7a3fd2dhfc.execute-api.ap-south-1.amazonaws.com/dev/categories?category_id=${selectedChild.id}&category_type=grandchild&page=1&per_page=2`
        );

        if (res.data && res.data.subcategories) {
          dispatch(setGrandchildCategories(res.data.subcategories));
        }
      } catch (error) {
        console.error("Error fetching grandchild categories:", error);
      } finally {
        setLoadingGrandchildren(false);
      }
    };

    fetchGrandchildCategories();
  }, [selectedChild, dispatch]);

  const handleCategorySelect = async (grandchild) => {
    const payload = { id: grandchild.id, name: grandchild.name };
    dispatch(selectGrandChild(payload));
    router.push(
      `/shop/${selectedParent.name}/${selectedChild.name}/${grandchild.name}`
    );
  };

  return (
    <section>
      <h2 className="mb-10 text-4xl font-bold italic capitalize dark:text-white text-black leading-6 md:leading-[55px]">
        {selectedChild && selectedChild.name}
      </h2>
      <div className="flex flex-wrap gap-8">
        {grandchildCategories?.map((grandchild) => (
          <div key={grandchild.id} className="mb-2">
            <div
              className={`flex flex-col items-center group cursor-pointer text-center `}
              onClick={() => handleCategorySelect(grandchild)}
            >
              <img
                src="https://gearnride.in/wp-content/uploads/2024/08/TAICHI-Riding-Jacket-Kompass-Air-Black-Grey-1.png"
                alt={grandchild.name}
                className=" w-40 h-40 object-cover mb-2  rounded-md"
              />
              <div className="mt-auto flex flex-col ">
                <span className="capitalize text-base font-bold">
                  {grandchild.name}
                </span>
                <span className="text-gray-500 italic text-xs">items : 20</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default page;

// export async function generateStaticParams() {
//     const slugs = ["123", "456", "789"];
//     return slugs.map(child => ({
//         child
//     }));
// }
