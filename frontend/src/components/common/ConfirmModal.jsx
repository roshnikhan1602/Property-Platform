function ConfirmModal({
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-4 py-6">

      <div className="bg-white rounded-2xl p-5 sm:p-6 w-full max-w-md shadow-xl">

        <h2 className="text-xl sm:text-2xl font-bold mb-3">
          {title}
        </h2>

        <p className="text-gray-600 mb-6 text-sm sm:text-base break-words">
          {message}
        </p>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">

          <button
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;