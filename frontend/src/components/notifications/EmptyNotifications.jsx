import { FaBellSlash } from "react-icons/fa";

function EmptyNotifications() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-12 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center">
        <FaBellSlash className="text-5xl text-blue-600" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-gray-800">
        No Notifications
      </h2>

      <p className="mt-3 text-gray-500 max-w-md mx-auto">
        You're all caught up! Any updates about your
        properties, PGs, approvals, subscriptions,
        or account activity will appear here.
      </p>
    </div>
  );
}

export default EmptyNotifications;