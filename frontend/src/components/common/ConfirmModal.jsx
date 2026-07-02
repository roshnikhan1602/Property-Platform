function ConfirmModal({
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

        <h2 className="text-2xl font-bold mb-3">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;