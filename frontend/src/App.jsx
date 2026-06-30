import { useState } from "react";
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
import About from "./pages/About";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import PGListing from "./pages/PGListing";
import PGDetails from "./pages/PGDetails";
import AddPG from "./pages/AddPG";
import EditPG from "./pages/EditPG";
import MyPGs from "./pages/MyPGs";

function App() {
  const [showLoginModal, setShowLoginModal] =
    useState(false);

  const [showOTPModal, setShowOTPModal] =
    useState(false);

  const [mobileNumber, setMobileNumber] =
    useState("");

  const [userName, setUserName] =
    useState("");

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Home
              setShowLoginModal={
                setShowLoginModal
              }
            />
          }
        />

        <Route
          path="/properties"
          element={
            <PropertyListing
              setShowLoginModal={
                setShowLoginModal
              }
            />
          }
        />

        <Route
          path="/properties/:id"
          element={
            <PropertyDetails
              setShowLoginModal={
                setShowLoginModal
              }
            />
          }
        />

        <Route
          path="/contact-support"
          element={
            <ContactSupport
              setShowLoginModal={
                setShowLoginModal
              }
            />
          }
        />

        <Route
          path="/about"
          element={
            <About
              setShowLoginModal={
                setShowLoginModal
              }
            />
          }
        />

        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AddProperty
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-property/:id"
          element={
            <ProtectedRoute>
              <EditProperty
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-properties"
          element={
            <ProtectedRoute>
              <MyProperties
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute>
              <OwnerDashboard
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner-profile"
          element={
            <ProtectedRoute>
              <OwnerProfile
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </AdminRoute>
          }
        />

        <Route
          path="/pgs"
          element={
            <PGListing
              setShowLoginModal={
                setShowLoginModal
              }
            />
          }
        />

        <Route
          path="/pgs/:id"
          element={
            <PGDetails
              setShowLoginModal={
                setShowLoginModal
              }
            />
          }
        />

        <Route
          path="/add-pg"
          element={
            <ProtectedRoute>
              <AddPG
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-pg/:id"
          element={
            <ProtectedRoute>
              <EditPG
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-pgs"
          element={
            <ProtectedRoute>
              <MyPGs
                setShowLoginModal={
                  setShowLoginModal
                }
              />
            </ProtectedRoute>
          }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;