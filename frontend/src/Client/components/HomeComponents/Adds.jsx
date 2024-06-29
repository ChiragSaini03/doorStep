import React from "react";
import ads1 from "../utils/ads1.png";
import ads2 from "../utils/ads2.png";
import ads3 from "../utils/ads3.png";
import ads4 from "../utils/ads4.png";
// Import Swiper React components
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/navigation";

// import "..//styles.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import required modules
import { EffectCoverflow } from "swiper";
// import Heading from "./Heading/Heading";

const Adds = () => {
  return (
    <div class="adds">
      <main className="gallery-section" data-aos="zoom-in" id="gallery">
        <div className="gallery-header">{/* <Heading name="GALLERY" /> */}</div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 105,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            disableOnInteraction: false,
          }}
          // pagination={true}
          navigation={true}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={ads1} alt="img-1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads2} alt="img-2" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads3} alt="img-3" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads4} alt="img-4" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads1} alt="img-5" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads2} alt="img-6" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads3} alt="img-7" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads4} alt="img-8" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads1} alt="img-9" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads2} alt="img-10" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads3} alt="img-11" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads4} alt="img-12" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads1} alt="img-1" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={ads2} alt="img-2" />
          </SwiperSlide>
        </Swiper>
      </main>
      {/* <div className="adds_posters bg-white dark:bg-slate-900 w-5/6 h-40 m-auto grid justify-center">
        <table>
          <tr>
            <td>
              <img
                src={ads}
                className="inline h-40 w-[750px]  rounded-lg pr-4"
                alt=""
              />
            </td>
            <td>
              <div className="inline justify-end">
                <h1 className="inline text-2xl">Adds powered by Google</h1>
              </div>
            </td>
          </tr>
        </table>
      </div> */}
    </div>
  );
};

export default Adds;
