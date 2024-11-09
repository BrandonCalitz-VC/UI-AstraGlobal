import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "@/pages/Auth/Login/Login";
import { login } from "@/services/lib/user";
import { useToast } from "@/hooks/use-toast";

jest.mock("@/services/lib/user", () => ({ login: jest.fn() }));
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn().mockReturnValue({ toast: jest.fn() }),
}));

describe("Login Component", () => {
  it("renders login form and submits data", async () => {
    const mockLoginResponse = { data: { token: "user-token" } };
    (login as jest.Mock).mockResolvedValue(mockLoginResponse);

    render(<Login />, { wrapper: MemoryRouter });

    const email = "user@example.com";
    const password = "User123!";

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

    // Check localStorage for token
    expect(localStorage.getItem("token")).toBe("user-token");

    // Check toast message
    expect(useToast().toast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Login Successful!" })
    );
  });

  it("displays error message on failed login", async () => {
    const errorMessage = "Login failed";
    (login as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<Login />, { wrapper: MemoryRouter });

    const email = "user@example.com";
    const password = "User123!";

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
