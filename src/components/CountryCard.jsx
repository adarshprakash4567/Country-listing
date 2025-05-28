import PropTypes from "prop-types";

const CountryCard = ({ country }) => {
  return (
    <div className="bg-white border border-gray-700 shadow-[6px_6px_6px_rgba(0,0,0,0.2)] rounded-zero overflow-hidden flex">
      <img
        src={country.flag}
        alt={country.name}
        className="h-24 w-24 object-cover p-4"
      />
      <div className="p-4 flex flex-col justify-center">
        <h5 className="text-lg font-semibold">{country.name}</h5>
        <p className="text-gray-500">{country.region}</p>
      </div>
    </div>
  );
};

CountryCard.propTypes = {
  country: PropTypes.shape({
    flag: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
  }).isRequired,
};

export default CountryCard;
