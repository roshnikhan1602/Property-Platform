function ApprovedTable({
  approvedView,
  setApprovedView,
  paginatedApproved,
  approvedPage,
  approvedTotalPages,
  setApprovedPage,
  navigate,
  activeTab,
  handleDisapprove,
  handleDisapprovePG,
  handleDelete,
  handleDeletePG,
}) {
  return (
    <>
      <div className="flex gap-3 mb-5">
        <button
          onClick={() =>
            setApprovedView("properties")
          }
          className={`px-5 py-2 rounded-lg font-medium ${
            approvedView === "properties"
              ? "bg-purple-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Properties
        </button>

        <button
          onClick={() =>
            setApprovedView("pgs")
          }
          className={`px-5 py-2 rounded-lg font-medium ${
            approvedView === "pgs"
              ? "bg-purple-600 text-white"
              : "bg-gray-200"
          }`}
        >
          PGs
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            {approvedView === "properties"
              ? "Approved Properties"
              : "Approved PGs"}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4">
                  {approvedView === "properties"
                    ? "Property"
                    : "PG"}
                </th>

                <th className="text-left px-6 py-4">
                  City
                </th>

                <th className="text-left px-6 py-4">
                  Views
                </th>

                <th className="text-center px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedApproved.map((item) => (
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
                    {item.views || 0}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(
                            approvedView ===
                              "properties"
                              ? `/properties/${item._id}`
                              : `/pgs/${item._id}`,
                            {
                              state: {
                                fromAdmin: true,
                                activeTab,
                                approvedView,
                                page: approvedPage,
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
                          approvedView ===
                          "properties"
                            ? handleDisapprove(
                                item._id
                              )
                            : handleDisapprovePG(
                                item._id
                              )
                        }
                        className="bg-yellow-500 text-white px-3 py-2 rounded-lg"
                      >
                        Disapprove
                      </button>

                      <button
                        onClick={() =>
                          approvedView ===
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
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center gap-3 mt-6 mb-6">
          <button
            disabled={approvedPage === 1}
            onClick={() =>
              setApprovedPage(
                approvedPage - 1
              )
            }
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {approvedPage} of{" "}
            {approvedTotalPages}
          </span>

          <button
            disabled={
              approvedPage ===
              approvedTotalPages
            }
            onClick={() =>
              setApprovedPage(
                approvedPage + 1
              )
            }
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default ApprovedTable;