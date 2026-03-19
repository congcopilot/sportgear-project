import { describe, expect, it } from "vitest";
import { validateLogin } from "../validators/loginValidator";

describe("validateLogin", () => {
  it("requires email and password", () => {
    const result = validateLogin({ email: "", password: "" });
    expect(result.email).toBeTruthy();
    expect(result.password).toBeTruthy();
  });

  it("accepts valid credentials", () => {
    const result = validateLogin({
      email: "user@sportgear.vn",
      password: "StrongPass1"
    });

    expect(Object.keys(result)).toHaveLength(0);
  });
});
