import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

function HeroSlider() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/properties"
        );

        const data = await response.json();

        if (data.success) {
          const approvedProperties =
            data.properties
              .filter(
                (property) =>
                  property.isApproved
              )
              .sort(
                (a, b) =>
                  new Date(b.createdAt) -
                  new Date(a.createdAt)
              )
              .slice(0, 5);

          setProperties(
            approvedProperties
          );
        }
      } catch (error) {
        console.error(
          "Error fetching hero properties:",
          error
        );
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (properties.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === properties.length - 1
          ? 0
          : prev + 1
      );
    }, 3500);

    return () =>
      clearInterval(interval);
  }, [properties]);

  const dummyImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  ];

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md mx-auto animate-pulse">

        <div className="h-64 bg-gray-200"></div>

        <div className="p-5">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

      </div>
    );
  }

  const property = properties[current];

  const image =
    property.images?.length > 0
      ? property.images[0]
      : dummyImages[
          current %
            dummyImages.length
        ];

  return (
    <div
      onClick={() =>
        navigate(
          `/properties/${property._id}`
        )
      }
      className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md mx-auto cursor-pointer hover:-translate-y-2 hover:shadow-3xl transition-all duration-500"
    >
      <img
        src={image}
        alt={property.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">

        <div className="flex justify-between items-start gap-2">

          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {property.title}
          </h3>

          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
            {property.listingType}
          </span>

        </div>

        <p className="text-gray-500 mt-3 flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />

          {property.locality},{" "}
          {property.city}
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

          <h4 className="text-2xl font-bold text-blue-600">
            ₹{" "}
            {property.price.toLocaleString()}
          </h4>

        </div>

        <p className="text-xs text-gray-400 mt-3">
          Click to view property details →
        </p>

        <div className="flex justify-center gap-2 mt-5">

          {properties.map(
            (_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? "w-8 bg-blue-600"
                    : "w-2 bg-gray-300"
                }`}
              />
            )
          )}

        </div>

      </div>
    </div>
  );
}

export default HeroSlider;