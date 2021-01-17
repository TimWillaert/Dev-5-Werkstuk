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

describe("checkParameters test", () => {
  test("check if function returns something", () => {
    expect(Helpers.checkParameters()).not.toBeUndefined();
  })
  test("check if function returns 400 when no parameters passed", () => {
    expect(Helpers.checkParameters()).toBe(400);
  })
  test("check if function returns 400 when parameters are wrong types", () => {
    expect(Helpers.checkParameters("hey", 0, {})).toBe(400);
  })
  test("check if function returns 400 when parameters are wrong types", () => {
    expect(Helpers.checkParameters(undefined)).toBe(400);
  })
  test("check if function returns 400 when parameters are wrong types", () => {
    expect(Helpers.checkParameters(null)).toBe(400);
  })
  test("check if function returns 400 when parameters are wrong types", () => {
    expect(Helpers.checkParameters([])).toBe(400);
  })
  test("check if function returns false when parameters are right types but wrong values", () => {
    expect(Helpers.checkParameters({hey: "hoi"}, {}, false)).toBe(false);
  })
  test("check if function returns false when parameters are right types but more parameters are not allowed", () => {
    expect(Helpers.checkParameters({name: "string"}, {name: "Tim", surname: "Willaert"}, false)).toBe(false);
  })
  test("check if function returns true when parameters are right types and more parameters are allowed", () => {
    expect(Helpers.checkParameters({name: "string"}, {name: "Tim", surname: "Willaert"}, true)).toBe(true);
  })
  test("check if function returns true when parameters are right values", () => {
    expect(Helpers.checkParameters({name: "string"}, {name: "Tim"}, false)).toBe(true);
  })
})
