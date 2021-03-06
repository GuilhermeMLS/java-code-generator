describe("Class Generator", () => {
  const classGenerator = require("../class-generator");
  describe("generateClasses", () => {
    it("should return an array of classes matching the given input", () => {
      const input = {
        Student: [
          {
            name: "John Doe",
            age: 24,
            StudentAddress: {
              street: "foo",
            },
            friends: ["Carl", "Bob"],
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
            friends: ["Mary"],
          },
        ],
      };
      expect(classGenerator.generateClasses(input)).toStrictEqual([
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
              key: "friends",
              type: "ArrayList<string>",
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
});
