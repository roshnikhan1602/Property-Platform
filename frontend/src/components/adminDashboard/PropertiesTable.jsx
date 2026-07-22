import { useMemo } from "react";

function PropertiesTable({
  propertyView,
  setPropertyView,

  allProperties,
  paginatedProperties,

  propertyPage,
  propertyTotalPages,
  setPropertyPage,

  navigate,
  activeTab,

  handleDelete,
  handleDeletePG,

 handleExportProperties,
handleExportPGs,

propertySearch,
  setPropertySearch,

  propertyCity,
  setPropertyCity,

  propertySort,
  setPropertySort,
}) {
  const cities = useMemo(() => {
    return [
      "All",
      ...new Set(
        allProperties
          .map((item) => item.city)
          .filter(Boolean)
          .sort((a, b) =>
            a.localeCompare(b)
          )
      ),
    ];
  }, [allProperties]);

  return (
    <>
      <div className="flex gap-3 mb-5">
        <button
          onClick={() =>
            setPropertyView("properties")
          }
          className={`px-5 py-2 rounded-lg font-medium ${
            propertyView === "properties"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Properties
        </button>

        <button
          onClick={() =>
            setPropertyView("pgs")
          }
          className={`px-5 py-2 rounded-lg font-medium ${
            propertyView === "pgs"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          PGs
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
       <div className="p-6 border-b flex items-center justify-between">
  <h2 className="text-2xl font-bold">
    {propertyView === "properties"
      ? "All Properties"
      : "All PGs"}
  </h2>

  <button
  onClick={
    propertyView === "properties"
      ? handleExportProperties
      : handleExportPGs
  }
  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition cursor-pointer"
>
  Export Excel
</button>
</div>

        {/* Filters */}

        <div className="p-6 border-b bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder={`Search ${
                propertyView ===
                "properties"
                  ? "Property"
                  : "PG"
              }`}
              value={propertySearch}
              onChange={(e) =>
                setPropertySearch(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2"
            />

            <select
              value={propertyCity}
              onChange={(e) =>
                setPropertyCity(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2"
            >
              {cities.map((city) => (
                <option
                  key={city}
                  value={city}
                >
                  {city === "All"
                    ? "All Cities"
                    : city}
                </option>
              ))}
            </select>

            <select
              value={propertySort}
              onChange={(e) =>
                setPropertySort(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2"
            >
              <option value="Newest">
                Newest
              </option>

              <option value="Oldest">
                Oldest
              </option>

              <option value="Highest Price">
                Highest Price
              </option>

              <option value="Lowest Price">
                Lowest Price
              </option>
            </select>

            <button
              onClick={() => {
                setPropertySearch("");
                setPropertyCity("All");
                setPropertySort(
                  "Newest"
                );
              }}
              className="bg-red-100 text-red-600 rounded-lg px-4 py-2 hover:bg-red-200 transition cursor-pointer"
            >
              Clear Filters
            </button>

          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4">
                  {propertyView ===
                  "properties"
                    ? "Property"
                    : "PG"}
                </th>

                <th className="text-left px-6 py-4">
                  City
                </th>

                <th className="text-left px-6 py-4">
                  {propertyView ===
                  "properties"
                    ? "Price"
                    : "Rent"}
                </th>

                <th className="text-center px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedProperties.length >
              0 ? (
                paginatedProperties.map(
                  (item) => (
                    <tr
                      key={item._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {item.title}
                      </td>

                      <td className="px-6 py-4">
                        {item.city}
                      </td>

                      <td className="px-6 py-4">
                        ₹
                        {propertyView ===
                        "properties"
                          ? item.price
                          : item.rent}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              navigate(
                                propertyView ===
                                  "properties"
                                  ? `/properties/${item._id}`
                                  : `/pgs/${item._id}`,
                                {
                                  state: {
                                    fromAdmin: true,
                                    activeTab,
                                    propertyView,
                                    page: propertyPage,
                                  },
                                }
                              )
                            }
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              propertyView ===
                              "properties"
                                ? handleDelete(
                                    item._id
                                  )
                                : handleDeletePG(
                                    item._id
                                  )
                            }
                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                          >
                            Delete
                          </button>

                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-3 mt-6 mb-6">

          <button
            disabled={
              propertyPage === 1
            }
            onClick={() =>
              setPropertyPage(
                propertyPage - 1
              )
            }
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {propertyPage} of{" "}
            {propertyTotalPages}
          </span>

          <button
            disabled={
              propertyPage ===
              propertyTotalPages
            }
            onClick={() =>
              setPropertyPage(
                propertyPage + 1
              )
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>

        </div>
      </div>
    </>
  );
}

export default PropertiesTable;