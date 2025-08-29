import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const products = [
  {
    id: 1,
    title: "HAPPIER THAN EVER",
    artist: "BILLIE EILISH",
    price: "$35.00",
    image:
      "https://berlin-resonance.myshopify.com/cdn/shop/files/intro2.jpg?v=1690438880&width=2000",
  },
  {
    id: 2,
    title: "SOUR",
    artist: "OLIVIA RODRIGO",
    price: "$32.00",
    image:
      "https://berlin-resonance.myshopify.com/cdn/shop/files/intro3.jpg?v=1690438880&width=2000",
  },
  {
    id: 3,
    title: "FOLKLORE",
    artist: "TAYLOR SWIFT",
    price: "$38.00",
    image:
      "https://berlin-resonance.myshopify.com/cdn/shop/files/intro1.jpg?v=1690438880&width=2000",
  },
];

const MainBanner = () => {
  const imageSwiperRef = useRef(null);
  const cardSwiperRef = useRef(null);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* النص الثابت */}
          <div className="flex-1 space-y-6">
            <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-tight">
              INDIE RECORDS
              <br />
              <span className="text-gray-700">&amp; ICONIC</span>
              <br />
              <span className="text-gray-600">CLASSICS</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Shop iconic records, exclusive pressings, and timeless hits.
            </p>
            <button className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2 group">
              SHOP ALL
              <span className="transition-transform group-hover:translate-x-1">
                ➝
              </span>
            </button>
          </div>

          {/* الصورة + السلايدر */}
          <div className="flex-1 flex flex-col lg:flex-row gap-8 items-center">
            {/* الصورة المتغيرة */}
            <div className="flex-1 flex justify-center relative">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                onSwiper={(swiper) => (imageSwiperRef.current = swiper)}
                onSlideChange={(swiper) =>
                  cardSwiperRef.current?.slideTo(swiper.activeIndex)
                }
                className="w-96"
              >
                {products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-96 h-96 object-cover rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* السليدر - الكروت */}
            <div className="flex-1 max-w-sm">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                onSwiper={(swiper) => (cardSwiperRef.current = swiper)}
                onSlideChange={(swiper) =>
                  imageSwiperRef.current?.slideTo(swiper.activeIndex)
                }
                className="w-full"
              >
                {products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                      <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-amber-100 to-orange-200">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>

                      <div className="text-center space-y-2">
                        <p className="text-sm text-gray-500 font-medium tracking-wider">
                          {product.artist}
                        </p>
                        <h3 className="text-xl font-bold text-gray-900">
                          {product.title}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                          {product.price}
                        </p>
                      </div>

                      <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium">
                        ADD TO CART
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
