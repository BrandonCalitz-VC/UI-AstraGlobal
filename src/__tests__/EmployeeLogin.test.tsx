import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmployeeLogin from "@/pages/Employee/Auth/Login/EmployeeLogin";
import { login } from "@/services/lib/user";
import { useToast } from "@/hooks/use-toast";

jest.mock("@/services/lib/user", () => ({ login: jest.fn() }));
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn().mockReturnValue({ toast: jest.fn() }),
}));

describe("EmployeeLogin Component", () => {
  it("displays success message on successful employee login", async () => {
    const mockLoginResponse = { data: { token: "employee-token" } };
    (login as jest.Mock).mockResolvedValue(mockLoginResponse);

    render(<EmployeeLogin />, { wrapper: MemoryRouter });

    const email = "employee@example.com";
    const password = "Employee123!";

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: password },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(login).toHaveBeenCalledWith({ email, password })
    );

    // Check localStorage for token
    expect(localStorage.getItem("token")).toBe("employee-token");

    // Check toast message
    expect(useToast().toast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Login Successful!" })
    );
  });

  it("displays error message on failed employee login", async () => {
    const errorMessage = "Employee login failed";
    (login as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<EmployeeLogin />, { wrapper: MemoryRouter });

    const email = "employee@example.com";
    const password = "Employee123!";

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: email },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: password },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for the login function to be called
    await waitFor(() =>
      expect(login).toHaveBeenCalledWith({ email, password })
    );

    // Check the toast error message
    expect(useToast().toast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Uh oh! Something went wrong." })
    );
  });
});
