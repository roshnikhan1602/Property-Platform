import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

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
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import About from "./pages/About";

import PGListing from "./pages/PGListing";
import PGDetails from "./pages/PGDetails";
import AddPG from "./pages/AddPG";
import EditPG from "./pages/EditPG";
import MyPGs from "./pages/MyPGs";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Subscription from "./pages/Subscription";
import SubscriptionHistory from "./pages/SubscriptionHistory";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Notifications from "./pages/Notifications";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        {/* Public Routes */}
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
          path="/pgs"
          element={<PGListing />}
        />

        <Route
          path="/pgs/:id"
          element={<PGDetails />}
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
  path="/faqs"
  element={<FAQs />}
/>

<Route
  path="/privacy-policy"
  element={<PrivacyPolicy />}
/>

<Route
  path="/terms-conditions"
  element={<TermsConditions />}
/>

        {/* Protected Routes */}
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
          path="/add-pg"
          element={
            <ProtectedRoute>
              <AddPG />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-pg/:id"
          element={
            <ProtectedRoute>
              <EditPG />
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

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />

<Route
  path="/subscription-history"
  element={
    <ProtectedRoute>
      <SubscriptionHistory />
    </ProtectedRoute>
  }
/>

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;