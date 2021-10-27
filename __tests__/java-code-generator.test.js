describe("Java Code Generator", () => {
  describe("generateJavaClass", () => {
    it("should return a string matching the correct Java syntax to the given entity", () => {
      const entity = {
        name: "Student",
        attributes: [
          {
            key: "name",
            type: "string",
          },
          {
            key: "age",
            type: "number",
          },
        ],
      };
      expect(javaClassGenerator.generateJavaClass(entity)).toStrictEqual(
        "\n" +
          "class Student {\n" +
          "    String name;\n" +
          "    int age;\n" +
          "}\n"
      );
    });
  });
});
