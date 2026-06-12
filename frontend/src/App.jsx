import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-5xl font-bold text-blue-600">
          Property Platform 🚀
        </h1>
      </div>
    </div>
  );
}

export default App;