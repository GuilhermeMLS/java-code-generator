describe("Java Code Generator", () => {
  const javaCodeGenerator = require("../java-code-generator");
  describe("generateJavaClass", () => {
    it("should return a string matching the correct Java syntax to the given entity", () => {
      const JAVA_PROGRAM_NAME = `Program`;
      const TAB = `    `;
      const JAVA_BASE_PROGRAM =
        `class ${JAVA_PROGRAM_NAME} {\n` +
        `${TAB}public static void main (String args[]) { }\n` +
        `}\n`;
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
      expect(javaCodeGenerator.generateCode([entity])).toStrictEqual(
        "class Student {\n" +
          "    String name;\n" +
          "    int age;\n" +
          "}\n\n" +
          JAVA_BASE_PROGRAM +
          "\n"
      );
    });
  });
});
