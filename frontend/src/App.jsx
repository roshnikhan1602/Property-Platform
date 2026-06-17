import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PropertyListing from "./pages/PropertyListing";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import MyProperties from "./pages/MyProperties";
import OwnerDashboard from "./pages/OwnerDashboard";
import EditProperty from "./pages/EditProperty";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/properties"
          element={<PropertyListing />}
        />

        <Route
          path="/properties/:id"
          element={<PropertyDetails />}
        />

        <Route
          path="/add-property"
          element={<AddProperty />}
        />

        <Route
          path="/edit-property/:id"
          element={<EditProperty />}
        />

        <Route
          path="/my-properties"
          element={<MyProperties />}
        />

        <Route
          path="/owner-dashboard"
          element={<OwnerDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;