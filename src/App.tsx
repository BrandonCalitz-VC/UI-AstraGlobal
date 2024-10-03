import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";

function App() {
  return (
    <div className="size-full bg-gradient-to-bl from-blue-500 to-purple-500 flex flex-col justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
