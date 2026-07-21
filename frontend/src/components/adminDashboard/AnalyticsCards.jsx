function AnalyticsCards({
  dashboardStats,
  pendingProperties,
  pendingPGs,
  approvedProperties,
  approvedPGs,
  supportMessages,
}) {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Row 1 */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            {dashboardStats.totalUsers}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">Owners</p>
          <h2 className="text-4xl font-bold text-indigo-600 mt-2">
            {dashboardStats.totalOwners}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">Properties</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {dashboardStats.totalProperties}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">PGs</p>
          <h2 className="text-4xl font-bold text-purple-600 mt-2">
            {dashboardStats.totalPGs}
          </h2>
        </div>

        {/* Row 2 */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-4xl font-bold text-orange-500 mt-2">
            {pendingProperties.length + pendingPGs.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">Approved</p>
          <h2 className="text-4xl font-bold text-purple-600 mt-2">
            {approvedProperties.length + approvedPGs.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">Support</p>
          <h2 className="text-4xl font-bold text-red-600 mt-2">
            {supportMessages.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">
            Active Subscriptions
          </p>
          <h2 className="text-4xl font-bold text-pink-600 mt-2">
            {dashboardStats.activeSubscriptions}
          </h2>
        </div>

        {/* Row 3 */}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">
            ₹{dashboardStats.totalRevenue}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">Monthly Revenue</p>
          <h2 className="text-4xl font-bold text-teal-600 mt-2">
            ₹{dashboardStats.monthlyRevenue}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">Payments</p>
          <h2 className="text-4xl font-bold text-cyan-600 mt-2">
            {dashboardStats.totalPayments}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500">
            Upgrades / Downgrades
          </p>
          <h2 className="text-3xl font-bold mt-2">
            <span className="text-green-600">
              {dashboardStats.upgrades}
            </span>
            {" / "}
            <span className="text-red-600">
              {dashboardStats.downgrades}
            </span>
          </h2>
        </div>
      </div>
    </>
  );
}

export default AnalyticsCards;