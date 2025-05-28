import { useDispatch, useSelector } from "react-redux";
import {
  nextSlide,
  prevSlide,
  setCurrent,
} from "../features/countries/countrySlice";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img4.jpg";
import img3 from "../assets/img3.jpg";
import img5 from "../assets/img5.jpg";
const ImageSlider = () => {
  const dispatch = useDispatch();

  const { current } = useSelector((state) => state.countries);
  const images = [img1, img2, img3];

  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row gap-4 items-center justify-center">
        {/* Main Slider */}
        <div className="relative w-full md:max-w-4xl overflow-hidden rounded-lg p-6">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Slide ${i + 1}`}
                className="w-full flex-shrink-0 h-64 md:h-96 object-contain"
              />
            ))}
          </div>

          {/* Navigation & Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <button
              onClick={() => dispatch(prevSlide())}
              className="p-2 bg-white/70 rounded-full shadow hover:bg-white"
            >
              ‹
            </button>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => dispatch(setCurrent(i))}
                className={`w-3 h-3 rounded-full ${
                  i === current ? "bg-black" : "bg-pink-100"
                }`}
              />
            ))}
            <button
              onClick={() => dispatch(nextSlide())}
              className="p-2 bg-white/70 rounded-full shadow hover:bg-white"
            >
              ›
            </button>
          </div>
        </div>

        {/* Static Image (on top in mobile) */}
        <div className="w-full md:w-[300px] h-64 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src={img5}
            alt="Side Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
