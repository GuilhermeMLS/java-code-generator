const main = () => {
  const classGenerator = require("./class-generator");
  const entities = classGenerator.generateClasses({
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
  });
  const javaCodeGenerator = require("./java-code-generator");
  const javaCode = javaCodeGenerator.generateCode(entities);
  console.log(javaCode);
};
main();
