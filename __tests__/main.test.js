describe("Java Class Generator", () => {
  const javaClassGenerator = require("../class-generator");
  describe("getClasses", () => {
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
});

// const classExample = {
//     name: "Student",
//     attributes: [
//         {
//             key: "name",
//             type: "string"
//         },
//         {
//             key: "cpf",
//             type: "number"
//         },
//         {
//             key: "class",
//             type: "ArrayList<Class>"
//         },
//     ]
// }
