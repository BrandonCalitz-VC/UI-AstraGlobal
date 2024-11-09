import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";

import Auth from "./pages/Auth/Auth";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import { Toaster } from "./components/ui/toaster";
import { UserProvider } from "./provider/UserProvider";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import Pay from "./pages/Pay/Pay";
import TransactionList from "./pages/TransactionList/TransactionList";
import { QueryClient, QueryClientProvider } from "react-query";
import EmployeeAuth from "./pages/Employee/Auth/EmployeeAuth";
import EmployeeLogin from "./pages/Employee/Auth/Login/EmployeeLogin";
import EmployeeDashboard from "./pages/Employee/Dashboard/EmployeeDashboard";
import EmployeeTransactionList from "./pages/Employee/TransactionList/EmployeeTransactionList";
import AddEmployee from "./pages/Employee/AddEmployee/AddEmployee";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="size-full bg-gray-200">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="auth" element={<Auth />}>
                  <Route
                    index
                    element={<Navigate replace to="/auth/login" />}
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<SignUp />} />
                </Route>
                <Route path="employee">
                  <Route path="auth" element={<EmployeeAuth />}>
                    <Route index element={<Navigate replace to="login" />} />
                    <Route path="login" element={<EmployeeLogin />} />
                  </Route>
                  <Route path="" element={<ProtectedRoute />}>
                    <Route index element={<EmployeeDashboard />} />
                    <Route
                      path="transactions"
                      element={<EmployeeTransactionList />}
                    />
                    <Route path="add-employee" element={<AddEmployee />} />
                  </Route>
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route index element={<Dashboard />} />
                  <Route path="pay" element={<Pay />} />
                  <Route path="transactions" element={<TransactionList />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster />
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
