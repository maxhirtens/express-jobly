const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
    test("name/age update", function () {
    const result = sqlForPartialUpdate(
        { firstName: 'Aliya' },
        { age: 32 });
        expect(result).toEqual({
            "setCols": "\"firstName\"=$1",
            "values": ["Aliya"]
        });
  });
    test("works: 1 item", function () {
    const result = sqlForPartialUpdate(
        { f1: "v1" },
        { f1: "f1", fF2: "f2" });
    expect(result).toEqual({
      setCols: "\"f1\"=$1",
      values: ["v1"],
    });
  });
});

