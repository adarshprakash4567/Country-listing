import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCountries,
  nextSlide,
  prevSlide,
  loadMore,
} from "../features/countries/countrySlice";
import RegionFilter from "../components/RegionFilter";
import Footer from "../components/Footer";
import LoaderCmp from "../components/loader/LoaderCmp";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img4.jpg";
import img3 from "../assets/img3.jpg";
import img5 from "../assets/img5.jpg";
import ImageSlider from "../components/ImageSlider";
import CountryCard from "../components/CountryCard";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, region, visible } = useSelector(
    (state) => state.countries
  );

  const sliderImages = [img1, img2, img3];
  const sideImage = img5;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(nextSlide());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") dispatch(fetchCountries());
  }, [status, dispatch]);

  const regions = ["", "Asia", "Europe"];

  const filteredCountries = items.filter((country) => {
    return (
      country.name.toLowerCase() && (region ? country.region === region : true)
    );
  });
  if (status === "loading") {
    return <LoaderCmp />;
  }
  return (
    <div className="container mx-auto p-4 flex flex-col gap-3">
      {/* <div className="flex flex-row justify-between items-center mb-6"> */}
      <RegionFilter regions={regions} />
      {/* </div> */}

<div className="flex flex-col items-center space-y-2 my-8">
  <div className="flex items-center w-full max-md:hidden">
    <div className="flex-grow border-t-2 border-gray-600 mt-[-18px] mr-2"></div>
    <h1 className="text-center text-3xl font-semibold text-[#3D3D3D]">WELCOME</h1>
    <div className="flex-grow border-t-2 border-gray-600 mt-[18px] ml-2"></div>
  </div>

  <div className="md:hidden border-t-2 border-b-2 border-[#3D3D3D] py-4 mb-6 w-full">
    <h1 className="text-center text-3xl font-semibold text-[#3D3D3D]">Welcome</h1>
  </div>
</div>

      <div>
        <ImageSlider images={sliderImages} sideImage={sideImage} prevSlide={prevSlide} nextSlide={nextSlide}/>
      </div>
      {/* Country Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-3">
        {filteredCountries.slice(0, visible).map((country) => (
          <CountryCard key={country.name} country={country} />
        ))}
      </div>

      {/* Load More Button */}
      {visible < filteredCountries.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => dispatch(loadMore())}
            className="rounded-zero bg-[#3C3C3C] text-[#FCFCFC] p-4"
          >
            Load More
          </button>
        </div>
      )}
      {/* Footter section */}
      <div className="mt-2">
        <Footer className="mb-2" />
        <div className="flex flex-col gap-2 text-gray-500 text-center mt-2 font-semibold">
          <h4 className="no-underline">Example@gmail.com</h4>
          <h4>Copyright © 2020 Name. All rights reserved.</h4>
        </div>
      </div>
    </div>
  );
}
