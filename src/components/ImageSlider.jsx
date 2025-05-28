import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

const ImageSlider = ({ images, sideImage,prevSlide,nextSlide }) => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.countries);

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
                key={img}
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
            {images.map((img, i) => (
              <button
                key={img}
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

        {/* Static Side Image */}
        <div className="w-full md:w-1/2 h-64 md:h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <img
            src={sideImage}
            alt="Side Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  sideImage: PropTypes.string.isRequired,
  prevSlide:PropTypes.string.isRequired,
  nextSlide:PropTypes.string.isRequired

};
export default ImageSlider;
