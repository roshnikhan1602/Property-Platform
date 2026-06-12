function SearchBar() {
  return (
    <section className="relative -mt-12 z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Enter City"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
            </select>

            <select className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Listing Type</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
            </select>

            <button className="bg-blue-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-blue-700 transition">
              Search
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default SearchBar;