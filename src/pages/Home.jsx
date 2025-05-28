import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCountries,
  nextSlide,
  prevSlide,
  setCurrent,
  loadMore,
} from "../features/countries/countrySlice";
import RegionFilter from "../components/RegionFilter";
import Footer from "../components/Footer";
import LoaderCmp from "../components/loader/LoaderCmp";
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img4.jpg';
import img3 from '../assets/img3.jpg';
import img5 from '../assets/img5.jpg';
import ImageSlider from "../components/ImageSlider";


export default function Home() {
  const dispatch = useDispatch();
  const { items, status, region, current, visible ,loading} = useSelector((state) => state.countries);

  const images = [
  img1,img2,img3
  ];

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
    return country.name.toLowerCase() && (region ? country.region === region : true);
  });
if (status === "loading") {
  return (
 <LoaderCmp/>
  );
}
  return (
    <div className="container mx-auto p-4 flex flex-col gap-3">
      
      {/* <div className="flex flex-row justify-between items-center mb-6"> */}
        <RegionFilter regions={regions} />
      {/* </div> */}

<div className="py-4 mb-6 border-t-2 border-b-2 border-[#3D3D3D]  md:border-none">
  <h1 className="text-center text-3xl font-semibold">Welcome</h1>
</div>
                                                        
<ImageSlider/>

      {/* Country Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-3">
        {filteredCountries.slice(0, visible).map((country, i) => (
          <div
            key={i}
            className="bg-white border border-gray-700 shadow-[6px_6px_6px_rgba(0,0,0,0.2)] rounded-zero overflow-hidden flex"
          >
            <img src={country.flag} alt={country.name} className="h-24 w-24 object-cover p-4" />
            <div className="p-4 flex flex-col justify-center">
              <h5 className="text-lg font-semibold">{country.name}</h5>
              <p className="text-gray-500">{country.region}</p>
            </div>
          </div>
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
 <div className="mt-2">
       <Footer className='mb-2'/>
       <div className="flex flex-col gap-2 text-gray-500 text-center mt-2 font-semibold">
       <h4>Example@gmail.com</h4>
       <h4>Copyright © 2020 Name. All rights reserved.</h4>
 </div></div>
    </div>
    
  );
}
