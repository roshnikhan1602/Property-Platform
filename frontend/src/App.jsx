import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PropertyListing from "./pages/PropertyListing";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

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
          path="/wishlist"
          element={<Wishlist />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;