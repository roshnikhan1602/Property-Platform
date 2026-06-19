import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PropertyFilterBar() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [listingType, setListingType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (city) params.append("city", city);
    if (locality)
      params.append("locality", locality);
    if (propertyType)
      params.append("propertyType", propertyType);
    if (listingType)
      params.append("listingType", listingType);
    if (minPrice)
      params.append("minPrice", minPrice);
    if (maxPrice)
      params.append("maxPrice", maxPrice);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mt-8">

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="text"
          placeholder="Locality"
          value={locality}
          onChange={(e) =>
            setLocality(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <select
          value={propertyType}
          onChange={(e) =>
            setPropertyType(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="">
            Property Type
          </option>
          <option value="Apartment">
            Apartment
          </option>
          <option value="House">
            House
          </option>
          <option value="Villa">
            Villa
          </option>
          <option value="Plot">
            Plot
          </option>
        </select>

        <select
          value={listingType}
          onChange={(e) =>
            setListingType(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="">
            Listing Type
          </option>
          <option value="Rent">
            Rent
          </option>
          <option value="Sale">
            Sale
          </option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
          className="border border-gray-300 rounded-lg px-4 py-3"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transition"
        >
          Search
        </button>

      </div>

    </div>
  );
}

export default PropertyFilterBar;