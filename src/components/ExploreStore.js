"use client";
import { Spinner, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { addToShortList, getProductDetails } from "./service/getData";
import ProductDetails from "./ProductDetails";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ProductCard from "./ui/productCard";
import { useDispatch } from "react-redux";
import { fetchShortlistItems, setSelectedIds } from "@/lib/redux/reducer/productReducer";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

function ExploreStore({ data }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const pinnedProducts =
    useSelector((state) => state.products.selectedIds) || [];

  const togglePin = (product) => {
    let updatedPinnedProducts;
    if (pinnedProducts?.some((prevCard) => prevCard.id === product.id)) {
      updatedPinnedProducts = pinnedProducts.filter(
        (prevCard) => prevCard.id !== product.id
      );
    } else {
      updatedPinnedProducts = [...pinnedProducts, product];
    }

    dispatch(setSelectedIds(updatedPinnedProducts));
  };

  

  return (
    <section className="py-4">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      )}
      <Droppable droppableId="product-list">
        {(provided) => (
          <div
            className="flex flex-wrap gap-8"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data &&
              data?.map((product, index) => (
                <Draggable
                  key={product.id}
                  draggableId={product.id}
                  index={product}
                >
                  {(provided) => (
                    <>
                      <ProductCard
                        product={product || {}}
                        pinnedProducts={pinnedProducts || []}
                        togglePin={togglePin}
                        onCardClick={() =>
                          router.push(`${pathname + "/" + product.productId}`)
                        }
                      />
                    </>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {product && (
        <ProductDetails
          open={true}
          close={() => setProduct(null)}
          data={product}
        />
      )}
    </section>
  );
}

export default ExploreStore;
