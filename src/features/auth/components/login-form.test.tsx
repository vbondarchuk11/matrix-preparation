import { LoginForm } from "@/features/auth/components/login-form";
import { renderWithProviders } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mutateAsync = vi.fn();

vi.mock("@/features/auth/hooks/use-login", () => ({
  useLogin: () => ({
    mutateAsync,
    isPending: false,
  }),
}));

describe("LoginForm", () => {
  it("shows validation messages for invalid credentials", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />, { route: "/auth/login" });

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.clear(emailInput);
    await user.type(emailInput, "invalid-email");
    await user.clear(passwordInput);
    await user.type(passwordInput, "123");
    await user.click(
      screen.getByRole("button", { name: /continue to workspace/i }),
    );

    expect(
      await screen.findByText(/enter a valid work email/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/at least 6 characters/i),
    ).toBeInTheDocument();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it("submits valid credentials", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />, { route: "/auth/login" });

    await user.click(
      screen.getByRole("button", { name: /continue to workspace/i }),
    );

    expect(mutateAsync).toHaveBeenCalledWith({
      email: "alicia@matrixcrm.io",
      password: "demo123",
      remember: true,
    });
  });
});
