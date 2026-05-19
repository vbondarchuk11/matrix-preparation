import { useAuthStore } from "@/store/auth-store";

describe("auth-store", () => {
  beforeEach(() => {
    useAuthStore.setState({
      token: null,
      user: null,
      hydrated: false,
    });
  });

  it("persists and clears a session", () => {
    useAuthStore.getState().setSession("token-123", {
      id: "u_1",
      name: "Alicia Morgan",
      email: "alicia@matrixcrm.io",
      role: "Admin",
      avatar: "AM",
    });

    expect(useAuthStore.getState().token).toBe("token-123");
    expect(
      JSON.parse(localStorage.getItem("matrix-crm-session") ?? "{}"),
    ).toMatchObject({
      token: "token-123",
    });

    useAuthStore.getState().clearSession();

    expect(useAuthStore.getState().token).toBeNull();
    expect(localStorage.getItem("matrix-crm-session")).toBeNull();
  });

  it("hydrates session state from localStorage", () => {
    localStorage.setItem(
      "matrix-crm-session",
      JSON.stringify({
        token: "restored-token",
        user: {
          id: "u_2",
          name: "Nina Patel",
          email: "nina@matrixcrm.io",
          role: "Manager",
          avatar: "NP",
        },
      }),
    );

    useAuthStore.getState().hydrate();

    expect(useAuthStore.getState()).toMatchObject({
      token: "restored-token",
      hydrated: true,
      user: {
        email: "nina@matrixcrm.io",
      },
    });
  });
});
