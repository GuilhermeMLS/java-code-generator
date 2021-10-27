describe("Java Class Generator", () => {
  const javaClassGenerator = require("../class-generator");
  describe("wrapper", () => {
    it("should return an array of classes matching the given input", () => {
      const input = {
        Student: [
          {
            name: "John Doe",
            age: 24,
            Professor: [
              {
                name: "Dale",
              },
            ],
          },
          {
            name: "Mary",
            age: 24,
            Professor: [
              {
                name: "Danny",
              },
            ],
          },
        ],
      };
      expect(javaClassGenerator.wrapper(input)).toStrictEqual([
        {
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
            {
              key: "professorList",
              type: "ArrayList<Professor>",
            },
          ],
        },
        {
          name: "Professor",
          attributes: [
            {
              key: "name",
              type: "string",
            },
          ],
        },
      ]);
    });
  });
  describe('generateJavaClass', () => {
    it('should return a string matching the correct Java syntax to the given entity', () => {
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
      }
      expect(javaClassGenerator.generateClass(entity)).toStrictEqual(
        "\n"
          + "class Student {\n"
          + "    String name;\n"
          + "    int age;\n"
          + "}\n"
      );
    });
  });
});