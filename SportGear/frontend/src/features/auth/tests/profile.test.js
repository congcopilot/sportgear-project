import { describe, expect, it } from "vitest";
import { validateProfile } from "../validators/profileValidator";

describe("validateProfile", () => {
  it("requires full name", () => {
    const result = validateProfile({ fullName: "", phone: "123" });
    expect(result.fullName).toBeTruthy();
    expect(result.phone).toBeTruthy();
  });

  it("accepts valid profile", () => {
    const result = validateProfile({
      fullName: "Sport User",
      phone: "0987654321",
      avatarUrl: "https://cdn.sportgear.vn/avatar.png"
    });

    expect(Object.keys(result)).toHaveLength(0);
  });
});
