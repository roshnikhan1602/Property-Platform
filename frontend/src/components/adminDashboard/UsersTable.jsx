function UsersTable({
  paginatedUsers,
  userPage,
  userTotalPages,
  setUserPage,
  handleViewUser,
  handleDeleteUser,

  userSearch,
  setUserSearch,

  userRole,
  setUserRole,

  userSort,
  setUserSort,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          All Users
        </h2>
      </div>

      {/* Filters */}

      <div className="p-6 border-b bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search by Name / Email"
            value={userSearch}
            onChange={(e) =>
              setUserSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          />

          <select
            value={userRole}
            onChange={(e) =>
              setUserRole(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="All">
              All Roles
            </option>

            <option value="user">
              User
            </option>

            <option value="owner">
              Owner
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <select
            value={userSort}
            onChange={(e) =>
              setUserSort(e.target.value)
            }
            className="border rounded-lg px-4 py-2"
          >
            <option value="Newest">
              Newest
            </option>

            <option value="Oldest">
              Oldest
            </option>

            <option value="A-Z">
              Name (A-Z)
            </option>

            <option value="Z-A">
              Name (Z-A)
            </option>
          </select>

          <button
            onClick={() => {
              setUserSearch("");
              setUserRole("All");
              setUserSort("Newest");
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
                User
              </th>

              <th className="text-left px-6 py-4">
                Mobile
              </th>

              <th className="text-left px-6 py-4">
                Role
              </th>

              <th className="text-center px-6 py-4">
                Properties
              </th>

              <th className="text-center px-6 py-4">
                PGs
              </th>

              <th className="text-left px-6 py-4">
                Joined
              </th>

              <th className="text-center px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {user.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {user.email ||
                            "No Email"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {user.mobileNumber}
                  </td>

                  <td className="px-6 py-4">
                    <span className="capitalize px-3 py-1 rounded-full bg-gray-100 text-sm">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {user.propertyCount}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {user.pgCount}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          handleViewUser(
                            user._id
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                      >
                        View
                      </button>

                      {user.role !==
                        "admin" && (
                        <button
                          onClick={() =>
                            handleDeleteUser(
                              user._id
                            )
                          }
                          className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      )}

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
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-3 mt-6 mb-6">

        <button
          disabled={userPage === 1}
          onClick={() =>
            setUserPage(userPage - 1)
          }
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>

        <span className="font-medium">
          Page {userPage} of{" "}
          {userTotalPages}
        </span>

        <button
          disabled={
            userPage === userTotalPages
          }
          onClick={() =>
            setUserPage(userPage + 1)
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default UsersTable;