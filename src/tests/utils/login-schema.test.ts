import { loginSchema } from "@/features/auth/schemas/login-schema";

describe("loginSchema", () => {
  it("rejects invalid login payloads with zod messages", () => {
    // Act
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "123",
      remember: true,
    });

    // Assert
    expect(result.success).toBe(false);
    if (result.success) {
      throw new Error("Expected invalid login payload to fail validation.");
    }
    expect(result.error.flatten().fieldErrors.email).toContain(
      "Enter a valid work email.",
    );
    expect(result.error.flatten().fieldErrors.password).toContain(
      "Password must be at least 6 characters.",
    );
  });

  it("accepts valid credentials", () => {
    // Act
    const result = loginSchema.safeParse({
      email: "alicia@matrixcrm.io",
      password: "demo123",
      remember: true,
    });

    // Assert
    expect(result.success).toBe(true);
  });
});
