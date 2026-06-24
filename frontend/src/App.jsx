import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PropertyListing from "./pages/PropertyListing";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import MyProperties from "./pages/MyProperties";
import OwnerDashboard from "./pages/OwnerDashboard";
import UserDashboard from "./pages/UserDashboard";
import EditProperty from "./pages/EditProperty";
import Wishlist from "./pages/Wishlist";
import OwnerProfile from "./pages/OwnerProfile";
import AdminDashboard from "./pages/AdminDashboard";
import ContactSupport from "./pages/ContactSupport";
import About from "./pages/About";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import PGListing from "./pages/PGListing";
import PGDetails from "./pages/PGDetails";
import AddPG from "./pages/AddPG";

import MyPGs from "./pages/MyPGs";

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
          path="/contact-support"
          element={<ContactSupport />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-property/:id"
          element={
            <ProtectedRoute>
              <EditProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-properties"
          element={
            <ProtectedRoute>
              <MyProperties />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner-profile"
          element={
            <ProtectedRoute>
              <OwnerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/pgs"
          element={<PGListing />}
        />

        <Route
          path="/pgs/:id"
          element={<PGDetails />}
        />

        <Route
          path="/add-pg"
          element={
            <ProtectedRoute>
              <AddPG />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-pgs"
          element={
            <ProtectedRoute>
              <MyPGs />
            </ProtectedRoute>
          }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;