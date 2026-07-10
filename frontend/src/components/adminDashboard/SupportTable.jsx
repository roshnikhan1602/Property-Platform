function SupportTable({
  paginatedSupport,
  supportPage,
  supportTotalPages,
  setSupportPage,
  setSelectedMessageId,
  setShowReplyModal,
  handleResolve,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Support Messages
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-4">
                Name
              </th>

              <th className="text-left px-6 py-4">
                Email
              </th>

              <th className="text-left px-6 py-4">
                Message
              </th>

              <th className="text-left px-6 py-4">
                Date
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Reply
              </th>

              <th className="text-left px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedSupport.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  {item.name}
                </td>

                <td className="px-6 py-4">
                  {item.email}
                </td>

                <td className="px-6 py-4 max-w-md">
                  {item.message}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status ===
                      "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status ===
                          "Replied"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {item.reply || "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      disabled={
                        item.status ===
                          "Replied" ||
                        item.status ===
                          "Resolved"
                      }
                      onClick={() => {
                        setSelectedMessageId(
                          item._id
                        );
                        setShowReplyModal(
                          true
                        );
                      }}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Reply
                    </button>

                    <button
                      disabled={
                        item.status ===
                        "Resolved"
                      }
                      onClick={() =>
                        handleResolve(
                          item._id
                        )
                      }
                      className="bg-green-600 text-white px-3 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Resolve
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
          disabled={supportPage === 1}
          onClick={() =>
            setSupportPage(
              supportPage - 1
            )
          }
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {supportPage} of{" "}
          {supportTotalPages}
        </span>

        <button
          disabled={
            supportPage ===
            supportTotalPages
          }
          onClick={() =>
            setSupportPage(
              supportPage + 1
            )
          }
          className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SupportTable;