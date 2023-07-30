import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import seeds from '../../../assets/home/categories/seeds.avif';
import soil from '../../../assets/home/categories/soil.avif';
import accessories from '../../../assets/home/categories/accessories.avif';
import containers from '../../../assets/home/categories/containers.avif';
import fertilizer from '../../../assets/home/categories/fertilizer.avif';
import packaging from '../../../assets/home/categories/packaging.avif';
import plants from '../../../assets/home/categories/plants.avif';
import pots from '../../../assets/home/categories/pots.avif';
import sprinkler from '../../../assets/home/categories/sprinkler.avif';
import stones from '../../../assets/home/categories/stones.avif';
import tools from '../../../assets/home/categories/tools.avif';
import tray from '../../../assets/home/categories/tray.avif';


import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {

    const categories = [
        { value: "soil", label: "Seeds", slideImage: seeds },
        { value: "seeds", label: "Soil", slideImage: soil },
        { value: "fertilizer", label: "Fertilizer", slideImage: fertilizer },
        { value: "tray", label: "Tray", slideImage: tray },
        { value: "tools", label: "Tools", slideImage: tools },
        { value: "accessories", label: "Accessories", slideImage: accessories },
        { value: "pots", label: "Pots", slideImage: pots },
        { value: "containers", label: "Containers", slideImage: containers },
        { value: "stones-pebbles", label: "Stones and Pebbles", slideImage: stones },
        { value: "sprinkler-irrigation", label: "Sprinkler and Irrigation", slideImage: sprinkler },
        { value: "plants", label: "Plants", slideImage: plants },
        { value: "packaging-materials", label: "Packaging Materials", slideImage: packaging },
    ];

    return (
        <section>
            {/* <SectionTitle
                subHeading={"From 11.00am to 10.00pm"}
                heading={"Order Online"}
            ></SectionTitle>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{ clickable: true }}
                // modules={[Pagination]}
                className="mySwiper mb-24"
            >

                {categories.map((category) => (
                    <SwiperSlide key={category.value}>
                        <div
                            className="h-60 w-60 rounded-md 
                            // overflow-hidden relative
                            "
                        >
                            <img
                                src={category.slideImage}
                                alt={category.label}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-center">
                                <h3 className="text-3xl uppercase text-white py-2">
                                    {category.label.split(" ")[0]}
                                </h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper> */}

            <section>
                <SectionTitle
                    subHeading={"From 11.00am to 10.00pm"}
                    heading={"Order Online"}
                />

                <div className="hidden md:block">
                    {/* Show the larger Swiper on screens with a width of md (768px) and above */}
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={4}
                        centeredSlides={true}
                        pagination={{ clickable: true }}
                        className="mySwiper mb-24"
                    >
                        {categories.map((category) => (
                            <SwiperSlide key={category.value}>
                                <div className="h-60 w-60 rounded-md relative overflow-hidden">
                                    <img
                                        src={category.slideImage}
                                        alt={category.label}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-center">
                                        <h3 className="text-3xl uppercase text-white py-2">
                                            {category.label.split(" ")[0]}
                                        </h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="md:hidden">
                    {/* Show the smaller Swiper on screens with a width below md (768px) */}
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={4}
                        centeredSlides={true}
                        pagination={{ clickable: true }}
                        className="mySwiper mb-24"
                    >
                        {categories.map((category) => (
                            <SwiperSlide key={category.value}>
                                <div className="h-36 w-36 rounded-md relative overflow-hidden">
                                    <img
                                        src={category.slideImage}
                                        alt={category.label}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-center">
                                        <h3 className="text-xl uppercase text-white py-1">
                                            {category.label.split(" ")[0]}
                                        </h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </section>


        </section>

    );
};

export default Category;