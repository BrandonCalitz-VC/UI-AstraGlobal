import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";

import Auth from "./pages/Auth/Auth";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="size-full ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="auth" element={<Auth />}>
              <Route index element={<Navigate replace to="/auth/login" />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<SignUp />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
