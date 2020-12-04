const Helpers = require("../utils/helpers");

describe("generateUUID test", () => {
  test("check if generateUUID() generates something", () => {
    expect(Helpers.generateUUID()).not.toBeUndefined();
  });
  test("check if generated is UUID", () => {
    expect(Helpers.generateUUID()).toMatch(
      /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
    );
  });
});

describe("lengthCheck test", () => {
  test("check if lengthCheck() returns something", () => {
    expect(Helpers.lengthCheck("Hey")).not.toBeUndefined();
  });
  test("check if lengthCheck() requires 1 argument", () => {
    expect(Helpers.lengthCheck()).toBeUndefined();
  });
  test("check if lengthCheck() only accepts strings", () => {
    expect(Helpers.lengthCheck([])).toBe(false);
  });
  test("check if lengthCheck() returns checks capital letter", () => {
    expect(Helpers.lengthCheck("hey")).toBe(false);
  });
  test("check if lengthCheck() returns checks string length", () => {
    expect(
      Helpers.lengthCheck(
        "HeyahHeyahHeyahHeyahHeyahHeyahHeyahHeyahHeyahHeyahHeyah"
      )
    ).toBe(false);
  });
});
