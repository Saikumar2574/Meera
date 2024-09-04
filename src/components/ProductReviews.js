import { Rating } from "flowbite-react";
import moment from "moment";
import React from "react";

function ProductReviews({ product, reviews }) {
  if (!product || !product.rating_summary) {
    return <p>No ratings available</p>;
  }
  const totalReviews = product.rating_summary.total_reviews;
  const percentage = (count) => (count / totalReviews) * 100;

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1100px] w-full h-full p-6 flex flex-col relative">
          <section class="mt-10">
            <h3 className="text-3xl font-bold">Product Reviews</h3>
            <div class=" mx-auto max-w-7xl">
              <div class="grid grid-cols-1 mt-8 lg:grid-rows-1 gap-y-12 lg:mt-12 lg:grid-cols-5 lg:gap-y-16 lg:gap-x-12 xl:gap-x-16">
                <div class="lg:col-span-3 lg:row-end-1">
                  <div class="lg:flex lg:items-start">
                    <div class="lg:order-2 lg:ml-5">
                      <div class="overflow-hidden border-2 border-transparent rounded-lg">
                        <img
                          class="object-cover w-full h-full"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-1.png"
                          alt=""
                        />
                      </div>
                    </div>

                    <div class="w-full lg:w-32 mt-2.5 lg:mt-0 lg:flex-shrink-0 lg:order-1">
                      <div class="flex flex-row items-stretch lg:flex-col lg:space-y-5 space-x-2.5 lg:space-x-0">
                        <button type="button" class="flex-1">
                          <div class="overflow-hidden border-2 border-gray-900 rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                            <img
                              class="object-cover w-full h-full"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-2.png"
                              alt=""
                            />
                          </div>
                        </button>

                        <button type="button" class="flex-1">
                          <div class="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                            <img
                              class="object-cover w-full h-full"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-3.png"
                              alt=""
                            />
                          </div>
                        </button>

                        <button type="button" class="flex-1">
                          <div class="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                            <img
                              class="object-cover w-full h-full"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-4.png"
                              alt=""
                            />
                          </div>
                        </button>

                        <button type="button" class="flex-1">
                          <div class="overflow-hidden border-2 border-transparent rounded-lg aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3">
                            <img
                              class="object-cover w-full h-full"
                              src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/product-details/2/product-5.png"
                              alt=""
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="lg:col-span-2 lg:row-end-2 lg:row-span-2">
                  <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {product.name}
                  </h1>

                  <div class="flex items-center mt-5">
                    <Rating>
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star />
                      <Rating.Star filled={false} />
                      <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {product.rating_summary.total_reviews} Reviews
                      </p>
                    </Rating>
                  </div>

                  <div class="flex items-center mt-8">
                    <p class=" text-2xl font-bold text-gray-500">
                      <del>
                        {" "}
                        {product.currency_symbol +
                          "" +
                          product.regular_price}{" "}
                      </del>
                    </p>
                    <p class="ml-2 text-3xl font-bold text-gray-900">
                      {product.currency_symbol + "" + product.sale_price}
                    </p>
                  </div>

                  <h2 class="mt-8 text-xl font-bold text-gray-900">Colors</h2>
                  <div class="flex items-center mt-5 space-x-3">
                    <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none">
                      <input
                        type="radio"
                        name="color"
                        value="Green"
                        class="sr-only"
                      />
                      <p class="sr-only">Green</p>
                      <span
                        aria-hidden="true"
                        class="w-8 h-8 rounded bg-emerald-600"
                      ></span>
                    </label>

                    <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none">
                      <input
                        type="radio"
                        name="color"
                        value="Red"
                        class="sr-only"
                      />
                      <p class="sr-only">Red</p>
                      <span
                        aria-hidden="true"
                        class="w-8 h-8 bg-orange-600 rounded"
                      ></span>
                    </label>

                    <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none">
                      <input
                        type="radio"
                        name="color"
                        value="Blue"
                        class="sr-only"
                      />
                      <p class="sr-only">Blue</p>
                      <span
                        aria-hidden="true"
                        class="w-8 h-8 bg-indigo-500 rounded"
                      ></span>
                    </label>

                    <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none">
                      <input
                        type="radio"
                        name="color"
                        value="Gray"
                        class="sr-only"
                      />
                      <p class="sr-only">Gray</p>
                      <span
                        aria-hidden="true"
                        class="w-8 h-8 bg-gray-700 rounded"
                      ></span>
                    </label>
                  </div>

                  <div class="flex items-center mt-10 space-x-4">
                    <button
                      type="button"
                      class="inline-flex items-center justify-center px-12 py-3 text-xl font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                    >
                      Add to cart
                    </button>

                    <button
                      type="button"
                      class="
                          inline-flex
                          items-center
                          justify-center
                          px-4
                          py-3.5
                          text-gray-900
                          transition-all
                          duration-200
                          bg-transparent
                          border-2 border-gray-300
                          rounded-md
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                          hover:border-gray-900 hover:bg-gray-100
                          focus:border-gray-900
                      "
                    >
                      <svg
                        class="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <section class="py-12 sm:py-16 lg:py-20">
              <div class="mx-auto max-w-7xl">
                <div class="max-w-3xl">
                  <div class="grid grid-cols-1 gap-y-8 sm:grid-cols-2 gap-x-16">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900">
                        Customer reviews & ratings
                      </h3>
                      <div class="flex items-center mt-6">
                        <Rating>
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star />
                          <Rating.Star filled={false} />
                          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                            ({product.rating_summary.average_rating} out of 5)
                          </p>
                        </Rating>
                      </div>
                      <p class="text-md font-medium text-gray-600 mt-2.5">
                        Based on {product.rating_summary.total_reviews}
                      </p>
                    </div>

                    <div>
                      <ul className="space-y-2.5">
                        {Object.entries(
                          product.rating_summary.ratings_breakdown
                        ).map(([rating, count]) => (
                          <li
                            key={rating}
                            className="grid items-center grid-cols-5 gap-x-4"
                          >
                            <span className="text-md font-medium text-gray-600 whitespace-nowrap">
                              {rating
                                .replace("_star", " star")
                                .replace("_", " ")}
                            </span>
                            <div className="col-span-3 relative w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="absolute inset-y-0 left-0 bg-gray-900 rounded-full"
                                style={{ width: `${percentage(count)}%` }}
                              ></div>
                            </div>
                            <span className="text-md font-medium text-gray-600 whitespace-nowrap">
                              {count}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <hr class="mt-10 border-gray-200" />

                  <div class="flow-root mt-10">
                    <ul class="divide-y divide-gray-200 -my-9 gap-x-16">
                      {reviews?.map((review) => (
                        <li
                          class="grid grid-cols-1 py-8 gap-y-8 md:grid-cols-7 gap-x-8"
                          key={review.review_id}
                        >
                          <div class="md:col-span-2">
                            <Rating>
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star />
                              <Rating.Star filled={false} />
                            </Rating>
                            <div class="flex items-start mt-5 md:flex-col">
                              <div class="flex-shrink-0">
                                <p class="text-md font-bold text-gray-900">
                                  {review.reviewer_name}
                                </p>
                                <p class="mt-1 text-md font-normal text-gray-500">
                                  {moment(review.review_date).format(
                                    "DD MMMM, YYYY"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="md:col-span-5">
                            <p class="text-base font-bold text-gray-900">
                              {review.title}
                            </p>
                            <blockquote class="mt-4">
                              <p class="text-md font-normal leading-6 text-gray-900">
                                {review.comment}
                              </p>
                            </blockquote>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
