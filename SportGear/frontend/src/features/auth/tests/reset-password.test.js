import { describe, expect, it } from "vitest";
import { validateForgotPassword } from "../validators/forgotPasswordValidator";
import { validateResetPassword } from "../validators/resetPasswordValidator";

describe("password reset validators", () => {
  it("validates forgot password input", () => {
    const result = validateForgotPassword({ email: "" });
    expect(result.email).toBeTruthy();
  });

  it("validates reset password input", () => {
    const result = validateResetPassword({
      token: "",
      newPassword: "123",
      confirmPassword: "321"
    });

    expect(result.token).toBeTruthy();
    expect(result.newPassword).toBeTruthy();
    expect(result.confirmPassword).toBeTruthy();
  });
});
