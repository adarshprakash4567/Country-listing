import { useDispatch, useSelector } from "react-redux";
import { setRegion } from "../features/countries/countrySlice";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function RegionFilter({ regions }) {
  const dispatch = useDispatch();
  const region = useSelector((state) => state.countries.region);
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex flex-row justify-between items-center mb-6 relative md:flex space-x-6 text-sm font-medium ${
        open ? "w-full" : ""
      }`}
    >
        
<h2
  className={`text-gray-600 font-bold text-[24px] leading-[34px] tracking-[0] ${
    open ? "hidden" : ""
  }`}
>
  Countries
</h2>


      <div className="hidden md:flex space-x-8">
        {regions.map((r) => {
          const label = r === "" ? "All" : r;
          const isActive = region === r;
          return (
            <button
              key={r}
              onClick={() => dispatch(setRegion(r))}
              className={`relative inline-block cursor-pointer pb-1 after:absolute after:bottom-0 after:left-[0px] after:right-[-12px] after:h-[2px] ${
    isActive
      ? "text-black after:bg-[#3E3E3E]"
      : "text-gray-500 hover:text-gray-700 after:bg-transparent"
  }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Mobile icons for toggling */}
      <div className="md:hidden flex space-x-3 relative z-20">
        {open ? (
          <X
            className="cursor-pointer hover:text-gray-700 transition-transform duration-150 active:scale-90"
            onClick={() => setOpen(false)}
            size={24}
            aria-label="Close region filter menu"
          />
        ) : (
          <Menu
            className="cursor-pointer hover:text-gray-700 transition-transform duration-150 active:scale-90 gap-2"
            onClick={() => setOpen(true)}
            size={24}
            aria-label="Open region filter menu"
          />
        )}
      </div>

      {/* Dropdown menu for mobile */}
      {open && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow z-10">
          <ul>
            {regions.map((r) => {
              const label = r === "" ? "All" : r;
              return (
                <li key={r}>
                  <button
                    onClick={() => {
                      dispatch(setRegion(r));
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      region === r ? "bg-gray-200 font-semibold" : ""
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
