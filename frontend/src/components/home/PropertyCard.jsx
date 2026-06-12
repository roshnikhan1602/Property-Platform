import { useNavigate } from "react-router-dom";

function PropertyCard({ property }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300">

      {/* Property Image */}
      <div className="h-56 bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center">

        <div className="text-5xl">
          🏠
        </div>

        <p className="mt-3 text-gray-600 font-medium">
          Property Image Coming Soon
        </p>

      </div>

      {/* Property Details */}
      <div className="p-5">

        <div className="flex justify-between items-start gap-3">

          <h3 className="text-xl font-bold text-gray-800">
            {property.title}
          </h3>

          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            {property.listingType}
          </span>

        </div>

        <p className="text-gray-500 mt-2">
          📍 {property.city}, {property.state}
        </p>

        <div className="mt-4 flex justify-between text-sm text-gray-600">

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {property.propertyType}
          </span>

          <span className="bg-gray-100 px-3 py-1 rounded-full">
            {property.area} sq.ft
          </span>

        </div>

        <div className="mt-5">

          <p className="text-sm text-gray-500">
            Starting From
          </p>

          <h4 className="text-3xl font-bold text-blue-600">
            ₹ {property.price.toLocaleString()}
          </h4>

        </div>

        <button
          onClick={() => navigate(`/properties/${property._id}`)}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          View Details
        </button>

      </div>
    </div>
  );
}

export default PropertyCard;