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
}) {
  return (
    <>
      <div className="flex gap-3 mb-5">
        <button
          onClick={() =>
            setPendingView("properties")
          }
          className={`px-5 py-2 rounded-lg font-medium ${
            pendingView === "properties"
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
          className={`px-5 py-2 rounded-lg font-medium ${
            pendingView === "pgs"
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4">
                  {pendingView === "properties"
                    ? "Property"
                    : "PG"}
                </th>

                <th className="text-left px-6 py-4">
                  City
                </th>

                <th className="text-left px-6 py-4">
                  {pendingView === "properties"
                    ? "Price"
                    : "Rent"}
                </th>

                <th className="text-center px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedPending.map((item) => (
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
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg"
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
                        className="bg-green-600 text-white px-3 py-2 rounded-lg"
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-3 mt-6 mb-6">
          <button
            disabled={pendingPage === 1}
            onClick={() =>
              setPendingPage(
                pendingPage - 1
              )
            }
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
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
            className="px-4 py-2 bg-orange-500 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default PendingTable;