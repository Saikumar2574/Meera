"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setProducts,
  setHasMore,
} from "@/lib/redux/reducer/storeReducer";
import ExploreStore from "@/components/ExploreStore";
import { Pagination } from "flowbite-react";
import { fetchShortlistItems } from "@/lib/redux/reducer/productReducer";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);
  const selectedGrandChild = useSelector(
    (state) => state.shop.selectedGrandChild
  );
  const hasMore = useSelector((state) => state.shop.hasMore);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Default total pages

  // Function to fetch products for the selected page
  const loadMoreProducts = async (page = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await dispatch(
        fetchProducts({ categoryId: selectedGrandChild.id, page })
      );

      // Assuming response contains pagination data like in the API you provided
      const { products, pagination } = response.payload;
      dispatch(setProducts(products));
      setTotalPages(pagination.total_pages);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
    dispatch(setProducts([])); // Reset products on page change
    loadMoreProducts(page);
  };
  // const fetchShorlistItems = async () => {
  //   await getShortListedItems().then((res) => {
  //     dispatch(setShortListItems(res.shortlists?.[0] || null));
  //   });
  // };

  useEffect(() => {
    dispatch(fetchShortlistItems());
    dispatch(setHasMore(true));
    dispatch(setProducts([]));
  }, []);

  useEffect(() => {
    if (selectedGrandChild && hasMore) {
      loadMoreProducts(currentPage);
    }
  }, [selectedGrandChild, hasMore]);

  return (
    <section>
      <h2 className=" text-4xl font-bold italic capitalize dark:text-white text-black leading-6 md:leading-[55px]">
        {selectedGrandChild?.name}
      </h2>

      {products?.length ? (
        <div>
          <ExploreStore data={products} />

          {/* Add Pagination Component */}
          <div className="flex overflow-x-auto sm:justify-center mt-4">
            <Pagination
              //   layout="table"
              currentPage={currentPage}
              totalPages={totalPages} // Use totalPages from API
              onPageChange={onPageChange}
              showIcons
            />
          </div>
        </div>
      ) : (
        "No Products Available"
      )}
    </section>
  );
};

export default ProductsPage;
