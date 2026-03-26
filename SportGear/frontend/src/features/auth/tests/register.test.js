import { describe, expect, it } from "vitest";
import { validateRegister } from "../validators/registerValidator";

describe("validateRegister", () => {
  it("returns errors for invalid payload", () => {
    const result = validateRegister({
      fullName: "",
      email: "invalid",
      password: "123",
      confirmPassword: "999"
    });

    expect(result.fullName).toBeTruthy();
    expect(result.email).toBeTruthy();
    expect(result.password).toBeTruthy();
    expect(result.confirmPassword).toBeTruthy();
  });

  it("accepts valid payload", () => {
    const result = validateRegister({
      fullName: "Sport User",
      email: "user@sportgear.vn",
      password: "StrongPass1",
      confirmPassword: "StrongPass1",
      phone: "0987654321"
    });

    expect(Object.keys(result)).toHaveLength(0);
  });

  it("accepts valid payload without phone", () => {
    const result = validateRegister({
      fullName: "Sport User",
      email: "user@sportgear.vn",
      password: "StrongPass1",
      confirmPassword: "StrongPass1",
      phone: ""
    });

    expect(Object.keys(result)).toHaveLength(0);
  });
});
