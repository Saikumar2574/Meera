"use client";
import { Spinner, Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { getProductDetails } from "./service/getData";
import ProductDetails from "./ProductDetails";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ProductCard from "./ui/productCard";

function ExploreStore({ data }) {
  const [pinnedProducts, setPinnedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const togglePin = (product) => {
    setPinnedProducts((prevSelectedCards) => {
      if (
        prevSelectedCards.some(
          (prevCard) => prevCard.id === product.id
        )
      ) {
        // If the card is already selected, remove it
        return prevSelectedCards.filter(
          (prevCard) => prevCard.id !== product.id
        );
      } else {
        // If the card is not selected, add it
        return [...prevSelectedCards, product];
      }
    });
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
            {data && data?.map((product, index) => (
              <Draggable
                key={product.id}
                draggableId={product.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="flex flex-col w-[280px] h-[440px] overflow-hidden bg-white rounded-md transition-all duration-700 "
                    ref={provided.innerRef}
                    onClick={(e) => fetchProductDetails(e, product.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ProductCard
                      product={product || {}}
                      pinnedProducts={pinnedProducts || []}
                      togglePin={togglePin}
                    />
                  </div>
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
