import React from "react";
import Login from "./pages/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Authenticated from "./pages/Authenticated ";
import CreateUser from "./pages/CreateUser";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={
          <ProtectedRoute>
            <Authenticated />
          </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/create_user" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
