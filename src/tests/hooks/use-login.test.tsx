import { useLogin } from "@/features/auth/hooks/use-login";
import { createTestWrapper } from "@/test/test-utils";
import type { User } from "@/types";
import { act, renderHook, waitFor } from "@testing-library/react";

const { navigate, push, setSession, login } = vi.hoisted(() => ({
  navigate: vi.fn(),
  push: vi.fn(),
  setSession: vi.fn(),
  login: vi.fn(),
}));

vi.mock("@/services/auth-service", () => ({
  authService: {
    login,
  },
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    push,
  }),
}));

vi.mock("@/store/auth-store", () => ({
  useAuthStore: (
    selector: (state: { setSession: typeof setSession }) => unknown,
  ) => selector({ setSession }),
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("useLogin", () => {
  const user: User = {
    id: "u_001",
    name: "Alicia Morgan",
    email: "alicia@matrixcrm.io",
    role: "Admin",
    avatar: "AM",
    title: "VP Revenue Operations",
  };

  beforeEach(() => {
    login.mockReset();
    navigate.mockReset();
    push.mockReset();
    setSession.mockReset();
  });

  it("stores the session, shows a toast, and redirects on success", async () => {
    // Arrange
    login.mockResolvedValue({
      token: "session-token",
      user,
    });
    const { result } = renderHook(() => useLogin(), {
      wrapper: createTestWrapper(),
    });

    // Act
    await act(async () => {
      await result.current.mutateAsync({
        email: user.email,
        password: "demo123",
      });
    });

    // Assert
    expect(setSession).toHaveBeenCalledWith("session-token", user);
    expect(push).toHaveBeenCalledWith({
      title: "Welcome back",
      description: "Your workspace is ready.",
      variant: "success",
    });
    expect(navigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("exposes loading state and handles authentication errors", async () => {
    // Arrange
    let rejectLogin: ((reason?: unknown) => void) | undefined;
    login.mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectLogin = reject;
        }),
    );
    const { result } = renderHook(() => useLogin(), {
      wrapper: createTestWrapper(),
    });

    // Act
    act(() => {
      result.current.mutate({
        email: "ops@northstarlabs.com",
        password: "wrongpass",
      });
    });

    // Assert
    await waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });

    // Act
    await act(async () => {
      rejectLogin?.(new Error("Invalid credentials"));
    });

    // Assert
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(push).toHaveBeenCalledWith({
      title: "Authentication failed",
      description: "Check your credentials and try again.",
      variant: "danger",
    });
    expect(navigate).not.toHaveBeenCalled();
    expect(setSession).not.toHaveBeenCalled();
  });
});
