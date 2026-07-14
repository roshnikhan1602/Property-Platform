function SubscriptionsTable({
  subscriptions,
  subscriptionPage,
  subscriptionTotalPages,
  setSubscriptionPage,
  subscriptionSearch,
  setSubscriptionSearch,
  subscriptionPlan,
  setSubscriptionPlan,
  subscriptionStatus,
  setSubscriptionStatus,
  subscriptionSort,
setSubscriptionSort,
}) {
  const getDaysLeft = (endDate) => {
  if (!endDate)
    return {
      text: "-",
      className:
        "bg-gray-100 text-gray-700",
    };

  const today = new Date();

  const expiry = new Date(endDate);

  const diff = Math.ceil(
    (expiry - today) /
      (1000 * 60 * 60 * 24)
  );

  if (diff < 0)
    return {
      text: "Expired",
      className:
        "bg-red-100 text-red-700",
    };

  if (diff <= 7)
    return {
      text: `${diff} Days`,
      className:
        "bg-orange-100 text-orange-700",
    };

  if (diff <= 30)
    return {
      text: `${diff} Days`,
      className:
        "bg-yellow-100 text-yellow-700",
    };

  return {
    text: `${diff} Days`,
    className:
      "bg-green-100 text-green-700",
  };
};

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
     <div className="p-6 border-b">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <h2 className="text-2xl font-bold">
      Subscription Management
    </h2>

    <div className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Search by user..."
        value={subscriptionSearch}
        onChange={(e) =>
          setSubscriptionSearch(
            e.target.value
          )
        }
        className="border rounded-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={subscriptionPlan}
        onChange={(e) =>
          setSubscriptionPlan(
            e.target.value
          )
        }
        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">
          All Plans
        </option>
        <option value="Free">
          Free
        </option>
        <option value="Premium">
          Premium
        </option>
        <option value="Elite">
          Elite
        </option>
      </select>

      <select
  value={subscriptionStatus}
  onChange={(e) =>
    setSubscriptionStatus(
      e.target.value
    )
  }
  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="All">
    All Status
  </option>

  <option value="Active">
    Active
  </option>

  <option value="Expired">
    Expired
  </option>
</select>

<select
  value={subscriptionSort}
  onChange={(e) =>
    setSubscriptionSort(
      e.target.value
    )
  }
  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option>Newest</option>

  <option>Oldest</option>

  <option>Highest Amount</option>

  <option>Lowest Amount</option>

  <option>Expiry Soon</option>

  <option>Latest Expiry</option>
</select>
    </div>
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
                  Plan
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>

                <th className="text-left px-6 py-4">
                  Amount
                </th>

                <th className="text-left px-6 py-4">
                  Start Date
                </th>

                <th className="text-left px-6 py-4">
                  End Date
                </th>

                <th className="text-left px-6 py-4">
                  Days Left
                </th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-gray-500"
                  >
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                subscriptions.map(
                  (subscription) => (
                    <tr
                      key={subscription._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold">
                        {subscription.user
                          ?.name || "-"}
                      </td>

                      <td className="px-6 py-4">
                        {subscription.user
                          ?.mobileNumber ||
                          "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            subscription.plan ===
                            "Elite"
                              ? "bg-purple-100 text-purple-700"
                              : subscription.plan ===
                                "Premium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {subscription.plan}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            subscription.status ===
                            "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {subscription.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        ₹{subscription.amount}
                      </td>
                      <td className="px-6 py-4">
  {subscription.startDate
    ? new Date(
        subscription.startDate
      ).toLocaleDateString()
    : "-"}
</td>

<td className="px-6 py-4">
  {subscription.endDate
    ? new Date(
        subscription.endDate
      ).toLocaleDateString()
    : "-"}
</td>

<td className="px-6 py-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium ${
      getDaysLeft(
        subscription.endDate
      ).className
    }`}
  >
    {
      getDaysLeft(
        subscription.endDate
      ).text
    }
  </span>
</td>
</tr>
)
)
)}
</tbody>
</table>
</div>

<div className="flex justify-center items-center gap-3 mt-6 mb-6">

<button
  disabled={subscriptionPage === 1}
  onClick={() =>
    setSubscriptionPage(
      subscriptionPage - 1
    )
  }
  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
>
  Previous
</button>

<span className="font-medium">
  Page {subscriptionPage} of{" "}
  {subscriptionTotalPages}
</span>

<button
  disabled={
    subscriptionPage ===
    subscriptionTotalPages
  }
  onClick={() =>
    setSubscriptionPage(
      subscriptionPage + 1
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

export default SubscriptionsTable;