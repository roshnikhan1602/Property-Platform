function PropertiesTable({
  propertyView,
  setPropertyView,
  paginatedProperties,
  propertyPage,
  propertyTotalPages,
  setPropertyPage,
  navigate,
  activeTab,
  handleDelete,
  handleDeletePG,
}) {
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
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            {propertyView === "properties"
              ? "All Properties"
              : "All PGs"}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4">
                  {propertyView === "properties"
                    ? "Property"
                    : "PG"}
                </th>

                <th className="text-left px-6 py-4">
                  City
                </th>

                <th className="text-left px-6 py-4">
                  {propertyView === "properties"
                    ? "Price"
                    : "Rent"}
                </th>

                <th className="text-center px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedProperties.map(
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
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
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
                          className="bg-red-600 text-white px-3 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            disabled={propertyPage === 1}
            onClick={() =>
              setPropertyPage(
                propertyPage - 1
              )
            }
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PropertiesTable;