import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card } from "flowbite-react";

const Categories=({list})=> {
  // const list = [
  //   {
  //     name: "Women",
  //     image:{src:"https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/categories/4/women.png"},
  //     products: 123,
  //   },
  //   {
  //     name: "Men",
  //     image:{src:
  //       "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/categories/4/men.png"},
  //     products: 98,
  //   },
  //   {
  //     name: "Kids",
  //     image:{src:
  //       "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/categories/4/kids.png"},
  //     products: 222,
  //   },
  //   {
  //     name: "Accessories",
  //     image:{src:
  //       "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/categories/4/accessories.png"},
  //     products: 35,
  //   },
  //   {
  //     name: "Kids",
  //     image:{src:
  //       "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/categories/4/kids.png"},
  //     products: 222,
  //   },
  //   {
  //     name: "Accessories",
  //     image:{src:
  //       "https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/categories/4/accessories.png"},
  //     products: 35,
  //   },
  // ];
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1100px] w-full h-full p-6 flex flex-col relative">
      <section class="mt-5">
        <div class="mx-auto max-w-7xl">
          <div class="text-center sm:text-left">
            <h2 class="text-3xl font-bold text-gray-900 ">
              Popular Categories
            </h2>
          </div>
          <Carousel opts={{ align: "start" }} className="w-full mt-8">
            <CarouselContent>
              {list?.map((card, index) => (
                <CarouselItem
                  key={index}
                  //   onClick={() => handleCardClick(card)}
                  className=" basis-[50%] md:basis-1/2 lg:basis-1/4"
                >
                  <div class="relative overflow-hidden group">
                    <div class="absolute inset-0">
                      <img
                        class="object-cover w-full h-full transition-all rounded-md duration-300 group-hover:-rotate-3 group-hover:scale-125"
                        src={card?.image?.src}
                        alt="cat"
                      />
                    </div>

                    <div class="relative p-4 md:p-6">
                      <p class="text-lg font-bold text-gray-900">{card.name}</p>
                      <p class="mt-1.5 text-sm font-medium text-gray-900">
                        {card?.products} Products
                      </p>

                      <div class="mt-14 md:mt-24">
                        <a
                          href="#"
                          title=""
                          class="inline-flex items-center justify-center px-3 py-2 text-xs font-medium text-white transition-all duration-200 bg-gray-900 border border-transparent rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          role="button"
                        >
                          Shop Now
                          <span
                            class="absolute inset-0"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      </div>
      </div>
      </div>

  );
}

export default Categories;
