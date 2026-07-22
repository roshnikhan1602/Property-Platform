import { useState } from "react";

function VisitsTable({
    visits,
    visitStats,
    visitPage,
    visitTotalPages,
    setVisitPage,
    visitSearch,
    setVisitSearch,
    visitStatus,
    setVisitStatus,
    visitSort,
    setVisitSort,
}) {
    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "Approved":
                return "bg-blue-100 text-blue-700";

            case "Completed":
                return "bg-green-100 text-green-700";

            case "Rejected":
                return "bg-red-100 text-red-700";

            case "Cancelled":
                return "bg-gray-200 text-gray-700";

            case "Rescheduled":
                return "bg-purple-100 text-purple-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const [selectedVisit, setSelectedVisit] = useState(null);
    return (
        <>
            <div className="space-y-6">

                {/* Statistics */}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <h3 className="text-sm text-gray-500">
                            Total
                        </h3>

                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {visitStats.totalVisits}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <h3 className="text-sm text-gray-500">
                            Pending
                        </h3>

                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                            {visitStats.pendingVisits}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <h3 className="text-sm text-gray-500">
                            Approved
                        </h3>

                        <p className="text-3xl font-bold text-blue-500 mt-2">
                            {visitStats.approvedVisits}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <h3 className="text-sm text-gray-500">
                            Completed
                        </h3>

                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {visitStats.completedVisits}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <h3 className="text-sm text-gray-500">
                            Rejected
                        </h3>

                        <p className="text-3xl font-bold text-red-600 mt-2">
                            {visitStats.rejectedVisits}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <h3 className="text-sm text-gray-500">
                            Cancelled
                        </h3>

                        <p className="text-3xl font-bold text-gray-600 mt-2">
                            {visitStats.cancelledVisits}
                        </p>
                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div className="p-6 border-b">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                            <h2 className="text-2xl font-bold">
                                Visit Management
                            </h2>

                            <div className="flex flex-col lg:flex-row gap-3 lg:ml-auto">

                                <input
                                    type="text"
                                    placeholder="Search visitor, owner or property..."
                                    value={visitSearch}
                                    onChange={(e) =>
                                        setVisitSearch(e.target.value)
                                    }
                                    className="border rounded-lg px-4 py-2 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <select
                                    value={visitStatus}
                                    onChange={(e) =>
                                        setVisitStatus(e.target.value)
                                    }
                                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Rescheduled">Rescheduled</option>
                                </select>

                                <select
                                    value={visitSort}
                                    onChange={(e) =>
                                        setVisitSort(e.target.value)
                                    }
                                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Newest</option>
                                    <option>Oldest</option>
                                </select>

                            </div>

                        </div>

                    </div>
                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        Visitor
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Owner
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Property
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Type
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Visit Date
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Visit Time
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Status
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Action
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {visits.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-10 text-gray-500"
                                        >
                                            No visits found.
                                        </td>

                                    </tr>

                                ) : (

                                    visits.map((visit) => (

                                        <tr
                                            key={visit._id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >

                                            <td className="px-6 py-4">

                                                <div className="font-semibold">
                                                    {visit.user?.name || "-"}
                                                </div>

                                                <div className="text-sm text-gray-500">
                                                    {visit.user?.mobileNumber || "-"}
                                                </div>

                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="font-semibold">
                                                    {visit.owner?.name || "-"}
                                                </div>

                                                <div className="text-sm text-gray-500">
                                                    {visit.owner?.mobileNumber || "-"}
                                                </div>

                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="font-semibold">
                                                    {visit.propertyTitle || "-"}
                                                </div>

                                                <div className="text-sm text-gray-500">
                                                    {visit.propertyCity || "-"}
                                                </div>

                                            </td>

                                            <td className="px-6 py-4">
                                                {visit.visitType || "-"}
                                            </td>

                                            <td className="px-6 py-4">

                                                {visit.visitDate
                                                    ? new Date(
                                                        visit.visitDate
                                                    ).toLocaleDateString()
                                                    : "-"}

                                            </td>

                                            <td className="px-6 py-4">
                                                {visit.visitTime || "-"}
                                            </td>

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                                                        visit.status
                                                    )}`}
                                                >
                                                    {visit.status}
                                                </span>

                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedVisit(visit)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                                                >
                                                    View
                                                </button>
                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>
                    <div className="flex justify-center items-center gap-3 mt-6 mb-6">

                        <button
                            disabled={visitPage === 1}
                            onClick={() =>
                                setVisitPage(visitPage - 1)
                            }
                            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span className="font-medium">
                            Page {visitPage} of {visitTotalPages}
                        </span>

                        <button
                            disabled={
                                visitPage === visitTotalPages
                            }
                            onClick={() =>
                                setVisitPage(visitPage + 1)
                            }
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>
            {selectedVisit && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

                        <h2 className="text-2xl font-bold mb-6">
                            Visit Details
                        </h2>

                        <div className="space-y-3">

                            <p>
                                <strong>Visitor:</strong>{" "}
                                {selectedVisit.user?.name}
                            </p>

                            <p>
                                <strong>Visitor Mobile:</strong>{" "}
                                {selectedVisit.user?.mobileNumber}
                            </p>

                            <p>
                                <strong>Owner:</strong>{" "}
                                {selectedVisit.owner?.name}
                            </p>

                            <p>
                                <strong>Owner Mobile:</strong>{" "}
                                {selectedVisit.owner?.mobileNumber}
                            </p>

                            <p>
                                <strong>Property:</strong>{" "}
                                {selectedVisit.propertyTitle}
                            </p>

                            <p>
                                <strong>City:</strong>{" "}
                                {selectedVisit.propertyCity}
                            </p>

                            <p>
                                <strong>Visit Type:</strong>{" "}
                                {selectedVisit.visitType}
                            </p>

                            <p>
                                <strong>Date:</strong>{" "}
                                {new Date(
                                    selectedVisit.visitDate
                                ).toLocaleDateString()}
                            </p>

                            <p>
                                <strong>Time:</strong>{" "}
                                {selectedVisit.visitTime}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                                        selectedVisit.status
                                    )}`}
                                >
                                    {selectedVisit.status}
                                </span>
                            </p>

                            {selectedVisit.cancellationReason && (
                                <p>
                                    <strong>Reason:</strong>{" "}
                                    {selectedVisit.cancellationReason}
                                </p>
                            )}

                            <p>
                                <strong>Booked On:</strong>{" "}
                                {new Date(
                                    selectedVisit.createdAt
                                ).toLocaleString()}
                            </p>

                        </div>

                        <div className="flex justify-end mt-6">

                            <button
                                onClick={() => setSelectedVisit(null)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}

export default VisitsTable;