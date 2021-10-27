describe("Java Class Generator", () => {
  const javaClassGenerator = require("../class-generator");
  describe("wrapper", () => {
    it("should return an array of classes matching the given input", () => {
      const input = {
        Student: [
          {
            name: "John Doe",
            age: 24,
            StudentAddress: {
              street: "foo",
            },
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
                Address: [
                  {
                    street: "5th Avenue",
                    number: 778,
                    Reference: [
                      {
                        name: "foo",
                      },
                    ],
                  },
                ],
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
              key: "studentAddress",
              type: "StudentAddress",
            },
            {
              key: "professorList",
              type: "ArrayList<Professor>",
            },
          ],
        },
        {
          name: "StudentAddress",
          attributes: [
            {
              key: "street",
              type: "string",
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
            {
              key: "addressList",
              type: "ArrayList<Address>",
            },
          ],
        },
        {
          name: "Address",
          attributes: [
            {
              key: "street",
              type: "string",
            },
            {
              key: "number",
              type: "number",
            },
            {
              key: "referenceList",
              type: "ArrayList<Reference>",
            },
          ],
        },
        {
          name: "Reference",
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
