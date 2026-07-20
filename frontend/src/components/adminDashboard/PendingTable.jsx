function PendingTable({
  pendingView,
  setPendingView,
  paginatedPending,
  pendingPage,
  pendingTotalPages,
  setPendingPage,
  navigate,
  activeTab,
  handleApprove,
  handleApprovePG,

  pendingSearch,
  setPendingSearch,

  handleDelete,
  handleDeletePG,

  pendingCity,
  setPendingCity,

  pendingSort,
  setPendingSort,
}) {
  return (
    <>
      <div className="flex gap-3 mb-5">
        <button
          onClick={() =>
            setPendingView("properties")
          }
          className={`px-5 py-2 rounded-lg font-medium ${pendingView === "properties"
            ? "bg-orange-500 text-white"
            : "bg-gray-200"
            }`}
        >
          Properties
        </button>

        <button
          onClick={() =>
            setPendingView("pgs")
          }
          className={`px-5 py-2 rounded-lg font-medium ${pendingView === "pgs"
            ? "bg-orange-500 text-white"
            : "bg-gray-200"
            }`}
        >
          PGs
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            {pendingView === "properties"
              ? "Pending Properties"
              : "Pending PGs"}
          </h2>
        </div>

        {/* Filters */}

        <div className="p-6 border-b bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder={`Search ${pendingView === "properties"
                ? "Property"
                : "PG"
                }`}
              value={pendingSearch}
              onChange={(e) =>
                setPendingSearch(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="text"
              placeholder="Filter by City"
              value={
                pendingCity === "All"
                  ? ""
                  : pendingCity
              }
              onChange={(e) =>
                setPendingCity(
                  e.target.value || "All"
                )
              }
              className="border rounded-lg px-4 py-2"
            />

            <select
              value={pendingSort}
              onChange={(e) =>
                setPendingSort(
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
                setPendingSearch("");
                setPendingCity("All");
                setPendingSort("Newest");
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
                  {pendingView ===
                    "properties"
                    ? "Property"
                    : "PG"}
                </th>

                <th className="text-left px-6 py-4">
                  City
                </th>

                <th className="text-left px-6 py-4">
                  {pendingView ===
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
              {paginatedPending.length >
                0 ? (
                paginatedPending.map(
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
                        {pendingView ===
                          "properties"
                          ? item.price
                          : item.rent}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              navigate(
                                pendingView ===
                                  "properties"
                                  ? `/properties/${item._id}`
                                  : `/pgs/${item._id}`,
                                {
                                  state: {
                                    fromAdmin: true,
                                    activeTab,
                                    pendingView,
                                    page: pendingPage,
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
                              pendingView ===
                                "properties"
                                ? handleApprove(
                                  item._id
                                )
                                : handleApprovePG(
                                  item._id
                                )
                            }
                            className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              pendingView === "properties"
                                ? handleDelete(item._id)
                                : handleDeletePG(item._id)
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
                    No pending records
                    found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-3 mt-6 mb-6">

          <button
            disabled={
              pendingPage === 1
            }
            onClick={() =>
              setPendingPage(
                pendingPage - 1
              )
            }
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {pendingPage} of{" "}
            {pendingTotalPages}
          </span>

          <button
            disabled={
              pendingPage ===
              pendingTotalPages
            }
            onClick={() =>
              setPendingPage(
                pendingPage + 1
              )
            }
            className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>

        </div>
      </div>
    </>
  );
}

export default PendingTable;