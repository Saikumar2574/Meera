"use client";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchProducts,
  setProducts,
  setHasMore,
} from "@/lib/redux/reducer/storeReducer";
import ExploreStore from "@/components/ExploreStore";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);
  const selectedGrandChild = useSelector(
    (state) => state.shop.selectedGrandChild
  );
  const hasMore = useSelector((state) => state.shop.hasMore);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const loadMoreProducts = async () => {
    debugger;
    if (loading || !hasMore) return; // Prevent multiple simultaneous requests
    setLoading(true);
    try {
      await dispatch(
        fetchProducts({ categoryId: selectedGrandChild.id, page: currentPage })
      );
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    dispatch(setHasMore(true));
    dispatch(setProducts([]));
  }, []);
  useEffect(() => {
    if (selectedGrandChild && hasMore) {
      loadMoreProducts();
    }
  }, [selectedGrandChild, hasMore]);

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <h2 className="mb-5 text-xl font-bold capitalize dark:text-white text-black">
        {selectedGrandChild?.name}
      </h2>
      {products?.length ? (
        <InfiniteScroll
          dataLength={products?.length || 0} // Ensure this is correctly set
          next={loadMoreProducts}
          hasMore={hasMore} // Use dynamic hasMore state
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more products to load</p>}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.9}
        >
          <ExploreStore data={products} />
        </InfiniteScroll>
      ) : (
        "No Products Available"
      )}
    </div>
  );
};

export default ProductsPage;
