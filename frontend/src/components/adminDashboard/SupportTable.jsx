import { MdDeleteOutline } from "react-icons/md";

function SupportTable({
  paginatedSupport,
  supportPage,
  supportTotalPages,
  setSupportPage,
  handleDeleteSupport,
  setSelectedMessageId,
  setShowReplyModal,
  handleResolve,

  supportSearch,
  setSupportSearch,

  supportStatus,
  setSupportStatus,
}) {
  const filteredSupport = paginatedSupport.filter(
    (item) => {
      const matchesSearch =
        item.name
          ?.toLowerCase()
          .includes(
            supportSearch.toLowerCase()
          ) ||
        item.email
          ?.toLowerCase()
          .includes(
            supportSearch.toLowerCase()
          );

      const matchesStatus =
        supportStatus === "All" ||
        item.status === supportStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Support Messages
        </h2>
      </div>

      {/* Filters */}

      <div className="p-6 border-b bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search Name or Email"
            value={supportSearch}
            onChange={(e) =>
              setSupportSearch(
                e.target.value
              )
            }
            className="border rounded-lg px-4 py-2"
          />

          <select
            value={supportStatus}
            onChange={(e) =>
              setSupportStatus(
                e.target.value
              )
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="All">
              All Status
            </option>

            <option value="Pending">
              Pending
            </option>

            <option value="Replied">
              Replied
            </option>

            <option value="Resolved">
              Resolved
            </option>
          </select>

          <button
            onClick={() => {
              setSupportSearch("");
              setSupportStatus("All");
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

            {filteredSupport.length > 0 ? (
              filteredSupport.map((item) => (
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

                      <button
                        onClick={() =>
                          handleDeleteSupport(
                            item._id
                          )
                        }
                        className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm transition-all duration-200 cursor-pointer"
                        title="Delete"
                      >
                        <MdDeleteOutline
                          size={22}
                        />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500"
                >
                  No support messages found.
                </td>
              </tr>
            )}

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