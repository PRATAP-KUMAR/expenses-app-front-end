import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import useAuthContext from "./hooks/useAuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contacts from "./pages/Contacts";
import Expenses from "./pages/Expenses";

export default function App() {

  const {user} = useAuthContext();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to="/expenses" />}
        />
        <Route
          path="/expenses"
          element={user ? <Expenses /> : <Navigate to="/login" />}
        />
        <Route
          path="/contacts"
          element={user ? <Contacts /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
